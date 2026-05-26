import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Mail, Clock, ChevronRight, Star } from 'lucide-react';
import { products, features, stats, factoryImages, clients, testimonials, contactInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const target = parseInt(stat.value);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timers[index]);
        }
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, duration / steps);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#1D1D1F]">SR Enterprises</div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Products</a>
              <a href="#why-us" className="text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Why Us</a>
              <a href="#factory" className="text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Factory</a>
              <a href="#testimonials" className="text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Reviews</a>
              <a href="#contact" className="text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Contact</a>
              <Button 
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-6 py-2.5 text-[17px] font-medium transition-all"
              >
                Order on WhatsApp
              </Button>
            </div>

            <button 
              className="md:hidden text-[#1D1D1F]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a href="#products" className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Products</a>
              <a href="#why-us" className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Why Us</a>
              <a href="#factory" className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Factory</a>
              <a href="#testimonials" className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Reviews</a>
              <a href="#contact" className="block text-[#1D1D1F] hover:text-[#6E6E73] transition-colors text-[17px]">Contact</a>
              <Button 
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-6 py-2.5 text-[17px] font-medium"
              >
                Order on WhatsApp
              </Button>
            </div>
          )}
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-[#1D1D1F] rounded-full">
            <span className="text-white font-semibold text-sm">India's #1 Chair Manufacturer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] mb-6 leading-tight">
            Crafted for <span className="text-[#6E6E73]">Comfort.</span><br />
            Built for <span className="text-[#6E6E73]">Business.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#6E6E73] mb-10 max-w-3xl mx-auto">
            Direct from factory. Premium quality chairs for offices, schools, and institutions — delivered pan-India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-8 py-6 text-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Order on WhatsApp
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-[#1D1D1F] text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white rounded-full px-8 py-6 text-lg font-medium transition-all"
            >
              Download Catalogue
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#1D1D1F] mb-4">Products</h2>
            <p className="text-2xl text-[#6E6E73]">Every chair. Every need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-xs font-semibold text-[#1D1D1F]">{product.category}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">{product.title}</h3>
                  <p className="text-[#6E6E73] mb-4">{product.description}</p>
                  <button className="flex items-center text-[#1D1D1F] hover:text-[#6E6E73] font-medium group/btn">
                    Learn more
                    <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#1D1D1F] mb-4">Why 500+ businesses choose us.</h2>
            <p className="text-2xl text-[#6E6E73]">Direct from the manufacturer. No middlemen. No compromises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-3">{feature.title}</h3>
                <p className="text-[#6E6E73] text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#1D1D1F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={stat.id}>
                <div className="text-6xl font-bold mb-2">
                  {animatedStats[index]}{stat.suffix}
                </div>
                <div className="text-xl text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="factory" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-gray-100 rounded-full">
              <span className="text-[#1D1D1F] font-semibold">Factory Tour</span>
            </div>
            <h2 className="text-5xl font-bold text-[#1D1D1F] mb-4">See how your chair is born.</h2>
            <p className="text-xl text-[#6E6E73]">Inside our 15,000 sq.ft production facility</p>
          </div>
          
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Factory Tour Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {factoryImages.map((image) => (
              <div key={image.id} className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <p className="text-white font-semibold p-4">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#1D1D1F] mb-2">Trusted across India.</h2>
          <p className="text-xl text-[#6E6E73]">From schools in Kerala to corporates in Mumbai.</p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll space-x-12">
            {[...clients, ...clients].map((client, index) => (
              <div key={index} className="flex-shrink-0 w-40 h-24 flex items-center justify-center bg-white rounded-2xl shadow-sm">
                <span className="text-2xl font-bold text-[#6E6E73]">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#1D1D1F] mb-4">What our clients say</h2>
          </div>
          
          <div className="relative">
            <Card className="border-0 shadow-2xl rounded-3xl p-8 md:p-12">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#1D1D1F] text-[#1D1D1F]" />
                ))}
              </div>
              <p className="text-2xl text-[#1D1D1F] mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-[#1D1D1F] flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonials[currentTestimonial].initials}
                </div>
                <div>
                  <div className="font-bold text-[#1D1D1F] text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-[#6E6E73]">{testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}</div>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#1D1D1F] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-[40px] font-bold text-[#1D1D1F] mb-12">Visit our showroom.</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-start mb-2">
                    <MapPin className="w-5 h-5 text-[#6E6E73] mr-3 mt-1" />
                    <div>
                      <div className="text-sm text-[#6E6E73] mb-1">Address</div>
                      <div className="text-[17px] text-[#1D1D1F] font-medium">{contactInfo.address}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-2">
                    <Phone className="w-5 h-5 text-[#6E6E73] mr-3 mt-1" />
                    <div>
                      <div className="text-sm text-[#6E6E73] mb-1">Phone</div>
                      <a href={`tel:+91${contactInfo.phone}`} className="text-[17px] text-[#1D1D1F] font-medium hover:text-[#6E6E73] transition-colors">
                        +91-{contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-2">
                    <Mail className="w-5 h-5 text-[#6E6E73] mr-3 mt-1" />
                    <div>
                      <div className="text-sm text-[#6E6E73] mb-1">Email</div>
                      <a href={`mailto:${contactInfo.email}`} className="text-[17px] text-[#1D1D1F] font-medium hover:text-[#6E6E73] transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start mb-2">
                    <Clock className="w-5 h-5 text-[#6E6E73] mr-3 mt-1" />
                    <div>
                      <div className="text-sm text-[#6E6E73] mb-1">Hours</div>
                      <div className="text-[17px] text-[#1D1D1F] font-medium">{contactInfo.hours}</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Shikrapur+Pune`, '_blank')}
                className="mt-10 bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-full px-7 py-6 text-[17px] font-medium transition-all shadow-md hover:shadow-lg"
              >
                Get Directions
              </Button>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden h-[400px] shadow-lg">
                <iframe
                  src={contactInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#1D1D1F] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SR Enterprises</h3>
              <p className="text-gray-400">India's leading chair manufacturer since 2010.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Office Chairs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">School Chairs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Factory Tour</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91-{contactInfo.phone}</li>
                <li>{contactInfo.email}</li>
                <li>{contactInfo.address}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SR Enterprises. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;