import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const Process = ({ data }) => {
  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Nuestro Proceso
          </h2>
          <p className="text-[#555555] text-lg max-w-3xl mx-auto">
            Un método probado que garantiza resultados excepcionales 
            en cada proyecto, desde la idea inicial hasta la implementación final.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {data.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center mb-12 last:mb-0 animate-fade-in-up ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#FFB800] text-[#111111] rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-[#111111]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#555555] leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center mx-8">
                <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-8 h-8 text-[#111111]" />
                </div>
                
                {index < data.length - 1 && (
                  <div className="w-0.5 h-16 bg-[#FFB800]/30 mt-4"></div>
                )}
              </div>

              {/* Visual element */}
              <div className={`flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                <div className="bg-gradient-to-br from-[#FFB800]/10 to-[#FFB800]/5 p-8 rounded-2xl border-2 border-[#FFB800]/20 hover:border-[#FFB800]/40 transition-colors duration-300">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#FFB800] mb-2">
                      {step.step < 10 ? `0${step.step}` : step.step}
                    </div>
                    <div className="text-[#555555] font-medium">
                      Paso {step.step}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline summary */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#111111] mb-4">
              Tiempo promedio del proyecto
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFB800]">15</div>
                <div className="text-sm text-[#555555]">días</div>
                <div className="text-xs text-[#555555]">Diseño</div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#555555]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFB800]">20</div>
                <div className="text-sm text-[#555555]">días</div>
                <div className="text-xs text-[#555555]">Producción</div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#555555]" />
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFB800]">5</div>
                <div className="text-sm text-[#555555]">días</div>
                <div className="text-xs text-[#555555]">Implementación</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};