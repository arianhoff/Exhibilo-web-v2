import React from 'react';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export const Footer = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Sobre nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <footer className="bg-[#111111] text-white relative">
      {/* Back to top button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          size="sm"
          className="bg-[#FFB800] hover:bg-[#e6a600] text-[#111111] rounded-full w-12 h-12 p-0 shadow-lg hover:scale-110 transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#FFB800] mb-4">
                {data.name}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Social media */}
            <div>
              <h4 className="font-semibold mb-4">Seguinos en</h4>
              <div className="flex space-x-4">
                <a 
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:text-[#111111] transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:text-[#111111] transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:text-[#111111] transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <h4 className="font-semibold mb-6">Navegación rápida</h4>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white/70 hover:text-[#FFB800] transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Additional links */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/50 hover:text-[#FFB800] transition-colors duration-200">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/50 hover:text-[#FFB800] transition-colors duration-200">
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/50 hover:text-[#FFB800] transition-colors duration-200">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-6">Datos de contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FFB800] mt-1 flex-shrink-0" />
                <div className="text-white/70">
                  {data.address}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                <a 
                  href={`tel:${data.phone.replace(/\s/g, '')}`}
                  className="text-white/70 hover:text-[#FFB800] transition-colors duration-200"
                >
                  {data.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                <a 
                  href={`mailto:${data.email}`}
                  className="text-white/70 hover:text-[#FFB800] transition-colors duration-200"
                >
                  {data.email}
                </a>
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4">Horarios de atención</h5>
              <div className="text-sm text-white/50 space-y-1">
                <div>Lunes a Viernes: 9:00 - 18:00</div>
                <div>Sábados: 9:00 - 13:00</div>
                <div>Domingos: Cerrado</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/50 text-sm mb-4 md:mb-0">
              © 2024 {data.name}. Todos los derechos reservados.
            </div>
            
            <div className="text-white/50 text-sm">
              Diseño y desarrollo web profesional
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};