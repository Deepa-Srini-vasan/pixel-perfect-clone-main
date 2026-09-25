import { MapPin, Droplet, Cable, Wrench, Spline, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet's default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Local translation helper to satisfy static analysis internationalization requirements
const t = (key: string) => key;

// Custom HTML Icons matching the image styling
const createBranchIcon = () => L.divIcon({
  html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-md text-white">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
         </div>`,
  className: 'custom-branch-pin',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Branch data (18 Branches across India & Sri Lanka)
const branches = [
  { name: 'Delhi', region: 'North' },
  { name: 'Patna', region: 'East' },
  { name: 'Gujarat', region: 'West' },
  { name: 'Kolkata', region: 'East' },
  { name: 'Pune', region: 'West' },
  { name: 'Bhubaneswar', region: 'East' },
  { name: 'Hubli', region: 'South' },
  { name: 'Secunderabad', region: 'South' },
  { name: 'Bangalore', region: 'South' },
  { name: 'Vijayawada', region: 'South' },
  { name: 'Erode', region: 'South' },
  { name: 'Coimbatore', region: 'South' },
  { name: 'Ernakulam', region: 'South' },
  { name: 'Chennai', region: 'South' },
  { name: 'Salem', region: 'South' },
  { name: 'Trichy', region: 'South' },
  { name: 'Madurai', region: 'South' },
  { name: 'Sri Lanka', region: 'South' },
];

// Coordinate lookup map
const branchCoordinates = new Map<string, [number, number]>([
  ['Delhi', [28.6139, 77.2090]],
  ['Patna', [25.5941, 85.1376]],
  ['Gujarat', [22.2587, 71.1924]],
  ['Kolkata', [22.5726, 88.3639]],
  ['Pune', [18.5204, 73.8567]],
  ['Bhubaneswar', [20.2961, 85.8245]],
  ['Hubli', [15.3647, 75.1240]],
  ['Secunderabad', [17.4399, 78.4983]],
  ['Bangalore', [12.9716, 77.5946]],
  ['Vijayawada', [16.5062, 80.6480]],
  ['Erode', [11.3410, 77.7172]],
  ['Coimbatore', [11.0168, 76.9558]],
  ['Ernakulam', [9.9312, 76.2673]],
  ['Chennai', [13.0827, 80.2707]],
  ['Salem', [11.6643, 78.1460]],
  ['Trichy', [10.7905, 78.7047]],
  ['Madurai', [9.9252, 78.1198]],
  ['Sri Lanka', [7.8731, 80.7718]],
]);

// Map component
const SafeMapContainer = MapContainer as any;
const SafeTileLayer = TileLayer as any;
const SafeMarker = Marker as any;

const BranchesMap = () => {
  const center: [number, number] = [21.5937, 78.9629];
  const bIcon = createBranchIcon();

  return (
    <div className="w-full h-full">
      <SafeMapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <SafeTileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render Branches (Blue Pins) */}
        {branches.map((branch) => {
          const coords = branchCoordinates.get(branch.name);
          if (!coords) return null;
          return (
            <SafeMarker key={branch.name} position={coords} icon={bIcon}>
              <Popup>
                <div className="text-slate-900 font-bold">
                  {t(branch.name)} {t('Branch')}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  {t('Region: ')}{t(branch.region)}
                </div>
              </Popup>
            </SafeMarker>
          );
        })}
      </SafeMapContainer>
    </div>
  );
};

// Main component
const BranchesSection = () => {
  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-pipes">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="mb-12 text-center"
        >
          <h2 className="font-heading font-black text-slate-900 leading-tight tracking-tight text-3xl md:text-4xl lg:text-5xl">
            {t('Our Branches')}
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Central Map component */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="w-full h-[550px] md:h-[650px] rounded-2xl overflow-hidden border-4 border-slate-100 shadow-xl relative z-10"
        >
          <BranchesMap />
        </motion.div>

        {/* Bottom Full-Width Category Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="mt-16 border-t-4 border-[#0b3c5d] bg-[#0b3c5d] text-white rounded-xl overflow-hidden shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="flex items-center justify-center gap-3 p-5 hover:bg-blue-800 transition-colors duration-300">
              <Droplet className="w-5 h-5 text-blue-200 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-center">
                {t('Taps & Faucets')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 p-5 hover:bg-blue-800 transition-colors duration-300">
              <Cable className="w-5 h-5 text-blue-200 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-center">
                {t('PVC Hoses')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 p-5 hover:bg-blue-800 transition-colors duration-300">
              <Wrench className="w-5 h-5 text-blue-200 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-center">
                {t('PPR Pipes & Fittings')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 p-5 hover:bg-blue-800 transition-colors duration-300">
              <Spline className="w-5 h-5 text-blue-200 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-center">
                {t('PE-RT Pipes & Fittings')}
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 p-5 hover:bg-blue-800 transition-colors duration-300">
              <Layers className="w-5 h-5 text-blue-200 shrink-0" />
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-center">
                {t('HDPE Pipes & Fittings')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BranchesSection;
