import { 
  Menu, 
  X, 
  ChevronRight, 
  Target, 
  Eye, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  Globe, 
  Zap, 
  Instagram, 
  Facebook, 
  Twitter,
  Database,
  Upload,
  Trash2,
  FileText,
  Plus,
  Trash,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Estrategia', href: '#estrategia' },
    { name: 'Tecnología', href: '#tecnologia' },
    { name: 'Pedidos', href: '#pedidos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-dark text-white shadow-xl' : 'py-8 text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-serif tracking-tighter uppercase"
        >
          <span className="font-light italic">La Moda</span> <span className="font-bold text-brand-gold">es Vida</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {menuItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-gold transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-widest font-bold bg-transparent hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Showroom
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black text-white px-6 py-10"
          >
            <div className="flex flex-col space-y-6">
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif italic border-b border-white/10 pb-2"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  url: string;
  type: string;
}

const OrderSection = () => {
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [dynamicFields, setDynamicFields] = useState([{ id: Date.now(), title: '', desc: '' }]);
  const [previewFile, setPreviewFile] = useState<AttachedFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [radical, setRadical] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    if (previewFile) {
      if (previewFile.type.includes('pdf')) {
        fetch(previewFile.url)
          .then(res => res.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (active) setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(blob);
          })
          .catch(() => {
            if (active) setPreviewUrl(previewFile.url);
          });
      } else {
        setPreviewUrl(previewFile.url);
      }
    } else {
      setPreviewUrl(null);
    }
    return () => { active = false; };
  }, [previewFile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map((f: File) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
        url: URL.createObjectURL(f),
        type: f.type
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.url);
      return prev.filter(f => f.id !== id);
    });
  };

  const addField = () => {
    setDynamicFields(prev => [...prev, { id: Date.now(), title: '', desc: '' }]);
  };

  const removeField = (id: number) => {
    setDynamicFields(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const randomRadical = 'LM-' + Math.floor(100000 + Math.random() * 900000);
      setRadical(randomRadical);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-24 bg-brand-black/50 border-t border-brand-border" id="pedidos">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.5em] text-brand-gold font-bold block mb-4">Servicios Prime</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light italic text-white">Solicitud de Pedidos</h2>
          <div className="h-px bg-brand-gold/30 mt-8 w-24 mx-auto" />
        </div>

        {radical ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bento-card bg-brand-gold p-12 text-center"
          >
            <ShieldCheck className="mx-auto text-brand-black mb-6" size={64} />
            <h3 className="text-3xl font-serif font-bold text-brand-black mb-4 italic">¡Solicitud Generada!</h3>
            <p className="text-brand-black/80 mb-8 font-medium">Su pedido ha sido registrado con éxito en nuestro sistema global.</p>
            <div className="bg-brand-black p-6 rounded-lg mb-8">
              <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">Número de Radicado</span>
              <span className="text-4xl font-mono font-bold text-white tracking-tighter">{radical}</span>
            </div>
            <button 
              onClick={() => setRadical(null)}
              className="px-8 py-3 bg-brand-black text-brand-gold text-[10px] uppercase tracking-widest font-bold hover:shadow-xl transition-all"
            >
              Nueva Solicitud
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Form Side */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bento-card bg-brand-surface/50 p-10 backdrop-blur-xl"
              >
                <h3 className="text-2xl font-serif font-bold text-brand-gold mb-8 italic">Datos del Cliente</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Tipo de Identificación</label>
                    <select className="w-full bg-brand-black/40 border border-brand-border p-4 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors appearance-none cursor-pointer">
                      <option value="">Seleccione...</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="NIT">NIT</option>
                      <option value="CE">Cédula de Extranjería</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Número de Identificación</label>
                    <input type="text" placeholder="Ej: 1020304050" className="w-full bg-brand-black/40 border border-brand-border p-4 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors placeholder:text-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Ciudad</label>
                    <input type="text" placeholder="Ej: Bogotá D.C." className="w-full bg-brand-black/40 border border-brand-border p-4 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors placeholder:text-gray-700" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Fecha de Solicitud</label>
                    <input type="date" className="w-full bg-brand-black/40 border border-brand-border p-4 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors [color-scheme:dark]" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Tipo de Pedido</label>
                    <select className="w-full bg-brand-black/40 border border-brand-border p-4 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors appearance-none cursor-pointer">
                      <option value="">Seleccione el tipo...</option>
                      <option value="retail">Retail Collection</option>
                      <option value="showroom">Showroom Exclusive</option>
                      <option value="bespoke">Bespoke / A medida</option>
                      <option value="bulk">Multinational Bulk</option>
                    </select>
                  </div>
                </form>
              </motion.div>

              {/* Dynamic Fields Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bento-card bg-brand-surface/50 p-10 backdrop-blur-xl"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-brand-gold italic">Detalles del Pedido</h3>
                  <button 
                    onClick={addField}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-brand-gold hover:text-white transition-colors p-2 border border-brand-gold/30 rounded-md bg-brand-gold/5"
                  >
                    <Plus size={14} /> Añadir Atributo
                  </button>
                </div>

                <div className="space-y-6">
                  <AnimatePresence>
                    {dynamicFields.map((field) => (
                      <motion.div 
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end bg-white/5 p-6 rounded-lg border border-white/5"
                      >
                        <div className="md:col-span-3 space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Concepto / Talla / Ref</label>
                          <input type="text" placeholder="Ej: Referencia XR-10" className="w-full bg-brand-black/20 border-b border-white/10 p-2 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors" />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-brand-muted font-bold">Descripción / Cantidad</label>
                          <input type="text" placeholder="Ej: 50 unidades" className="w-full bg-brand-black/20 border-b border-white/10 p-2 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors" />
                        </div>
                        <div className="flex justify-end">
                          <button 
                            onClick={() => removeField(field.id)}
                            className="p-2 text-red-400 hover:bg-red-400/10 transition-colors rounded-full"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Documents Side */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bento-card bg-brand-surface/50 p-10 backdrop-blur-xl h-full flex flex-col"
              >
                <h3 className="text-2xl font-serif font-bold text-brand-gold mb-8 italic">Adjuntar Documentación</h3>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-brand-border rounded-xl p-12 text-center group cursor-pointer hover:border-brand-gold transition-all bg-brand-gold/5"
                >
                  <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                  <Upload className="mx-auto text-brand-gold mb-6 group-hover:-translate-y-2 transition-transform" size={48} />
                  <p className="text-sm font-light text-white mb-2">Haga clic o arrastre sus documentos aquí</p>
                  <p className="text-[10px] uppercase tracking-widest text-brand-muted font-bold">Archivos permitidos: PDF, JPG, PNG (Max 10MB)</p>
                </div>

                <div className="mt-12 overflow-x-auto grow">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-brand-border">
                        <th className="py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Nombre del Archivo</th>
                        <th className="py-4 text-[10px] uppercase tracking-widest text-brand-muted font-bold">Peso</th>
                        <th className="py-4 text-right overflow-hidden"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {files.map((f: AttachedFile) => (
                          <motion.tr 
                            key={f.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-b border-white/5 group hover:bg-white/5 transition-colors"
                          >
                            <td className="py-4 align-middle">
                              <div className="flex items-center gap-3">
                                <FileText size={16} className="text-brand-gold" />
                                <span className="text-xs text-white/80 font-light truncate max-w-[150px]">{f.name}</span>
                              </div>
                            </td>
                            <td className="py-4 text-[10px] font-bold text-brand-muted align-middle">
                              {f.size}
                            </td>
                            <td className="py-4 text-right align-middle">
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => setPreviewFile(f)}
                                  className="p-2 text-brand-muted hover:text-brand-gold transition-colors"
                                  title="Visualizar"
                                >
                                  <Eye size={16} />
                                </button>
                                <button 
                                  onClick={() => removeFile(f.id)}
                                  className="p-2 text-brand-muted hover:text-red-400 transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                  {files.length === 0 && (
                    <div className="py-12 text-center text-brand-muted text-[10px] uppercase tracking-widest italic font-bold">
                      Ningún documento adjunto
                    </div>
                  )}
                </div>

                <div className="mt-12">
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-brand-gold text-brand-black text-xs uppercase tracking-[0.4em] font-bold hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-4"
                  >
                    {isSubmitting ? (
                      <>Procesando <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="border-2 border-brand-black border-t-transparent w-4 h-4 rounded-full" /></>
                    ) : (
                      <>Enviar Solicitud <ChevronRight size={16} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {previewFile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            <div className="absolute top-6 right-6 z-10">
              <button 
                onClick={() => setPreviewFile(null)}
                className="p-3 bg-brand-gold text-brand-black rounded-full hover:scale-110 transition-transform"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="w-full h-full max-w-5xl bg-brand-surface rounded-xl overflow-hidden flex flex-col items-center">
              <div className="w-full p-4 border-b border-brand-border bg-brand-black flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <FileText className="text-brand-gold" size={20} />
                  <span className="text-xs text-white uppercase tracking-widest font-bold truncate max-w-[200px] md:max-w-md">
                    {previewFile.name}
                  </span>
                </div>
                {previewUrl && !previewFile.type.includes('image') && (
                  <a 
                    href={previewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase font-bold text-brand-gold hover:text-white transition-colors flex items-center gap-2"
                  >
                    Abrir en nueva pestaña <ChevronRight size={14} />
                  </a>
                )}
              </div>
              
              <div className="w-full flex-grow relative bg-[#0a0a0a] flex items-center justify-center p-4">
                {!previewUrl ? (
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full"
                    />
                    <p className="text-xs text-brand-gold uppercase tracking-widest font-bold">Procesando Documento...</p>
                  </div>
                ) : previewFile.type.includes('image') ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                ) : previewFile.type.includes('pdf') ? (
                  <iframe 
                    src={previewUrl} 
                    className="w-full h-full rounded-lg bg-white" 
                    title="PDF"
                  />
                ) : (
                  <div className="text-center p-12">
                    <FileText size={64} className="text-brand-muted mb-4 mx-auto" />
                    <p className="text-white text-sm font-light">Este tipo de documento requiere ser abierto en una pestaña externa.</p>
                    <a 
                      href={previewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 inline-block px-6 py-2 border border-brand-gold text-brand-gold text-[10px] uppercase font-bold"
                    >
                      Abrir Archivo
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-brand-black bg-brand-black" id="inicio">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* HERO SECTION / WELCOME (Spans 2x2) */}
        <section className="md:col-span-2 md:row-span-2 bento-card flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent min-h-[500px]">
          <div className="absolute inset-0 -z-10 group overflow-hidden">
            <img 
              src="https://picsum.photos/seed/fashion-hero/1200/1200" 
              alt="Hero Background" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-50 contrast-125 opacity-40 group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Design HTML's recursive lines pattern simulated via overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,#111,#111_10px,#161616_10px,#161616_20px)]" />
          </div>
          
          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold block mb-4"
            >
              Bienvenida
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif font-light mb-6 italic leading-tight"
            >
              La moda no es solo estilo, <span className="font-bold not-italic">es identidad.</span>
            </motion.h1>
            <p className="text-sm text-brand-muted max-w-md mb-8 leading-relaxed font-light">
              Nuestra expansión multinacional llega a Colombia para fusionar el lujo global con el alma vibrante local.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#pedidos" className="inline-block px-8 py-4 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-gold hover:text-brand-black transition-all duration-300">
                Iniciar Pedido
              </a>
            </motion.div>
          </div>
        </section>

        {/* MARKET ANALYSIS (Spans 1) */}
        <section className="bento-card md:col-span-1 group">
          <TrendingUp className="text-brand-gold mb-6 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mb-2">Mercado Colombia</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic">Análisis Sectorial</h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Oportunidad de crecimiento del 15% anual en el sector lujo. Fuerte competencia local en Bogotá y Medellín.
          </p>
          <div className="mt-8 flex justify-between border-t border-brand-border pt-6">
            <div className="text-center">
              <span className="block text-lg font-bold">6.2M</span>
              <label className="text-[9px] uppercase text-brand-muted font-bold tracking-tight">Alcance</label>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold">4.5%</span>
              <label className="text-[9px] uppercase text-brand-muted font-bold tracking-tight">Market Share</label>
            </div>
          </div>
        </section>

        {/* TECH STRATEGY (Spans 1) */}
        <section className="bento-card md:col-span-1 group" id="tecnologia">
          <Cpu className="text-brand-gold mb-6 group-hover:rotate-12 transition-transform" />
          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mb-2">Innovación</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic">Smart CRM & IA</h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light mb-6">
            Eliminamos la fricción: un solo registro, infinitas experiencias personalizadas sin repetición de datos.
          </p>
          <ul className="space-y-3">
            {['IA de Estilo', 'Historial Omnicanal', 'Privacidad Biométrica'].map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/70">
                <span className="text-brand-gold">—</span> {t}
              </li>
            ))}
          </ul>
        </section>

        {/* MISSION & VISION (Spans 1) */}
        <section className="bento-card md:col-span-1 group" id="nosotros">
          <Target className="text-brand-gold mb-6 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mb-2">Nuestra Esencia</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic">Misión & Visión</h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Liderar la transición hacia una moda inteligente que respeta la identidad y el planeta.
          </p>
          <div className="mt-6 space-y-4">
             <div className="p-3 bg-white/5 border-l-2 border-brand-gold">
               <p className="text-[10px] italic text-white/90 font-light">"Excelencia artesanal e innovación disruptiva."</p>
             </div>
          </div>
        </section>

        {/* BUSINESS MODEL / STRATEGY (Spans 1) */}
        <section className="bento-card md:col-span-1 group" id="estrategia">
          <Globe className="text-brand-gold mb-6 group-hover:-rotate-12 transition-transform" />
          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mb-2">Estrategia</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic">Modelo de Negocio</h3>
          <p className="text-xs text-brand-muted leading-relaxed font-light">
            Propuesta de valor centrada en exclusividad y sostenibilidad digital.
          </p>
          <div className="mt-8 pt-6 border-t border-brand-border">
            <span className="block text-lg font-bold">A+ / Prime</span>
            <label className="text-[9px] uppercase text-brand-muted font-bold tracking-tight">Segmento Principal</label>
          </div>
        </section>

        {/* ORDER REQUEST CTA (Spans 1 - New Card) */}
        <section className="bento-card md:col-span-1 bg-brand-gold group">
          <ShoppingBag className="text-brand-black mb-6 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] uppercase tracking-widest text-brand-black font-bold block mb-2">Pedidos Online</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic text-brand-black">Nueva Solicitud</h3>
          <p className="text-xs text-brand-black/80 leading-relaxed font-medium mb-8">
            Gestione sus pedidos con nuestra plataforma inteligente e integrada.
          </p>
          <a href="#pedidos" className="block text-center py-3 bg-brand-black text-brand-gold text-[9px] uppercase tracking-widest font-bold hover:shadow-xl transition-all">
            Abrir Formulario
          </a>
        </section>

        {/* IMPLEMENTATION PLAN (Spans 1) */}
        <section className="bento-card md:col-span-1 group">
          <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mb-2">Roadmap 2026</span>
          <h3 className="text-xl font-serif font-bold mb-4 italic">Plan de Fase</h3>
          
          <div className="space-y-4 mt-6">
            {[
              { label: "F1", title: "Lanzamiento" },
              { label: "F2", title: "Expansión" }
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border border-brand-gold flex items-center justify-center text-[8px] font-bold text-brand-gold">
                  {p.label}
                </div>
                <span className="text-[10px] font-bold text-white/80">{p.title}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* NEW ORDER SECTION */}
      <OrderSection />

      <footer className="py-12 border-t border-brand-border relative overflow-hidden" id="contacto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-brand-muted font-medium">
            © 2026 <span className="text-brand-gold">La Moda es Vida</span> S.A.S | Bogotá, Colombia
          </div>
          <div className="flex md:justify-end gap-x-8 text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold">
            <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Luxe Report</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
