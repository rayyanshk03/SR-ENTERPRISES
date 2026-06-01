import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

/**
 * PageBreadcrumb — Apple-style breadcrumb trail + "← All Products" back link.
 *
 * Usage:
 *   <PageBreadcrumb
 *     pageName="Office Chairs"
 *     onHomeClick={() => setSelectedCategory(null)}
 *     onProductsClick={() => { setSelectedCategory(null); scrollTo('#products'); }}
 *     onBackClick={() => { setSelectedCategory(null); scrollTo(0); }}
 *     dark={true}   — pass true when rendered on a dark (black) background
 *   />
 *
 * Design tokens match the main site:
 *   Fonts:   DM Sans (body)
 *   Colors:  #6E6E73 muted | #0071E3 accent | #F5F5F7 light | #1D1D1F dark
 */
const PageBreadcrumb = ({
  pageName,
  onHomeClick,
  onProductsClick,
  onBackClick,
  dark = false,
}) => {
  const [backHovered, setBackHovered] = useState(false);

  // Color palette — adapts to dark/light background
  const mutedColor   = dark ? 'rgba(255,255,255,0.45)' : '#6E6E73';
  const linkColor    = dark ? 'rgba(255,255,255,0.6)'  : '#6E6E73';
  const linkHover    = dark ? '#F5F5F7'                : '#1D1D1F';
  const activeColor  = dark ? '#F5F5F7'                : '#1D1D1F';
  const separatorColor = dark ? 'rgba(255,255,255,0.25)' : '#C7C7CC';
  const backDefault  = dark ? 'rgba(255,255,255,0.75)' : '#1D1D1F';
  const backAccent   = '#0071E3';

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '28px',
      }}
    >
      {/* ── Breadcrumb trail ── */}
      <nav aria-label="Breadcrumb">
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            fontSize: '12px',
            color: mutedColor,
            letterSpacing: '0.01em',
          }}
        >
          {/* Home */}
          <li>
            <BreadcrumbLink
              label="Home"
              onClick={onHomeClick}
              defaultColor={linkColor}
              hoverColor={linkHover}
            />
          </li>

          <li aria-hidden="true">
            <ChevronRight
              size={12}
              style={{ color: separatorColor, flexShrink: 0, margin: '0 1px' }}
            />
          </li>

          {/* Products */}
          <li>
            <BreadcrumbLink
              label="Products"
              onClick={onProductsClick}
              defaultColor={linkColor}
              hoverColor={linkHover}
            />
          </li>

          <li aria-hidden="true">
            <ChevronRight
              size={12}
              style={{ color: separatorColor, flexShrink: 0, margin: '0 1px' }}
            />
          </li>

          {/* Current page — not a link */}
          <li
            aria-current="page"
            style={{ color: activeColor, fontWeight: 500 }}
          >
            {pageName}
          </li>
        </ol>
      </nav>

      {/* ── Back link — Apple style ── */}
      <button
        onClick={onBackClick}
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
        aria-label="Back to all products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontSize: '15px',
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          color: backHovered ? backAccent : backDefault,
          transition: 'color 0.2s ease',
          width: 'fit-content',
          letterSpacing: '-0.01em',
        }}
      >
        {/* Arrow — slides left on hover */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            transform: backHovered ? 'translateX(-3px)' : 'translateX(0)',
            transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </span>
        All Products
      </button>
    </div>
  );
};

/* ── Internal: individual breadcrumb link ── */
const BreadcrumbLink = ({ label, onClick, defaultColor, hoverColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        color: hovered ? hoverColor : defaultColor,
        transition: 'color 0.15s ease',
        fontWeight: hovered ? 500 : 400,
      }}
    >
      {label}
    </button>
  );
};

export default PageBreadcrumb;
