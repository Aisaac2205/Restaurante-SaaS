import { atom, computed } from 'nanostores';
import type { CartItem, Product } from '@/types';

// Persistent key for localStorage
const CART_KEY = 'restaurant_cart';

// Initialize cart from localStorage (client-side only)
function getInitialCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

// Cart items store
export const $cartItems = atom<CartItem[]>(getInitialCart());

// Persist to localStorage on change (client-side only)
if (typeof window !== 'undefined') {
    $cartItems.subscribe((items) => {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    });
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
