import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronRight, Star, MessageCircle, Check, Boxes, Hammer, Trees, Feather, Settings, Package, TrendingUp, Handshake, CreditCard, CheckCircle } from 'lucide-react';
import { products, features, stats, factoryImages, clients, testimonials, contactInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import WhatsAppButton from '../components/WhatsAppButton';
import BulkEnquiryForm from '../components/BulkEnquiryForm';
import InstagramFeed from '../components/InstagramFeed';
import CatalogueDownload from '../components/CatalogueDownload';
import Reveal from '../components/Reveal';
import { useParallax } from '../hooks/useScrollReveal';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import MapEmbed from '../components/MapEmbed';
import OfficeChairsPage from './OfficeChairsPage';
import SchoolChairsPage from './SchoolChairsPage';
import CustomChairsPage from './CustomChairsPage';
import PackagingMaterialsPage from './PackagingMaterialsPage';
import OfficeMaterialsPage from './OfficeMaterialsPage';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Supplier Form state
  const [supplierForm, setSupplierForm] = useState({
    fullName: '',
    businessName: '',
    material: '',
    cityState: '',
    phone: '',
    whatsapp: '',
    capacity: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSupplierInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSupplierFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!supplierForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!supplierForm.businessName.trim()) errors.businessName = 'Business name is required';
    if (!supplierForm.material) errors.material = 'Please select a material type';
    if (!supplierForm.cityState.trim()) errors.cityState = 'City & State is required';
    if (!supplierForm.phone.trim()) errors.phone = 'Phone number is required';
    if (!supplierForm.capacity) errors.capacity = 'Please select monthly capacity';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setSupplierForm({
        fullName: '',
        businessName: '',
        material: '',
        cityState: '',
        phone: '',
        whatsapp: '',
        capacity: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 5000);
  };

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

  // ── Office Chairs page ───────────────────────────────────────────
  if (selectedCategory === 'Office Chairs') {
    return (
      <>
        <SiteNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <OfficeChairsPage
          onBack={() => {
            setSelectedCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whatsappNumber={contactInfo.whatsapp}
        />
        <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
      </>
    );
  }

  // ── School Chairs page ───────────────────────────────────────────
  if (selectedCategory === 'School Chairs') {
    return (
      <>
        <SiteNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <SchoolChairsPage
          onBack={() => {
            setSelectedCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
      </>
    );
  }

  // ── Custom Chairs page ───────────────────────────────────────────
  if (selectedCategory === 'Custom Chairs') {
    return (
      <>
        <SiteNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <CustomChairsPage
          onBack={() => {
            setSelectedCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
      </>
    );
  }

  // ── Packaging Materials page ─────────────────────────────────────
  if (selectedCategory === 'Packaging Materials') {
    return (
      <>
        <SiteNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <PackagingMaterialsPage
          onBack={() => {
            setSelectedCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
      </>
    );
  }

  // ── Office Materials page ────────────────────────────────────────
  if (selectedCategory === 'Office Materials') {
    return (
      <>
        <SiteNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <OfficeMaterialsPage
          onBack={() => {
            setSelectedCategory(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
      </>
    );
  }


  // ── Main homepage ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <SiteNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white" style={{ paddingTop: '130px', paddingBottom: '120px' }}>
        <div style={{ padding: '0 60px', width: '100%' }}>
          <Reveal as="div" stagger className="w-full text-center">
            <div style={{ margin: '0 auto 32px', display: 'block', width: 'fit-content', backgroundColor: '#111', color: '#fff', borderRadius: '999px', padding: '10px 24px', fontSize: '15px', fontWeight: '600', letterSpacing: '0.01em' }}>
              India's #1 Chair Manufacturer
            </div>
            <h1 style={{ fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: '1.05', fontWeight: '800', textAlign: 'center', color: '#111', marginBottom: '0' }}>
              Crafted for <span style={{ color: '#999' }}>Comfort.</span><br />
              Built for <span style={{ color: '#999' }}>Business.</span>
            </h1>
            <p style={{ maxWidth: '640px', margin: '28px auto 0', fontSize: '20px', color: '#666', textAlign: 'center', lineHeight: '1.65' }}>
              Direct from factory. Premium quality chairs for offices, schools, and institutions — delivered pan-India.
            </p>
            <div style={{ marginTop: '48px', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp}`, '_blank')}
                style={{ background: '#22c55e', color: 'white', padding: '18px 40px', borderRadius: '999px', fontSize: '18px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
              >
                Order on WhatsApp
              </button>
              <button
                onClick={() => document.querySelector('#catalogue')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'transparent', color: '#111', padding: '18px 40px', borderRadius: '999px', border: '2px solid #111', fontSize: '18px', fontWeight: '600', cursor: 'pointer' }}
              >
                Download Catalogue
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-12 md:py-24 bg-white text-center">
        <div className="w-full">
          <Reveal className="text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#111] m-0">Products</h2>
          </Reveal>
          <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-6 md:px-16 pt-10 md:pt-14">
            {products.map((product) => {
              const isClickable = product.title === "Office Chairs" || product.title === "School Chairs" || product.title === "Custom Chairs" || product.title === "Packaging Materials" || product.title === "Office Materials";
              return (
                <div
                  key={product.id}
                  className={`group ${isClickable ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (isClickable) {
                      setSelectedCategory(product.title);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 30px 60px -15px rgba(0, 0, 0, 0.22), 0 12px 24px -10px rgba(0, 0, 0, 0.12)';
                    if (isClickable) {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.08)';
                    if (isClickable) {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <div className="relative overflow-hidden h-[260px] md:h-[360px]">
                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" />
                    <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#fff', padding: '12px 22px', borderRadius: '999px', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#111', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{product.category}</span>
                    </div>
                  </div>
                  <div style={{ padding: '32px 32px 36px', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '30px', fontWeight: '700', color: '#111', margin: '0 0 14px' }}>{product.title}</h3>
                    <p style={{ fontSize: '18px', color: '#6b7280', margin: '0 0 28px', lineHeight: '1.65' }}>{product.description}</p>
                    {isClickable ? (
                      <span
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', fontWeight: 700, color: '#0071E3' }}
                        className="group-hover:underline"
                      >
                        View Collection <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    ) : (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in "${product.title}". Please share details.`)}`, '_blank');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', fontWeight: 700, color: '#25D366', cursor: 'pointer' }}
                      >
                        Enquire on WhatsApp <ChevronRight size={20} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-16 md:py-24 px-6 md:px-16 bg-[#f5f5f7]">
        <Reveal className="text-center" style={{ marginBottom: '60px' }}>
          <h2 className="text-3xl md:text-[44px] font-bold text-[#111] mb-3 leading-tight">Why 500+ businesses choose us.</h2>
          <p style={{ fontSize: '18px', color: '#888', margin: '0' }}>Direct from the manufacturer. No middlemen. No compromises.</p>
        </Reveal>
        <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div key={feature.id} style={{ background: '#fff', padding: '28px 30px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111', margin: '0 0 10px' }}>{feature.title}</h3>
              <p style={{ fontSize: '15px', color: '#6b7280', margin: '0', lineHeight: '1.6' }}>{feature.description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Stats */}
      <section className="py-[60px] md:py-20 bg-[#1D1D1F] text-white">
        <div style={{ padding: '0 40px' }}>
          <Reveal as="div" stagger className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={stat.id}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{animatedStats[index]}{stat.suffix}</div>
                <div className="text-lg md:text-xl text-gray-400">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Supplier Network Section */}
      <section id="supplier-network" className="py-20 md:py-32 bg-white border-t border-gray-100">
        <div style={{ padding: '0 40px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Section Header */}
          <Reveal className="text-center mb-16 md:mb-24">
            <div className="inline-block bg-gray-100 text-gray-500 text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-6">
              SUPPLIER NETWORK
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight mb-6">
              Build the Future of Seating. Together.
            </h2>
            <p className="text-[17px] md:text-xl text-[#8E8E93] max-w-[600px] mx-auto leading-relaxed">
              We're looking for reliable raw material partners across India to grow with us.
            </p>
          </Reveal>

          {/* Who We're Looking For */}
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-10 text-center tracking-tight">Who we're looking for</h3>
            
            <Reveal as="div" stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: PP Plastic */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Boxes size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Plastic & PP Granules</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">Suppliers of raw PP/HDPE plastic crumbs and granules for chair shells and bases.</p>
                </div>
              </div>

              {/* Card 2: Metal Frames */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Hammer size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Metal & Steel Frames</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">MS pipe, square tube, and steel frame fabricators for chair structures.</p>
                </div>
              </div>

              {/* Card 3: Wood & Plywood */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Trees size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Wood & Plywood</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">Seasoned wood, MDF, and plywood suppliers for wooden chair components.</p>
                </div>
              </div>

              {/* Card 4: Fabric & Foam */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Feather size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Fabric & Foam</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">Upholstery fabric, high-density foam, and seat cushion material suppliers.</p>
                </div>
              </div>

              {/* Card 5: Hardware & Mechanisms */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Settings size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Hardware & Mechanisms</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">Gas lifts, caster wheels, armrest brackets, and reclining mechanisms.</p>
                </div>
              </div>

              {/* Card 6: Packaging Materials */}
              <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#1D1D1F]">
                      <Package size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Hiring Partners
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-2">Packaging Materials</h4>
                  <p className="text-sm text-[#6E6E73] leading-relaxed text-left">Corrugated boxes, bubble wrap, foam inserts, and stretch film suppliers.</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Trust Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-gray-100 my-24">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gray-50 rounded-xl text-[#1D1D1F] mt-0.5">
                <TrendingUp size={20} />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-[#1D1D1F] text-base mb-1">Growing Fast</h5>
                <p className="text-sm text-[#6E6E73] leading-relaxed">Scaling production with consistent bulk material requirements every month.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gray-50 rounded-xl text-[#1D1D1F] mt-0.5">
                <Handshake size={20} />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-[#1D1D1F] text-base mb-1">Long Term Contracts</h5>
                <p className="text-sm text-[#6E6E73] leading-relaxed">We believe in stable, recurring supplier relationships — not one-time purchases.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-gray-50 rounded-xl text-[#1D1D1F] mt-0.5">
                <CreditCard size={20} />
              </div>
              <div className="text-left">
                <h5 className="font-bold text-[#1D1D1F] text-base mb-1">On-Time Payments</h5>
                <p className="text-sm text-[#6E6E73] leading-relaxed">GST-compliant invoicing with reliable, structured payment cycles.</p>
              </div>
            </div>
          </div>

          {/* Supplier Registration Form */}
          <div className="max-w-[700px] mx-auto bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {formSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-bold text-[#1D1D1F] mb-3">Thanks!</h4>
                <p className="text-base text-[#6E6E73]">We'll reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSupplierFormSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#1D1D1F] tracking-tight mb-2">Register as a Supplier</h3>
                  <p className="text-sm md:text-base text-[#8E8E93]">Fill in your details and we'll get back within 24 hours</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={supplierForm.fullName}
                      onChange={handleSupplierInputChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                    />
                    {formErrors.fullName && <p className="text-xs text-red-500 font-medium text-left">{formErrors.fullName}</p>}
                  </div>

                  {/* Business Name */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={supplierForm.businessName}
                      onChange={handleSupplierInputChange}
                      placeholder="Acme Materials Ltd"
                      className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.businessName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                    />
                    {formErrors.businessName && <p className="text-xs text-red-500 font-medium text-left">{formErrors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Material dropdown */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Material You Supply *</label>
                    <select
                      name="material"
                      value={supplierForm.material}
                      onChange={handleSupplierInputChange}
                      className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.material ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                    >
                      <option value="">Select Category</option>
                      <option value="PP Granules">Plastic/PP Granules</option>
                      <option value="Metal Frames">Metal Frames</option>
                      <option value="Wood/Plywood">Wood/Plywood</option>
                      <option value="Fabric & Foam">Fabric & Foam</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.material && <p className="text-xs text-red-500 font-medium text-left">{formErrors.material}</p>}
                  </div>

                  {/* City & State */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">City & State *</label>
                    <input
                      type="text"
                      name="cityState"
                      value={supplierForm.cityState}
                      onChange={handleSupplierInputChange}
                      placeholder="Pune, Maharashtra"
                      className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.cityState ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                    />
                    {formErrors.cityState && <p className="text-xs text-red-500 font-medium text-left">{formErrors.cityState}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={supplierForm.phone}
                      onChange={handleSupplierInputChange}
                      placeholder="9876543210"
                      className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                    />
                    {formErrors.phone && <p className="text-xs text-red-500 font-medium text-left">{formErrors.phone}</p>}
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-2 flex flex-col">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={supplierForm.whatsapp}
                      onChange={handleSupplierInputChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]"
                    />
                  </div>
                </div>

                {/* Capacity Dropdown */}
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Monthly Supply Capacity *</label>
                  <select
                    name="capacity"
                    value={supplierForm.capacity}
                    onChange={handleSupplierInputChange}
                    className={`w-full px-4 py-3.5 bg-gray-50 border ${formErrors.capacity ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F]`}
                  >
                    <option value="">Select capacity</option>
                    <option value="Upto 100kg">Upto 100kg</option>
                    <option value="100-500kg">100–500kg</option>
                    <option value="500kg-1 Ton">500kg–1 Ton</option>
                    <option value="1-5 Tons">1–5 Tons</option>
                    <option value="5+ Tons">5+ Tons</option>
                  </select>
                  {formErrors.capacity && <p className="text-xs text-red-500 font-medium text-left">{formErrors.capacity}</p>}
                </div>

                {/* Brief Message */}
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider text-left">Brief Message</label>
                  <textarea
                    name="message"
                    value={supplierForm.message}
                    onChange={handleSupplierInputChange}
                    placeholder="Tell us about your business and materials..."
                    rows={4}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:bg-white outline-none transition-all text-sm text-[#1D1D1F] resize-none text-left"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-xl py-4 font-semibold text-sm transition-all shadow-md hover:shadow-lg mt-2"
                >
                  Send Supplier Request
                </Button>

                {/* Direct WhatsApp Option */}
                <div className="pt-6 border-t border-gray-100 text-center space-y-4">
                  <p className="text-xs text-[#8E8E93] font-medium uppercase tracking-wider">Or reach us directly on WhatsApp</p>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = encodeURIComponent(`Hi SR Enterprises, we would like to register as raw material suppliers.`);
                      window.open(`https://wa.me/${contactInfo.whatsapp}?text=${msg}`, '_blank');
                    }}
                    className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#1ebd53] text-white rounded-full px-6 py-3 font-semibold text-sm transition-all shadow-sm hover:shadow-md border-0"
                  >
                    <MessageCircle size={16} />
                    Chat with Procurement
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Sourcing Strip */}
        <div className="bg-[#F5F5F7] py-6 mt-20 border-t border-b border-gray-100 overflow-x-auto">
          <div className="max-w-[1200px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-4 whitespace-nowrap">
            <span className="text-xs md:text-sm text-[#6E6E73] font-semibold uppercase tracking-wider">
              Currently sourcing from
            </span>
            <div className="flex gap-3">
              {['Mumbai', 'Pune', 'Bangalore', 'Delhi', 'Surat'].map((city) => (
                <span key={city} className="bg-[#1D1D1F] text-white text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Ticker */}
      <section className="py-[60px] md:py-16 bg-gray-50 overflow-hidden">
        <div style={{ padding: '0 40px' }}>
          <Reveal className="w-full mb-8 text-center">
            <h2 className="text-[32px] md:text-4xl font-bold text-[#1D1D1F] mb-2 leading-tight">Trusted across India.</h2>
            <p className="text-base md:text-xl text-[#6E6E73]">From schools in Kerala to corporates in Mumbai.</p>
          </Reveal>
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll space-x-8 md:space-x-12 w-max">
              {Array(8).fill(clients).flat().map((client, index) => (
                <div key={index} className="flex-shrink-0 w-44 md:w-52 h-24 md:h-28 flex items-center justify-center bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100/80 px-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:scale-[1.02]">
                  <span className="text-lg md:text-xl font-semibold text-[#1D1D1F] text-center leading-tight tracking-tight">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-[60px] md:py-20 bg-white">
        <div style={{ padding: '0 40px' }}>
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-[36px] md:text-5xl font-bold text-[#1D1D1F] mb-4 leading-tight">What our clients say</h2>
          </Reveal>
          <Reveal className="relative">
            <Card className="border-0 shadow-2xl rounded-3xl p-6 md:p-12">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-[#1D1D1F] text-[#1D1D1F]" />
                ))}
              </div>
              <p className="text-lg md:text-2xl text-[#1D1D1F] mb-8 leading-relaxed">
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
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? 'bg-[#1D1D1F] w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <BulkEnquiryForm phoneNumber={contactInfo.whatsapp} />
      <CatalogueDownload whatsappNumber={contactInfo.whatsapp} />
      <InstagramFeed handle="nestby_sr" profileUrl="https://www.instagram.com/nestby_sr/" />

      {/* Contact */}
      <section id="contact" className="py-[60px] md:py-20 bg-white">
        <div style={{ padding: '0 40px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-[36px] md:text-[40px] font-bold text-[#1D1D1F] mb-10 md:mb-12 leading-tight">Visit our showroom.</h2>
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
                onClick={() => window.open(`https://www.google.com/maps/place/SR+ENTERPRISES/@18.6924124,73.7936763,66466m/data=!3m1!1e3!4m10!1m2!2m1!1ssr+enterprises!3m6!1s0x3bc2d1a4b748ed33:0x9915d468ab93b13f!8m2!3d18.6924124!4d74.0985469!15sCg5zciBlbnRlcnByaXNlc1oQIg5zciBlbnRlcnByaXNlc5IBFm9mZmljZV9mdXJuaXR1cmVfc3RvcmXgAQA!16s%2Fg%2F11zbnjgpyt?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D`, '_blank')}
                className="mt-10 bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-full px-7 py-6 text-[17px] font-medium transition-all shadow-md hover:shadow-lg"
              >
                Get Directions
              </Button>
            </div>
            <div>
              <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-lg group">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-[1000] pointer-events-none flex items-end justify-center pb-4">
                  <span className="bg-white/95 text-[#1D1D1F] px-5 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-gray-100 flex items-center gap-2 pointer-events-none">
                    📍 Tap to open Google Maps
                  </span>
                </div>
                <MapEmbed
                  onClick={() => window.open(`https://www.google.com/maps/place/SR+ENTERPRISES/@18.6924124,73.7936763,66466m/data=!3m1!1e3!4m10!1m2!2m1!1ssr+enterprises!3m6!1s0x3bc2d1a4b748ed33:0x9915d468ab93b13f!8m2!3d18.6924124!4d74.0985469!15sCg5zciBlbnRlcnByaXNlc1oQIg5zciBlbnRlcnByaXNlc5IBFm9mZmljZV9mdXJuaXR1cmVfc3RvcmXgAQA!16s%2Fg%2F11zbnjgpyt?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D`, '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter setSelectedCategory={setSelectedCategory} />
      <WhatsAppButton phoneNumber={contactInfo.whatsapp} />
    </div>
  );
};

export default Home;
