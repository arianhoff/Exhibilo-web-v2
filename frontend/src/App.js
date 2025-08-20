import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Import components
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ClientLogos } from "./components/ClientLogos";
import { Services } from "./components/Services";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { Process } from "./components/Process";
import { Testimonials } from "./components/Testimonials";
import { CTASection } from "./components/CTASection";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

// Import mock data
import { mockData } from "./mock";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero data={mockData.hero} />
      <ClientLogos data={mockData.clientLogos} />
      <Services />
      <ProjectsGrid />
      <Process data={mockData.process} />
      <Testimonials />
      <CTASection data={mockData.company} />
      <ContactForm data={mockData} />
      <Footer data={mockData.company} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;