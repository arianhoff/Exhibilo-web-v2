import React, { useState, useEffect } from 'react';
import { Palette, Factory, Truck, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { api } from '../api';

const iconMap = {
  Palette: Palette,
  Factory: Factory,
  Truck: Truck,
};

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await api.getServices();
        setServices(response.services || []);
        setError(null);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Error al cargar los servicios');
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <section id="servicios" className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              Nuestros Servicios
            </h2>
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FFB800]" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="servicios" className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="servicios" className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-[#555555] text-lg max-w-3xl mx-auto">
            Desde el concepto inicial hasta la implementación final, 
            ofrecemos un servicio integral para maximizar el impacto de tu marca.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#FFB800]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#FFB800] transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-[#FFB800] group-hover:text-[#111111] transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#111111] mb-4 group-hover:text-[#FFB800] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-[#555555] leading-relaxed mb-6">
                  {service.description}
                </p>

                <Button 
                  variant="ghost" 
                  className="text-[#FFB800] hover:text-[#111111] hover:bg-[#FFB800] p-0 h-auto font-semibold group/btn"
                >
                  Conocer más 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Process indicators */}
        <div className="flex items-center justify-center space-x-4 mt-16">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FFB800] rounded-full"></div>
            <span className="text-sm text-[#555555]">Consultoría</span>
          </div>
          <div className="w-8 h-px bg-[#555555]/30"></div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FFB800] rounded-full"></div>
            <span className="text-sm text-[#555555]">Diseño</span>
          </div>
          <div className="w-8 h-px bg-[#555555]/30"></div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FFB800] rounded-full"></div>
            <span className="text-sm text-[#555555]">Producción</span>
          </div>
          <div className="w-8 h-px bg-[#555555]/30"></div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#FFB800] rounded-full"></div>
            <span className="text-sm text-[#555555]">Implementación</span>
          </div>
        </div>
      </div>
    </section>
  );
};