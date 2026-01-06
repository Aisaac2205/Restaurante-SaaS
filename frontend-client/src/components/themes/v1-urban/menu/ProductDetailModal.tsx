import { Fragment, useState } from 'react';
import type { Product } from '@/types';
import { addToCart } from '@/store/cartStore';
import { formatCurrency } from '@/utils/currency';
import { Minus, Plus, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';

interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onClose();
        setQuantity(1);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all">
                                <div className="relative">
                                    {/* Close Button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                                    >
                                        <X size={20} className="text-gray-900" />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        {/* Image Section */}
                                        <div className="bg-gray-100 aspect-square md:aspect-auto h-64 md:h-auto">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 md:p-8 flex flex-col h-full">
                                            <div className="flex-1">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-2xl font-serif font-bold text-gray-900 mb-2"
                                                >
                                                    {product.name}
                                                </Dialog.Title>

                                                <p className="text-xl font-medium text-gray-900 mb-4">
                                                    {formatCurrency(product.price)}
                                                </p>

                                                <div className="w-12 h-1 bg-black mb-6" />

                                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                                    {product.description || "Sin descripción disponible."}
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-gray-100 space-y-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center border border-gray-300 rounded-sm">
                                                        <button
                                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                            className="p-3 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-10 text-center font-medium">{quantity}</span>
                                                        <button
                                                            onClick={() => setQuantity(quantity + 1)}
                                                            className="p-3 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={handleAddToCart}
                                                        className="flex-1 bg-black text-white px-6 py-3.5 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-all shadow-md active:scale-95"
                                                    >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
