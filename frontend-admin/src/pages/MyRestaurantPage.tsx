import { useState } from 'react';
import { useRestaurantForm } from '../features/restaurant/hooks/useRestaurantForm';
import { IdentityForm } from '../features/restaurant/components/IdentityForm';
import { HeroSectionForm } from '../features/restaurant/components/HeroSectionForm';
import { ContentSectionForm } from '../features/restaurant/components/ContentSectionForm';
import { ServicesForm } from '../features/restaurant/components/ServicesForm';
import { VideoSectionForm } from '../features/restaurant/components/VideoSectionForm';
import { SocialForm } from '../features/restaurant/components/SocialForm';
import { MenuModeForm } from '../features/restaurant/components/MenuModeForm';
import clsx from 'clsx';
import {
    Fingerprint,
    LayoutTemplate,
    BookOpen,
    Sparkles,
    Film,
    Share2,
    FileText,
    Save,
    Loader2
} from 'lucide-react';

export const MyRestaurantPage = () => {
    const { form, loading, saving, saveSettings, uploadImage, uploadPdf } = useRestaurantForm();
    const [activeSection, setActiveSection] = useState<'identity' | 'hero' | 'story' | 'services' | 'video' | 'social' | 'menu'>('identity');

    if (loading) return (
        <div className="flex items-center justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
    );

    const menuItems = [
        { id: 'identity', label: 'Identidad', icon: Fingerprint, desc: 'Logo, Nombre, Colores' },
        { id: 'hero', label: 'Banner Principal', icon: LayoutTemplate, desc: 'Imagen y Texto Hero' },
        { id: 'story', label: 'Sobre Nosotros', icon: BookOpen, desc: 'Tu Historia' },
        { id: 'services', label: 'Servicios', icon: Sparkles, desc: 'Tus Diferenciadores' },
        { id: 'video', label: 'Video', icon: Film, desc: 'Video Promocional' },
        { id: 'social', label: 'Redes', icon: Share2, desc: 'Instagram y Links' },
        { id: 'menu', label: 'Modo Menú', icon: FileText, desc: 'Interactivo o PDF' },
    ] as const;

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6 overflow-hidden">
            {/* Desktop Sidebar Navigation */}
            <aside className="hidden md:flex w-64 flex-shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden flex-col h-full">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-semibold text-gray-900">Configuración</h2>
                    <p className="text-xs text-gray-500">Personaliza tu sitio web</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-2 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors group",
                                activeSection === item.id
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", activeSection === item.id ? "text-white" : "text-gray-400 group-hover:text-black")} />
                            <div>
                                <p className="text-sm font-medium leading-none">{item.label}</p>
                                <p className={clsx("text-[10px] mt-1", activeSection === item.id ? "text-gray-400" : "text-gray-400")}>
                                    {item.desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={form.handleSubmit(saveSettings)}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </aside>

            {/* Mobile Navigation (Tabs + Title) */}
            <div className="md:hidden flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                    <div>
                        <h2 className="font-semibold text-gray-900 text-lg">Configuración</h2>
                        <p className="text-xs text-gray-500">Personaliza tu sitio web</p>
                    </div>
                </div>

                <div className="bg-white border-b border-gray-200 -mx-4 px-4 sticky top-0 z-10">
                    <nav className="flex overflow-x-auto gap-4 py-3 no-scrollbar snap-x">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={clsx(
                                    "flex flex-col items-center gap-1 min-w-[70px] snap-center transition-colors",
                                    activeSection === item.id ? "text-black" : "text-gray-400"
                                )}
                            >
                                <div className={clsx(
                                    "p-2 rounded-full transition-colors",
                                    activeSection === item.id ? "bg-black text-white" : "bg-gray-100"
                                )}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 bg-white md:border md:border-gray-200 md:rounded-xl p-4 md:p-8 overflow-y-auto md:shadow-sm relative pb-24 md:pb-8">
                <div className="max-w-3xl mx-auto">
                    {activeSection === 'identity' && <IdentityForm form={form} onUpload={uploadImage} loading={saving} />}
                    {activeSection === 'hero' && <HeroSectionForm form={form} onUpload={uploadImage} />}
                    {activeSection === 'story' && <ContentSectionForm form={form} onUpload={uploadImage} loading={saving} />}
                    {activeSection === 'services' && <ServicesForm form={form} onUpload={uploadImage} loading={saving} />}
                    {activeSection === 'video' && <VideoSectionForm form={form} onUpload={uploadImage} loading={saving} />}
                    {activeSection === 'social' && <SocialForm form={form} onUpload={uploadImage} />}
                    {activeSection === 'menu' && <MenuModeForm form={form} uploadPdf={uploadPdf} />}
                </div>
            </main>

            {/* Mobile Fixed Save Button */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 animate-slide-in-up">
                <button
                    onClick={form.handleSubmit(saveSettings)}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50 font-bold shadow-lg"
                >
                    {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </div>
    );
};
