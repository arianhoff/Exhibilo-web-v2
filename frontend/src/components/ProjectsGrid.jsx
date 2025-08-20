import React, { useState } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Filter } from 'lucide-react';

export const ProjectsGrid = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  const categories = ['Todos', ...new Set(data.map(project => project.category))];
  
  const filteredProjects = activeFilter === 'Todos' 
    ? data 
    : data.filter(project => project.category === activeFilter);

  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-[#555555] text-lg max-w-3xl mx-auto">
            Descubre algunos de nuestros trabajos más exitosos y 
            cómo hemos ayudado a diferentes marcas a destacar en el punto de venta.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === category 
                  ? 'bg-[#FFB800] hover:bg-[#e6a600] text-[#111111] border-[#FFB800]' 
                  : 'border-[#555555] text-[#555555] hover:border-[#FFB800] hover:text-[#FFB800]'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-[#FFB800] text-[#111111] px-3 py-1 rounded-full text-sm font-semibold">
                  {project.category}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/40 transition-colors duration-300 flex items-center justify-center">
                  <Button 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#111111] hover:bg-[#FFB800]"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver proyecto
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111111] mb-2 group-hover:text-[#FFB800] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#555555] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to view all projects */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#111111] hover:bg-[#333333] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            Ver todos los proyectos
            <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};