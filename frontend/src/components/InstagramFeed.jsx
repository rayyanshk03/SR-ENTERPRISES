import React, { useEffect, useRef, useState } from 'react';

/**
 * InstagramFeed — powered by Behold.so (free)
 *
 * ── HOW TO GET YOUR BEHOLD TOKEN (2 minutes) ──
 * 1. Go to https://app.behold.so
 * 2. Sign up for free (no credit card needed)
 * 3. Connect your @nestby_sr Instagram account
 * 4. Create a new "feed" → choose Grid layout
 * 5. Copy the Widget ID from the embed code:
 *      <behold-widget feed-id="YOUR_FEED_ID_HERE"></behold-widget>
 * 6. Paste that feed-id value as BEHOLD_FEED_ID below.
 *
 * Once set, this component will ALWAYS show your latest
 * real Instagram posts — no code changes ever again.
 */
const BEHOLD_FEED_ID = 'YOUR_FEED_ID_HERE'; // ← Replace this

const InstagramFeed = ({
  handle = 'nestby_sr',
  profileUrl = 'https://www.instagram.com/nestby_sr/',
}) => {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef(null);

  const isConfigured = BEHOLD_FEED_ID && BEHOLD_FEED_ID !== 'YOUR_FEED_ID_HERE';

  useEffect(() => {
    if (!isConfigured) return;

    // Dynamically inject Behold's tiny script (only once)
    if (!document.getElementById('behold-script')) {
      const script = document.createElement('script');
      script.id = 'behold-script';
      script.type = 'module';
      script.src = 'https://w.behold.so/widget.js';
      script.onload = () => setLoaded(true);
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, [isConfigured]);

  return (
    <section
      id="instagram-feed"
      data-testid="instagram-section"
      ref={sectionRef}
      className="py-16 md:py-24 px-6 md:px-10"
      style={{
        backgroundColor: '#000',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Headline */}
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 700,
            lineHeight: 1.07,
            fontSize: 'clamp(36px, 6vw, 56px)',
            color: '#F5F5F7',
            marginBottom: '12px',
          }}
        >
          Follow our journey.
        </h2>

        {/* Handle Link */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="instagram-handle-link"
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: '#6E6E73',
            textDecoration: 'none',
            marginBottom: '60px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F5F5F7'}
          onMouseLeave={e => e.currentTarget.style.color = '#6E6E73'}
        >
          @{handle}
        </a>

        {/* ── Behold Widget OR Setup Prompt ── */}
        {isConfigured ? (
          <div style={{ position: 'relative', minHeight: '300px' }}>
            {/* Loading skeleton visible until Behold renders */}
            {!loaded && (
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-1 md:gap-2"
                style={{
                  opacity: 0.3,
                }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1 / 1',
                      backgroundColor: '#1a1a1a',
                      borderRadius: '4px',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                ))}
              </div>
            )}

            {/* The actual Behold widget — renders your real Instagram grid */}
            <behold-widget
              feed-id={BEHOLD_FEED_ID}
              style={{ display: 'block', width: '100%' }}
            />
          </div>
        ) : (
          /* ── Setup Prompt (shown only to you, before token is set) ── */
          <div
            style={{
              border: '1px dashed rgba(255,255,255,0.15)',
              borderRadius: '20px',
              padding: '60px 40px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div
              style={{
                fontSize: '44px',
                marginBottom: '20px',
              }}
            >
              📸
            </div>
            <h3
              style={{
                color: '#F5F5F7',
                fontSize: '22px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Connect @nestby_sr Instagram
            </h3>
            <p
              style={{
                color: '#6E6E73',
                fontSize: '15px',
                lineHeight: '1.7',
                maxWidth: '480px',
                margin: '0 auto 32px',
              }}
            >
              Your real Instagram posts will appear here automatically.
              Takes 2 minutes to set up — completely free.
            </p>
            <ol
              style={{
                color: '#6E6E73',
                fontSize: '14px',
                textAlign: 'left',
                maxWidth: '400px',
                margin: '0 auto 32px',
                lineHeight: '2',
                listStylePosition: 'inside',
              }}
            >
              <li>Go to <strong style={{ color: '#0071E3' }}>app.behold.so</strong> and sign up free</li>
              <li>Connect your <strong style={{ color: '#F5F5F7' }}>@nestby_sr</strong> Instagram account</li>
              <li>Create a Grid feed → copy the <strong style={{ color: '#F5F5F7' }}>feed-id</strong></li>
              <li>Paste it as <strong style={{ color: '#F5F5F7' }}>BEHOLD_FEED_ID</strong> in <code>InstagramFeed.jsx</code></li>
            </ol>
            <a
              href="https://app.behold.so"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#0071E3',
                color: '#fff',
                borderRadius: '980px',
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0077ED'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0071E3'}
            >
              Set Up Behold.so →
            </a>
          </div>
        )}

        {/* Follow Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '16px', 
          flexWrap: 'wrap', 
          marginTop: '48px' 
        }}>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="instagram-follow-button"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(245,245,247,0.4)',
              color: '#F5F5F7',
              backgroundColor: 'transparent',
              borderRadius: '980px',
              padding: '14px 36px',
              fontSize: '17px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#F5F5F7';
            }}
          >
            Follow on Instagram →
          </a>
          <a
            href="https://www.linkedin.com/company/sr-enterprises"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="linkedin-follow-button"
            style={{
              display: 'inline-block',
              border: '1px solid rgba(0, 115, 177, 0.4)',
              color: '#F5F5F7',
              backgroundColor: 'transparent',
              borderRadius: '980px',
              padding: '14px 36px',
              fontSize: '17px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#0077b5';
              e.currentTarget.style.borderColor = '#0077b5';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(0, 115, 177, 0.4)';
              e.currentTarget.style.color = '#F5F5F7';
            }}
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      {/* Pulse keyframe for loading skeleton */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  );
};

export default InstagramFeed;
