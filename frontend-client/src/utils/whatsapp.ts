import type { CartItem } from '@/types';
import { formatCurrency } from './currency';

/**
 * Generates a WhatsApp message link with the formatted order
 */
export function generateWhatsAppLink(
    phoneNumber: string,
    restaurantName: string,
    items: CartItem[],
    total: number,
    options?: {
        method: 'pickup' | 'delivery';
        address?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }
): string {
    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanPhone = phoneNumber.replace(/\D/g, '');

    // Build the order message
    const itemsText = items
        .map(
            (item) =>
                `• ${item.quantity}x ${item.product.name} - ${formatCurrency(item.product.price * item.quantity)}${item.instructions ? `\n  📝 ${item.instructions}` : ''}`
        )
        .join('\n');

    let header = `🍽️ *Pedido - ${restaurantName}*`;
    if (options?.firstName || options?.lastName) {
        header += `\n👤 Cliente: ${options.firstName || ''} ${options.lastName || ''}`.trim();
    }
    if (options?.phone) {
        header += `\n📞 Tel: ${options.phone}`;
    }

    let deliveryInfo = '';
    if (options) {
        if (options.method === 'delivery') {
            deliveryInfo = `\n\n🛵 *Servicio a Domicilio*\n📍 Dirección: ${options.address || 'No especificada'}`;
        } else {
            deliveryInfo = `\n\n🏪 *Para Recoger en Tienda*`;
        }
    }

    const message = `${header}

${itemsText}

──────────────
*Total: ${formatCurrency(total)}*${deliveryInfo}

¡Gracias por su pedido!`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
