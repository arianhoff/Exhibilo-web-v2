import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { api } from '../api';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.getTestimonials();
        setTestimonials(response.testimonials || []);
        setError(null);
      } catch (err) {
        console.error('Error loading testimonials:', err);
        setError('Error al cargar los testimoniales');
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FFB800]" />
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-20 bg-[#F7F7F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-[#555555]">{error || 'No hay testimoniales disponibles'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[#555555] text-lg max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa. 
            Descubre por qué eligen Exhibilo para sus proyectos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/5 rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Quote icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-16 h-16 text-[#FFB800]" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFB800] fill-current" />
                ))}
              </div>

              {/* Testimonial content */}
              <blockquote className="text-xl md:text-2xl text-[#111111] text-center mb-8 leading-relaxed font-medium">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Author info */}
              <div className="text-center">
                <div className="font-bold text-[#111111] text-lg">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-[#FFB800] font-medium">
                  {testimonials[currentIndex].position}
                </div>
                <div className="text-[#555555]">
                  {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="sm"
              className="rounded-full w-12 h-12 p-0 border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-[#111111]"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#FFB800] scale-110' 
                      : 'bg-[#555555]/30 hover:bg-[#FFB800]/50'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="sm"
              className="rounded-full w-12 h-12 p-0 border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800] hover:text-[#111111]"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Additional testimonials preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                index === currentIndex ? 'ring-2 ring-[#FFB800] scale-105' : 'opacity-70'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FFB800] fill-current" />
                ))}
              </div>
              <p className="text-sm text-[#555555] mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>
              <div className="text-xs">
                <div className="font-semibold text-[#111111]">{testimonial.author}</div>
                <div className="text-[#555555]">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};