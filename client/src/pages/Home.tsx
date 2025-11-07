import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';

const INTEGRATIONS = [
  { name: 'Printfull', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a506eacd2a0b72e015.png' },
  { name: 'HIPAA', url: 'https://assets.cdn.filesafe.space/knES3eSWYIsc5YSZ3YLl/media/6708273f16989c97e93c88f4.png' },
  { name: 'Xero', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a5eeb737f0f46d445b.png' },
  { name: 'Zapier', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67abd58650fb000ed8851f30.png' },
  { name: 'WhatsApp', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67af641f237ce2563df82508.png' },
  { name: 'Wave', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a572d42b2bbdab113b.png' },
  { name: 'Facebook', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a579284bbe3b6a77ac.png' },
  { name: 'Clio', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a579284bdb1a6a77ab.png' },
  { name: 'Stripe', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a5ee6da9493235043e.png' },
  { name: 'Shopify', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a5ee6da9500a35043d.png' },
  { name: 'TikTok', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a506eacd595072e016.png' },
  { name: 'QB', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a534b29afa9dca6433.png' },
  { name: 'LinkedIn', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a54325e150f16636dc.png' },
  { name: 'Google', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a54325e150f16636dc.png' },
  { name: 'Slack', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a534b29a2b24ca6434.png' },
  { name: 'Shippo', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a579284b08c36a77ad.png' },
  { name: 'Instagram', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a5ee6da9160435043f.png' },
  { name: 'WooCommerce', url: 'https://storage.googleapis.com/msgsndr/knES3eSWYIsc5YSZ3YLl/media/67ab96a534b29a1b3eca6435.png' },
];

const TOOLS_REPLACED = [
  { name: 'ManyChat', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894ad4fc80c52747e85.png' },
  { name: 'Leadpages', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894492ec0dbd9eae45c.png' },
  { name: 'Systeme', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894cd9cc5300790017a.png' },
  { name: 'Calendly', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894ad4fc8bf4a747e84.png' },
  { name: 'WordPress', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894cd9cc53a2490017c.png' },
  { name: 'ActiveCampaign', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894cd9cc559ac90017d.png' },
  { name: 'Skool', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02ad08abeeccf.png' },
  { name: 'Zapier', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02a97cbbeecce.png' },
  { name: 'Kartra', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894492ec0796beae459.png' },
  { name: 'Salesforce', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02a6573beecd0.png' },
  { name: 'HubSpot', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894492ec05e2deae45b.png' },
  { name: 'DocuSign', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02a9f35beecd2.png' },
  { name: 'Acuity', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894cd9cc5699990017b.png' },
  { name: 'Kajabi', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02a3d2cbeeccd.png' },
  { name: 'Wix', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c9389439ce95448dba6d7a.png' },
  { name: 'LearnDash', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c938940eb02a3fb6beecd1.png' },
  { name: 'Typeform', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894cd9cc5553f900179.png' },
  { name: 'ConvertKit', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c9389439ce95097bba6d79.png' },
  { name: 'Zoho', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c9389439ce957608ba6d7b.png' },
  { name: 'Mailchimp', url: 'https://storage.googleapis.com/msgsndr/PCBL3OxlKcBPTFQjYOYd/media/67c93894492ec0729ceae45a.png' },
];

const TESTIMONIALS = [
  {
    name: 'Eloy Cortés',
    role: 'Agencia de Lanzamientos',
    text: 'Antes usaba Builderall, ActiveCampaign y otras herramientas, pero algunas no funcionaban del todo bien como el envío de mensajes masivos con WhatsApp. Además de que tenía todo separado en varias plataformas. Actualmente, sigo usando Quantify para mi agencia de lanzamientos y gracias a ello, ahora tengo todo en un solo lugar y varios de mis procesos automatizados como el envío de mensajes de calentamiento a grupos en mis lanzamientos, lo cual me ha permitido escalar mi agencia a más de 19,000 dólares mensuales.',
    revenue: '+$19,000 USD/mes',
    image: 'https://assets.cdn.filesafe.space/jXUJBTr9nk2UKK5RFEPO/media/68e72523a47831c3663f4690.png',
    instagram: 'https://wa.link/vl3f1l',
    rating: 5,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Lilia Fiorella',
    role: 'Emprendimiento Online',
    text: 'Gracias al equipo de Quantify logré hacer mi embudo de ventas en tan sólo 2 días, nunca creí que eso fuera posible porque desconocía totalmente de las herramientas de Quantify como plantillas e igual gracias a las automatizaciones, logré mis primeros 700 USD con mi emprendimiento. También 10/10 el soporte con Juan y Edgar.',
    revenue: '+$700 USD',
    image: 'https://assets.cdn.filesafe.space/jXUJBTr9nk2UKK5RFEPO/media/68e72656468f553685a1dd2a.jpeg',
    instagram: 'https://wa.link/vl3f1l',
    rating: 5,
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Chamalu',
    role: 'Emprendedor Digital',
    text: 'Juan, Edgar, Sara y el equipo, hicieron una implementación junto a mi project manager en una semana, para no perder tiempo en los procesos manuales y delegarlos a la plataforma. Todo igual se encuentra dentro de la plataforma, eso facilita el trabajo, claro que recomiendo el servicio',
    revenue: '+Conversiones',
    image: 'https://assets.cdn.filesafe.space/jXUJBTr9nk2UKK5RFEPO/media/68e7271eb9072b3de7854445.jpeg',
    instagram: 'https://wa.link/vl3f1l',
    rating: 5,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Erika Díaz Aguilar',
    role: 'Oratoria',
    text: 'Con Quantify logré aumentar mi tasa de asistencia y de conversión a mis cursos de Oratoria, ahora también mis mensajes grupales se mandan en automático en las horas que hemos programado y puedo concentrarme en dar el mayor valor en mis eventos.',
    revenue: '+Conversiones',
    image: 'https://assets.cdn.filesafe.space/jXUJBTr9nk2UKK5RFEPO/media/68e84891fa12727cf9b65675.jpeg',
    instagram: 'https://wa.link/vl3f1l',
    rating: 5,
    color: 'from-sky-500 to-blue-500',
  },
];

const PLANS = [
  {
    name: 'Plan PyME',
    price: 'Personalizado',
    description: 'Perfecto para pequeños negocios que buscan automatizar',
    features: [
      'Contactos y usuarios ilimitados',
      'Funnels, páginas y sitios web',
      'Email, SMS y redes sociales',
      'CRM integrado',
      'Calendarios y agendamiento',
      'Automatizaciones completas',
      'Soporte por WhatsApp (Lunes-Viernes 9-6 p.m.)',
      '1,481 correos x cada $10',
    ],
    highlighted: false,
  },
  {
    name: 'Plan Corporativo',
    price: 'Personalizado',
    description: 'Todo lo que necesitas para escalar tu negocio',
    features: [
      'Incluye todo del Plan PyME',
      '80,000 correos mensuales sin costo',
      'Mensajes ilimitados sin costo por WhatsApp',
      'Mensajes ilimitados con IA',
      'Soporte prioritario',
      'Integraciones avanzadas',
      'Automatizaciones ilimitadas',
      'Garantía 100% de satisfacción',
    ],
    highlighted: true,
  },
];

function ScrollerCarousel({ items, duration = 30 }: { items: any[]; duration?: number }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || isInitialized) return;

    const children = Array.from(inner.children);
    children.forEach((child) => {
      const clone = child.cloneNode(true);
      (clone as HTMLElement).setAttribute('aria-hidden', 'true');
      inner.appendChild(clone);
    });

    inner.style.animation = `scroll-left ${duration}s linear infinite`;
    setIsInitialized(true);
  }, [duration, isInitialized]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" style={{opacity: '0'}}></div>
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" style={{opacity: '0', backgroundColor: '#011632'}}></div>
      <div
        ref={innerRef}
        className="flex gap-8 md:gap-12 items-center"
        style={{ width: 'fit-content' }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 h-16 md:h-20 flex items-center justify-center group"
          >
            <img
              src={item.url}
              alt={item.name}
              className="h-full w-auto max-w-xs object-contain filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    setLogoLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg shadow-primary/5">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent transition-all duration-500 ${logoLoaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
            Quantify
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://wa.link/vl3f1l"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-sm font-medium hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </a>
            <a
              href="https://wa.link/vl3f1l"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden p-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-card py-20 md:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Automatiza tu Negocio con{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Quantify
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                La plataforma más potente para PyMEs en México. Centraliza todas tus operaciones, automatiza procesos y escala tu negocio sin límites.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                <GlowButton
                  href="https://wa.link/vl3f1l"
                  text="Obtén Acceso Inmediato"
                  startColor="#1e40af"
                  endColor="#3b82f6"
                  glowColor="rgba(59, 130, 246, .4)"
                />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                <span>Sin contratos - Cancela en cualquier momento</span>
              </div>
            </div>

            <div className={`relative h-64 md:h-96 flex items-center justify-center transition-all duration-700 ${logoLoaded ? 'animate-fade-in-right' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-2xl blur-3xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:border-primary/60 group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src="https://assets.cdn.filesafe.space/jXUJBTr9nk2UKK5RFEPO/media/687c2b54da28cf43bc7a43d3.png"
                  alt="Quantify Logo"
                  className="w-full h-auto max-w-xs animate-float relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-card border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
            {/* Left side - Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Acerca de Nosotros</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos un equipo multidisciplinario unido con pasión, cuya visión es centralizar todas tus operaciones en una sola plataforma. Automatizamos los procesos laboriosos y manuales de tu negocio para liberarte tiempo, dinero y permitirte escalar.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">$5,400+</div>
                  <p className="text-sm sm:text-base text-muted-foreground">USD mensuales generados con nuestra agencia SAAS</p>
                </div>
                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <p className="text-sm sm:text-base text-muted-foreground">Garantía de satisfacción</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Founders Gallery */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 justify-items-center">
              <div className="group relative overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" style={{borderRadius: '50%', width: '260px', height: '260px', borderStyle: 'ridge', borderWidth: '3px'}}>
                <img 
                  src="https://storage.googleapis.com/msgsndr/jXUJBTr9nk2UKK5RFEPO/media/690d84ae11691fe5d4471da3.png" 
                  alt="Fundador 1" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="group relative overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" style={{borderRadius: '50%', width: '260px', height: '260px', borderStyle: 'ridge', borderWidth: '3px'}}>
                <img 
                  src="https://storage.googleapis.com/msgsndr/jXUJBTr9nk2UKK5RFEPO/media/690d84ae6961293a0312be6a.png" 
                  alt="Fundador 2" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="group relative overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" style={{borderRadius: '50%', width: '260px', height: '260px', borderStyle: 'ridge', borderWidth: '3px'}}>
                <img 
                  src="https://storage.googleapis.com/msgsndr/jXUJBTr9nk2UKK5RFEPO/media/690d84ae25530ffc79f4701d.png" 
                  alt="Fundador 3" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="group relative overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" style={{borderRadius: '50%', width: '260px', height: '260px', borderStyle: 'ridge', borderWidth: '3px'}}>
                <img 
                  src="https://storage.googleapis.com/msgsndr/jXUJBTr9nk2UKK5RFEPO/media/690d84aed13a2e1a24745027.png" 
                  alt="Fundador 4" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Qué dicen nuestros clientes?</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative p-6 md:p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                  background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1) 0%, transparent 80%)`
                }}></div>
                <div className="relative space-y-4">
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm font-semibold text-primary">{testimonial.revenue}</span>
                    {testimonial.instagram && (
                      <a
                        href={testimonial.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                      >
                        Visitar Negocio
                      </a>
                    )}
                  </div>
                </div>
              </div>            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 md:py-32 bg-card border-y border-border">
        <div className="container space-y-12">
          <div className="text-center animate-fade-in-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Integraciones Poderosas</h2>
            <p className="text-lg text-muted-foreground">Conecta con las herramientas que ya usas</p>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>
          <ScrollerCarousel items={INTEGRATIONS} duration={40} />
        </div>
      </section>

      {/* Tools Replaced Section */}
      <section className="py-20 md:py-32 bg-background" style={{backgroundColor: '#06183c'}}> {/* recuerda que en acerda de nosotro deja el espacio para 4 imagenes de los fundadores */}
        <div className="container space-y-12">
          <div className="text-center animate-fade-in-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Reemplaza Múltiples Herramientas</h2>
            <p className="text-lg text-muted-foreground">Una plataforma unificada para todo tu negocio</p>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>
          <ScrollerCarousel items={TOOLS_REPLACED} duration={50} />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-card border-t border-border">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Elige tu Plan</h2>
            <p className="text-lg text-muted-foreground">Planes flexibles sin contratos. Cancela en cualquier momento.</p>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 animate-fade-in-up ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary shadow-xl shadow-primary/20 sm:scale-105'
                    : 'bg-background border-border hover:border-primary'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-bold rounded-full">
                    Recomendado
                  </div>
                )}
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm md:text-base text-muted-foreground">{plan.description}</p>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</div>
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          : 'bg-primary/20 hover:bg-primary/30 text-primary'
                      }`}
                    >
                      Contactar al equipo de Ventas
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                    <div className="space-y-2 md:space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5" style={{borderRadius: '0px', opacity: '0'}}>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <p className="text-base md:text-lg font-semibold text-foreground mb-2">Garantía 100% de Satisfacción</p>
            <p className="text-sm md:text-base text-muted-foreground">Si no estás satisfecho con nuestro servicio, te devolvemos el 100% de tu inversión. Sin preguntas.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border">
        <div className="container text-center space-y-6 md:space-y-8 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            ¿Listo para escalar tu negocio?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Únete a cientos de emprendedores y PyMEs que ya están automatizando sus negocios con Quantify.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="https://wa.link/vl3f1l"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-transform"
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                Habla con nosotros
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 md:py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Quantify</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Automatización de negocios para PyMEs en México.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm md:text-base mb-4">Producto</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integraciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm md:text-base mb-4">Empresa</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="https://wa.link/vl3f1l" className="hover:text-primary transition-colors">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm md:text-base mb-4">Contacto</h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href="mailto:hola@quantifysystem.com" className="break-all">hola@quantifysystem.com</a>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+523335960576">+52 333 5960576</a>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <a href="https://wa.me/523335960576" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-xs md:text-sm text-muted-foreground gap-4">
            <p>&copy; 2025 Quantify. Todos los derechos reservados.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors">Términos</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
