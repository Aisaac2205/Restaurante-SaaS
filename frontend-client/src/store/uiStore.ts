import { atom } from 'nanostores';

export const $isCartOpen = atom(false);

export function setIsCartOpen(isOpen: boolean) {
    $isCartOpen.set(isOpen);
}

export function toggleCart() {
    $isCartOpen.set(!$isCartOpen.get());
}
