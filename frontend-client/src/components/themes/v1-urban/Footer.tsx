import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Send } from 'lucide-react';

interface PremiumFooterProps {
    restaurantName: string;
    logoUrl: string | null;
    primaryColor: string;
    contact: {
        email: string;
        phone: string | null;
        address?: string;
    };
    socials: {
        instagram: string | null;
    }
}

export const PremiumFooter = ({ restaurantName, logoUrl, primaryColor, contact, socials }: PremiumFooterProps) => {
    // Determine text color based on background logic could be here, but for simplicity assuming white text for brand colors.
    // We will use a "safe" approach: Dark footer with Primary Color accents, OR Primary Color footer.
    // User requested "Color del footer cambie". sticking to that.

    return (
        <footer
            className="text-white pt-20 pb-10"
            style={{ backgroundColor: primaryColor || '#171717' }}
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={restaurantName}
                                className="h-12 w-auto mb-6 bg-white p-1 rounded-sm object-contain"
                            />
                        ) : (
                            <h3 className="text-3xl font-serif font-bold mb-6">{restaurantName}</h3>
                        )}
                        <p className="text-white/80 leading-relaxed mb-6">
                            Brindando la mejor experiencia culinaria con ingredientes frescos y pasión en cada plato.
                        </p>
                        <div className="flex space-x-4">
                            {/* Generic Socials for now, mapping provided ones */}
                            {socials.instagram && (
                                <a
                                    href={`https://instagram.com/${socials.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {/* Placeholders for others if needed or remove */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-white/70 text-xs">Explorar</h4>
                        <ul className="space-y-4 text-white/80">
                            <li><a href="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>Inicio</a></li>
                            <li><a href="/menu" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>Nuestro Menú</a></li>
                            <li><a href="#content" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-white rounded-full"></span>Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-white/70 text-xs">Contacto</h4>
                        <ul className="space-y-4 text-white/80">
                            {/* Address Placeholder - could be removed if empty */}
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 opacity-75" />
                                <span>Ciudad de Guatemala, Guatemala</span>
                            </li>
                            {contact.phone && (
                                <li className="flex items-center">
                                    <Phone className="w-5 h-5 mr-3 flex-shrink-0 opacity-75" />
                                    <span>{contact.phone}</span>
                                </li>
                            )}
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 flex-shrink-0 opacity-75" />
                                <span>{contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} {restaurantName}. Todos los derechos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

