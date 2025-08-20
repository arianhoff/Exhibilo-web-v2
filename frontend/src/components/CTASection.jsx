import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export const CTASection = ({ data }) => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB800]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFB800]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main CTA content */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Listo para destacar en el 
              <span className="text-[#FFB800]"> punto de venta</span>?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Transformemos tu marca con exhibidores que cautivan y convierten. 
              Solicita tu cotización personalizada hoy mismo.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => scrollToSection('#contacto')}
              size="lg"
              className="bg-[#FFB800] hover:bg-[#e6a600] text-[#111111] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 group text-lg"
            >
              Solicitá una cotización
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#111111] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
            >
              <Phone className="mr-2 w-5 h-5" />
              Llamanos ahora
            </Button>
          </div>

          {/* Contact options */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#FFB800]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFB800] transition-colors duration-300">
                <Phone className="w-8 h-8 text-[#FFB800] group-hover:text-[#111111] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Llamanos</h3>
              <p className="text-white/70">{data.phone}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#FFB800]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFB800] transition-colors duration-300">
                <Mail className="w-8 h-8 text-[#FFB800] group-hover:text-[#111111] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Escribinos</h3>
              <p className="text-white/70">{data.email}</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-[#FFB800]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFB800] transition-colors duration-300">
                <ArrowRight className="w-8 h-8 text-[#FFB800] group-hover:text-[#111111] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Respuesta</h3>
              <p className="text-white/70">En menos de 24hs</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FFB800] mb-1">+500</div>
                <div className="text-white/70 text-sm">Proyectos realizados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FFB800] mb-1">+50</div>
                <div className="text-white/70 text-sm">Clientes satisfechos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FFB800] mb-1">8</div>
                <div className="text-white/70 text-sm">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};