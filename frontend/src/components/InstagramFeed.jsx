import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramFeed = ({ handle = "srenterprises", profileUrl = "https://www.instagram.com/srenterprises" }) => {
  // Curated grid of product/factory photos to simulate an Instagram feed.
  // Replace these with real Instagram embeds (Behold.so / Elfsight) when ready.
  const photos = [
    "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1541558869434-2840d308329a?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.pexels.com/photos/30871000/pexels-photo-30871000.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.unsplash.com/photo-1748347084012-075796185d56?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1716643863806-989dd76ae093?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
  ];

  return (
    <section
      id="instagram-feed"
      data-testid="instagram-section"
      className="bg-black"
      style={{ padding: '120px 40px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2
          className="text-center font-bold leading-tight"
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            color: '#F5F5F7',
          }}
        >
          Follow our journey.
        </h2>

        {/* Handle */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="instagram-handle-link"
          className="block text-center hover:opacity-80 transition-opacity"
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            color: '#6E6E73',
            marginTop: '12px',
            marginBottom: '64px',
          }}
        >
          @{handle}
        </a>

        {/* Photo Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '4px' }}
          data-testid="instagram-photo-grid"
        >
          {photos.map((src, idx) => (
            <a
              key={idx}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`instagram-photo-${idx}`}
              className="relative block overflow-hidden group"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src={src}
                alt={`Instagram post ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-[0.5]"
                loading="lazy"
              />
              {/* Instagram icon overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Instagram className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="flex justify-center mt-12">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="instagram-follow-button"
            className="inline-block border border-[#F5F5F7] text-[#F5F5F7] bg-transparent rounded-full hover:bg-white hover:text-black transition-all duration-200"
            style={{
              padding: '14px 32px',
              fontSize: '17px',
            }}
          >
            Follow on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
