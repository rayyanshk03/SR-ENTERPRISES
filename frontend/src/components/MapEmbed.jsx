import React, { useEffect, useRef } from 'react';

// SR ENTERPRISES exact coordinates — Gat no.1473/1, Bharat Gas Road, L&T Phata, Shikrapur
const SR_LAT = 18.6924124;
const SR_LNG = 74.0985469;

const GOOGLE_MAPS_LINK = `https://www.google.com/maps/place/SR+ENTERPRISES/@18.6924124,73.7936763,66466m/data=!3m1!1e3!4m10!1m2!2m1!1ssr+enterprises!3m6!1s0x3bc2d1a4b748ed33:0x9915d468ab93b13f!8m2!3d18.6924124!4d74.0985469!15sCg5zciBlbnRlcnByaXNlc1oQIg5zciBlbnRlcnByaXNlc5IBFm9mZmljZV9mdXJuaXR1cmVfc3RvcmXgAQA!16s%2Fg%2F11zbnjgpyt?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D`;

const MapEmbed = ({ onClick }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Avoid double-init on hot reload
    if (mapRef.current) return;

    const initMap = () => {
      const L = window.L;
      if (!L || !containerRef.current) return;

      // Prevent double initialization on the same container
      if (containerRef.current._leaflet_id || mapRef.current) return;

      try {
        const map = L.map(containerRef.current, {
          center: [SR_LAT, SR_LNG],
          zoom: 16,
          zoomControl: true,
          scrollWheelZoom: false,
          dragging: false, // disable drag so tap opens Maps
          doubleClickZoom: false,
        });

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom SR ENTERPRISES marker icon
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            cursor:pointer;
          ">
            <div style="
              background:#1D1D1F;
              color:#fff;
              font-size:11px;
              font-weight:700;
              font-family:-apple-system,sans-serif;
              padding:5px 10px;
              border-radius:8px;
              white-space:nowrap;
              box-shadow:0 4px 12px rgba(0,0,0,0.3);
              letter-spacing:0.04em;
            ">📍 SR ENTERPRISES</div>
            <div style="
              width:0;height:0;
              border-left:8px solid transparent;
              border-right:8px solid transparent;
              border-top:12px solid #1D1D1F;
              margin-top:-1px;
            "></div>
          </div>
        `,
        iconAnchor: [60, 48],
      });

      const marker = L.marker([SR_LAT, SR_LNG], { icon }).addTo(map);

      // Popup with business info
      marker.bindPopup(`
        <div style="font-family:-apple-system,sans-serif;min-width:200px">
          <div style="font-size:14px;font-weight:700;color:#1D1D1F;margin-bottom:4px">SR ENTERPRISES</div>
          <div style="font-size:12px;color:#6E6E73;line-height:1.5;">
            Gat no.1473/1, Bharat Gas Road<br/>
            L&amp;T Phata, Shikrapur<br/>
            Tal: Shirur, Dist: Pune, 412208
          </div>
          <a
            href="${GOOGLE_MAPS_LINK}"
            target="_blank"
            rel="noopener noreferrer"
            style="display:inline-block;margin-top:10px;background:#1D1D1F;color:#fff;text-decoration:none;font-size:12px;font-weight:600;padding:6px 14px;border-radius:999px;"
          >Open in Google Maps →</a>
        </div>
      `).openPopup();

        mapRef.current = map;
      } catch (err) {
        console.error("Leaflet initialization failed", err);
      }
    };

    // Load Leaflet CSS if not already loaded
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS if not already loaded
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      style={{ width: '100%', height: '100%', cursor: 'pointer' }}
    />
  );
};

export default MapEmbed;
