import React from 'react';

export const ClientLogos = ({ data }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Marcas que confían
          </h2>
          <p className="text-[#555555] text-lg max-w-2xl mx-auto">
            Trabajamos con las marcas más importantes del mercado, 
            creando soluciones que impulsan sus ventas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {data.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={client.logo}
                alt={client.name}
                className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#FFB800] to-transparent w-64"></div>
        </div>
      </div>
    </section>
  );
};