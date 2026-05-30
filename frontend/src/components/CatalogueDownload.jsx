import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const CatalogueDownload = ({
  whatsappNumber = "917387076969",
  // Replace with your real Google Drive PDF link
  pdfUrl = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID",
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Trigger PDF download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'SR-Enterprises-Catalogue.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Notify on WhatsApp (opens chat with pre-filled message)
    const text = encodeURIComponent(
      `*New Catalogue Download*\n\nName: ${name}\nPhone: ${phone}\n\nPlease send me the direct catalogue link.`
    );
    // Open WhatsApp in a new tab (small delay so download starts first)
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    }, 400);

    // 3. Show success message
    setSubmitted(true);
  };

  return (
    <section
      id="catalogue"
      data-testid="catalogue-section"
      className="bg-[#F5F5F7]"
      style={{ padding: '120px 40px' }}
    >
      <div
        className="mx-auto text-center"
        style={{ maxWidth: '680px' }}
      >
        {/* Label */}
        <div
          className="font-semibold text-[#1D1D1F] uppercase mb-4"
          style={{ fontSize: '14px', letterSpacing: '0.08em' }}
        >
          Free Download
        </div>

        {/* Headline */}
        <h2
          className="font-bold text-[#1D1D1F] leading-tight mb-5"
          style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
        >
          Everything in one catalogue.
        </h2>

        {/* Sub-text */}
        <p
          className="text-[#6E6E73] leading-relaxed mx-auto"
          style={{
            fontSize: 'clamp(17px, 2vw, 21px)',
            marginBottom: '48px',
            maxWidth: '560px',
          }}
        >
          Full product list with specs, bulk pricing tiers, and custom order details.
        </p>

        {/* Catalogue Preview - 3D tilted mockup */}
        <div
          className="mx-auto"
          style={{
            width: 'min(400px, 80%)',
            marginBottom: '48px',
            perspective: '1200px',
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden bg-white"
            style={{
              transform: 'rotateY(-8deg) rotateX(4deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
              aspectRatio: '3 / 4',
            }}
          >
            {/* Catalogue cover content */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-br from-[#1D1D1F] to-[#2D2D2F] text-white">
              <div>
                <div
                  className="text-xs font-semibold uppercase opacity-70"
                  style={{ letterSpacing: '0.12em' }}
                >
                  Product Catalogue 2026
                </div>
                <div className="text-3xl font-bold mt-6 leading-tight">
                  SR<br />Enterprises
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=srgb&fm=jpg&w=400&q=80"
                  alt="Chair preview"
                  className="w-full h-44 object-cover rounded-xl opacity-90"
                />
                <div className="text-sm mt-4 opacity-70">
                  Crafted for Comfort. Built for Business.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form or Success State */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            data-testid="catalogue-form"
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: '12px' }}
          >
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              data-testid="catalogue-name-input"
              className="border border-[#D2D2D7] bg-white rounded-full text-[#1D1D1F] focus:border-[#1D1D1F] focus:outline-none transition-colors"
              style={{
                padding: '14px 20px',
                width: '220px',
                fontSize: '15px',
                maxWidth: '100%',
              }}
            />
            <input
              type="tel"
              required
              pattern="[0-9+\-\s]{7,}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              data-testid="catalogue-phone-input"
              className="border border-[#D2D2D7] bg-white rounded-full text-[#1D1D1F] focus:border-[#1D1D1F] focus:outline-none transition-colors"
              style={{
                padding: '14px 20px',
                width: '220px',
                fontSize: '15px',
                maxWidth: '100%',
              }}
            />
            <button
              type="submit"
              data-testid="catalogue-submit"
              className="bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-full font-medium border-none cursor-pointer transition-colors whitespace-nowrap"
              style={{
                padding: '14px 28px',
                fontSize: '15px',
              }}
            >
              Download Now
            </button>
          </form>
        ) : (
          <div
            data-testid="catalogue-success"
            className="inline-flex items-center justify-center bg-white rounded-full text-[#1D1D1F]"
            style={{
              padding: '14px 24px',
              fontSize: '15px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <CheckCircle2 className="w-5 h-5 text-[#25D366] mr-2" />
            Downloading... Check your WhatsApp in 2 mins for a direct link.
          </div>
        )}

        {/* Privacy note */}
        <p
          className="text-[#6E6E73] mt-6"
          style={{ fontSize: '12px' }}
        >
          We never share your details.
        </p>
      </div>
    </section>
  );
};

export default CatalogueDownload;
