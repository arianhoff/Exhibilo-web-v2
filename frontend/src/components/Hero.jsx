import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const Hero = ({ data }) => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="min-h-screen bg-gradient-to-br from-[#FFB800] to-[#ffc933] flex items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight">
                {data.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#111111]/80 leading-relaxed max-w-2xl">
                {data.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('#contacto')}
                size="lg"
                className="bg-[#111111] hover:bg-[#333333] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 group"
              >
                {data.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={() => scrollToSection('#proyectos')}
                variant="outline"
                size="lg"
                className="border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                {data.ctaSecondary}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#111111]/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#111111]">500+</div>
                <div className="text-sm text-[#111111]/70">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#111111]">50+</div>
                <div className="text-sm text-[#111111]/70">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#111111]">8</div>
                <div className="text-sm text-[#111111]/70">Años</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <img 
                src={data.heroImage}
                alt="Exhibidor personalizado"
                className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-white text-[#111111] px-4 py-2 rounded-xl shadow-lg font-semibold animate-bounce">
                ✨ Diseño 3D
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#111111] text-white px-4 py-2 rounded-xl shadow-lg font-semibold">
                🏭 Producción propia
              </div>
            </div>

            {/* Background decorative shapes */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-[#111111]/10 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#111111]/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#111111]/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};