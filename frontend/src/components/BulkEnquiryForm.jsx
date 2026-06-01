import React, { useState } from 'react';
import { Zap } from 'lucide-react';

const BulkEnquiryForm = ({ phoneNumber = "917387076969" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    city: '',
    phone: '',
    category: '',
    quantity: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 0. Save lead to backend Excel log
    fetch('http://localhost:8000/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'Bulk Enquiry',
        name: formData.fullName,
        phone: formData.phone,
        company: formData.company,
        city: formData.city,
        category: formData.category,
        quantity: String(formData.quantity),
        message: formData.message,
      }),
    }).catch((err) => console.error('Failed to log lead to Excel:', err));

    // Build WhatsApp pre-filled message
    const messageLines = [
      `*Bulk Enquiry from ${formData.fullName || 'a customer'}*`,
      '',
      `Name: ${formData.fullName}`,
      `Company/School: ${formData.company}`,
      `City: ${formData.city}`,
      `Phone: ${formData.phone}`,
      `Product Category: ${formData.category}`,
      `Quantity Required: ${formData.quantity}`,
      '',
      `Message: ${formData.message || '—'}`,
    ];
    const text = encodeURIComponent(messageLines.join('\n'));
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="bulk-enquiry"
      data-testid="bulk-enquiry-section"
      className="bg-[#F5F5F7] py-[60px] md:py-[120px] px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left Column - 40% */}
          <div className="lg:col-span-2">
            <div
              className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              Bulk Orders
            </div>
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#1D1D1F] leading-tight mb-6">
              Let's talk quantity.
            </h2>
            <p className="text-base md:text-[17px] text-[#6E6E73] leading-relaxed mb-6">
              Minimum 10 units. Special pricing above 50 units. Get a customized
              quote within 2 hours on WhatsApp.
            </p>
            <div className="flex items-center text-sm text-[#6E6E73]">
              <Zap className="w-4 h-4 mr-2 text-[#25D366]" />
              Average response time: 15 minutes
            </div>
          </div>

          {/* Right Column - 60% Form Card */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              data-testid="bulk-enquiry-form"
              className="bg-white rounded-3xl p-6 md:p-12"
              style={{
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
              }}
            >
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    data-testid="form-full-name"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                {/* Company/School Name */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Company / School Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    data-testid="form-company"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    placeholder="Organization name"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    data-testid="form-city"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    placeholder="Your city"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9+\-\s]{7,}"
                    data-testid="form-phone"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                {/* Product Category */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Product Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    data-testid="form-category"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200 appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236E6E73' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: '40px',
                    }}
                  >
                    <option value="">Select a category</option>
                    <option value="Office Chairs">Office Chairs</option>
                    <option value="School Chairs">School Chairs</option>
                    <option value="Custom Chairs">Custom Chairs</option>
                    <option value="Packaging Materials">Packaging Materials</option>
                    <option value="Office Materials">Office Materials</option>
                  </select>
                </div>

                {/* Quantity Required */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Quantity Required
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="10"
                    required
                    data-testid="form-quantity"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    placeholder="Minimum 10 units"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#1D1D1F] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    data-testid="form-message"
                    className="w-full px-4 py-3.5 border border-[#D2D2D7] rounded-xl text-[17px] text-[#1D1D1F] bg-[#F5F5F7] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all duration-200"
                    style={{ resize: 'none' }}
                    placeholder="Any specific requirements, dimensions, colors?"
                  />
                </div>

                {/* Submit Button (Green - opens WhatsApp) */}
                <button
                  type="submit"
                  data-testid="form-submit-button"
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-medium border-none cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    padding: '18px',
                    fontSize: '17px',
                  }}
                >
                  Send Bulk Enquiry on WhatsApp →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkEnquiryForm;
