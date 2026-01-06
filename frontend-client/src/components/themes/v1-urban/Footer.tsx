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
    };
    menuLink: string;
    homeLink?: string;
}

export const PremiumFooter = ({ restaurantName, logoUrl, primaryColor, contact, socials, menuLink, homeLink = "/" }: PremiumFooterProps) => {
    // Determine text color based on background logic could be here, but for simplicity assuming white text for brand colors.
    // We will use a "safe" approach: Dark footer with Primary Color accents, OR Primary Color footer.

    return (
        <footer
            className="text-white pt-16 pb-12 md:pt-20 md:pb-10"
            style={{ backgroundColor: primaryColor || '#171717' }}
        >
            <div className="container mx-auto px-6 md:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={restaurantName}
                                className="h-16 w-auto mb-6 bg-white p-1 rounded-sm object-contain mx-auto md:mx-0"
                            />
                        ) : (
                            <h3 className="text-3xl font-serif font-bold mb-6">{restaurantName}</h3>
                        )}
                        <p className="text-white/80 leading-relaxed mb-6 max-w-sm mx-auto md:mx-0 text-base md:text-base">
                            Brindando la mejor experiencia culinaria con ingredientes frescos y pasión en cada plato.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {socials.instagram && (
                                <a
                                    href={`https://instagram.com/${socials.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
                                >
                                    <Instagram className="w-6 h-6 md:w-5 md:h-5" />
                                </a>
                            )}
                            {/* Placeholders for others if needed or remove */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-white/90 md:text-white/70 text-sm md:text-xs">Explorar</h4>
                        <ul className="space-y-5 md:space-y-4 text-white/90 md:text-white/80 text-lg md:text-base">
                            <li><a href={homeLink} className="hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"><span className="hidden md:block w-1 h-1 bg-white rounded-full"></span>Inicio</a></li>
                            <li><a
                                href={menuLink}
                                target={menuLink && menuLink.startsWith('http') ? '_blank' : undefined}
                                rel={menuLink && menuLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"
                            >
                                <span className="hidden md:block w-1 h-1 bg-white rounded-full"></span>Nuestro Menú
                            </a></li>
                            <li><a href={`${homeLink}#content`} className="hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"><span className="hidden md:block w-1 h-1 bg-white rounded-full"></span>Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-white/90 md:text-white/70 text-sm md:text-xs">Contacto</h4>
                        <ul className="space-y-5 md:space-y-4 text-white/90 md:text-white/80 text-lg md:text-base">
                            <li className="flex items-start justify-center md:justify-start">
                                <MapPin className="w-6 h-6 md:w-5 md:h-5 mr-3 mt-1 flex-shrink-0 opacity-75" />
                                <span className="text-left md:text-left">Ciudad de Guatemala, Guatemala</span>
                            </li>
                            {contact.phone && (
                                <li className="flex items-center justify-center md:justify-start">
                                    <Phone className="w-6 h-6 md:w-5 md:h-5 mr-3 flex-shrink-0 opacity-75" />
                                    <span>{contact.phone}</span>
                                </li>
                            )}
                            <li className="flex items-center justify-center md:justify-start">
                                <Mail className="w-6 h-6 md:w-5 md:h-5 mr-3 flex-shrink-0 opacity-75" />
                                <span>{contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-white/60 text-sm gap-4 md:gap-0">
                    <p>&copy; {new Date().getFullYear()} {restaurantName}. Todos los derechos reservados.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
