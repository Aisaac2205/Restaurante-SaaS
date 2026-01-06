import { useState, useRef } from 'react';
import { FileText, Upload, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import type { RestaurantFormType } from '../types';

interface Props {
    form: RestaurantFormType;
    uploadPdf: (file: File) => Promise<string>;
}

export const MenuModeForm = ({ form, uploadPdf }: Props) => {
    const { watch, setValue } = form;
    const menuMode = watch('menu_mode') || 'INTERACTIVE';
    const menuPdfUrl = watch('menu_pdf_url');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleModeChange = (mode: 'INTERACTIVE' | 'PDF') => {
        setValue('menu_mode', mode, { shouldDirty: true });
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            alert('Solo se permiten archivos PDF');
            return;
        }

        setUploading(true);
        try {
            const url = await uploadPdf(file);
            setValue('menu_pdf_url', url, { shouldDirty: true });
        } catch (error) {
            console.error('Error uploading PDF:', error);
            alert('Error al subir el PDF. Intenta de nuevo.');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemovePdf = () => {
        setValue('menu_pdf_url', '', { shouldDirty: true });
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Modo de Menú</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Elige cómo quieres que tus clientes vean tu menú
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => handleModeChange('INTERACTIVE')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${menuMode === 'INTERACTIVE'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${menuMode === 'INTERACTIVE' ? 'border-black' : 'border-gray-300'
                            }`}>
                            {menuMode === 'INTERACTIVE' && (
                                <div className="w-2 h-2 rounded-full bg-black" />
                            )}
                        </div>
                        <span className="font-semibold">Menú Interactivo</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">
                        Los clientes navegan el menú digital y pueden agregar productos al carrito.
                    </p>
                </button>

                <button
                    type="button"
                    onClick={() => handleModeChange('PDF')}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${menuMode === 'PDF'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${menuMode === 'PDF' ? 'border-black' : 'border-gray-300'
                            }`}>
                            {menuMode === 'PDF' && (
                                <div className="w-2 h-2 rounded-full bg-black" />
                            )}
                        </div>
                        <span className="font-semibold">Menú PDF</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">
                        Los clientes ven tu menú en PDF. Sin carrito de compras.
                    </p>
                </button>
            </div>

            {/* PDF Upload Section */}
            {menuMode === 'PDF' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Archivo PDF del Menú</span>
                    </div>

                    {menuPdfUrl ? (
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <a
                                href={menuPdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Ver PDF actual
                            </a>
                            <button
                                type="button"
                                onClick={handleRemovePdf}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => !uploading && fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${uploading
                                ? 'border-gray-300 bg-gray-100 cursor-wait'
                                : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                    <span className="text-sm text-gray-500">Subiendo PDF...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        Haz clic para subir tu menú en PDF
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Solo archivos .pdf
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                    />

                    {!menuPdfUrl && menuMode === 'PDF' && (
                        <p className="text-amber-600 text-sm mt-3 flex items-center gap-2">
                            Debes subir un PDF para que el modo PDF funcione correctamente.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
