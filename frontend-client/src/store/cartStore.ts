import { atom, computed } from 'nanostores';
import type { CartItem, Product } from '@/types';

// Current restaurant slug (set by the app when loading a restaurant)
export const $currentRestaurantSlug = atom<string>('');

// Helper to get the storage key for the current restaurant
function getCartKey(slug: string): string {
    return `cart_${slug}`;
}

// Initialize cart from localStorage for a specific restaurant
function getCartFromStorage(slug: string): CartItem[] {
    if (typeof window === 'undefined' || !slug) return [];
    try {
        const stored = localStorage.getItem(getCartKey(slug));
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Save cart to localStorage for a specific restaurant
function saveCartToStorage(slug: string, items: CartItem[]): void {
    if (typeof window === 'undefined' || !slug) return;
    try {
        localStorage.setItem(getCartKey(slug), JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

// Cart items store
export const $cartItems = atom<CartItem[]>([]);

// Initialize cart when restaurant slug changes
if (typeof window !== 'undefined') {
    $currentRestaurantSlug.subscribe((slug) => {
        if (slug) {
            const items = getCartFromStorage(slug);
            $cartItems.set(items);
        } else {
            $cartItems.set([]);
        }
    });

    // Persist to localStorage on cart change
    $cartItems.subscribe((items) => {
        const slug = $currentRestaurantSlug.get();
        if (slug) {
            saveCartToStorage(slug, [...items]);
        }
    });
}

// Function to initialize the cart for a specific restaurant
export function initializeCart(slug: string): void {
    if ($currentRestaurantSlug.get() !== slug) {
        $currentRestaurantSlug.set(slug);
    }
}

// Computed: total items count
export const $cartCount = computed($cartItems, (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

// Computed: total price
export const $cartTotal = computed($cartItems, (items) =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

// Actions
export function addToCart(product: Product, quantity = 1, instructions?: string) {
    const items = $cartItems.get();
    const existingIndex = items.findIndex((item) => item.product.id === product.id);

    if (existingIndex >= 0) {
        // Update existing item
        const updated = [...items];
        updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            instructions: instructions || updated[existingIndex].instructions,
        };
        $cartItems.set(updated);
    } else {
        // Add new item
        $cartItems.set([...items, { product, quantity, instructions }]);
    }
}

export function removeFromCart(productId: number) {
    $cartItems.set($cartItems.get().filter((item) => item.product.id !== productId));
}

export function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const items = $cartItems.get();
    const updated = items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
    );
    $cartItems.set(updated);
}

export function clearCart() {
    $cartItems.set([]);
}
