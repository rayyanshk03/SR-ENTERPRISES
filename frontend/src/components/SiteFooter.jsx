import React from 'react';
import { Instagram, Facebook, MessageCircle, Linkedin } from 'lucide-react';
import { contactInfo } from '../data/mock';

/**
 * SiteFooter — the shared site footer.
 * Drop this into any page to get the identical footer as the homepage.
 *
 * Props:
 *   setSelectedCategory — pass in so "Office Chairs" footer link works
 */
const SiteFooter = ({ setSelectedCategory }) => {
  return (
    <footer data-testid="site-footer" className="bg-black text-white pt-[60px] md:pt-20 pb-10">
      <div style={{ padding: '0 40px' }}>
        {/* Top row — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Logo + tagline */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">SR Enterprises</h3>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed">
              India's leading chair manufacturer.<br />
              Crafted for comfort. Built for business.
            </p>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Office Chairs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  Office Chairs
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('School Chairs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  School Chairs
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Custom Chairs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  Custom Chairs
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Packaging Materials');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  Packaging Materials
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory('Office Materials');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  Office Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><a href="#why-us" className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">About</a></li>
              <li><a href="#instagram-feed" className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">Gallery</a></li>
              <li><a href="#catalogue" className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">Catalogue</a></li>
              <li><a href="#contact" className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:+91${contactInfo.phone}`} className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">
                  +91-{contactInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#6E6E73] hover:text-[#F5F5F7] transition-colors duration-200"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="text-[14px] text-[#6E6E73] leading-relaxed">
                {contactInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#6E6E73]">
            &copy; 2024 SR Enterprises. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/nestby_sr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-testid="footer-social-instagram"
              className="text-[#6E6E73] hover:text-white transition-colors duration-200"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/company/sr-enterprises"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-testid="footer-social-linkedin"
              className="text-[#6E6E73] hover:text-[#0077b5] transition-colors duration-200"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              data-testid="footer-social-facebook"
              className="text-[#6E6E73] hover:text-white transition-colors duration-200"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              data-testid="footer-social-whatsapp"
              className="text-[#6E6E73] hover:text-[#25D366] transition-colors duration-200"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
