import { MapPin, ShieldAlert, Crosshair, Radio } from 'lucide-react';

const MarkerPopup = ({ point }) => {
  const typeColors = {
    OSINT: 'text-osint bg-osint/20 border-osint/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    HUMINT: 'text-humint bg-humint/20 border-humint/40 shadow-[0_0_15px_rgba(57,255,20,0.2)]',
    IMINT: 'text-imint bg-imint/20 border-imint/40 shadow-[0_0_15px_rgba(255,0,60,0.2)]',
  };

  const activeColor = typeColors[point.type] || typeColors.OSINT;

  return (
    <div className="w-80 glass rounded-sm border border-primary/30 overflow-hidden backdrop-blur-md bg-background/80 text-white flex flex-col pointer-events-auto font-sans relative group">
      {/* Target Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>

      {point.image && (
        <div className="w-full h-40 relative border-b border-primary/20 overflow-hidden group-hover:after:absolute group-hover:after:inset-0 group-hover:after:bg-[linear-gradient(rgba(0,240,255,0.1),transparent)]">
          <img src={point.image} alt={point.title} className="w-full h-full object-cover filter brightness-75 contrast-125 sepia-[.2] hue-rotate-180" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] bg-background/80 px-1.5 py-0.5 font-mono text-primary border border-primary/30 uppercase">
            <Radio className="w-3 h-3 animate-pulse" /> LIVE FEED
          </div>
        </div>
      )}
      
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-bold text-lg leading-tight text-white tracking-wide uppercase flex items-center gap-2">
            <ShieldAlert className={`w-4 h-4 ${point.type === 'IMINT' ? 'text-imint' : point.type === 'HUMINT' ? 'text-humint' : 'text-osint'}`} />
            {point.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 border font-mono font-bold uppercase tracking-widest ${activeColor}`}>
            SRC: {point.type}
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">ID: {point.id.substring(0,8)}</span>
        </div>
        
        {point.description && (
          <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-primary/50 pl-2 bg-primary/5 p-2 font-mono">
            {point.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs mt-2 bg-background/50 p-2 border border-primary/20 font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Crosshair className="w-4 h-4" />
            <span>LAT: {point.latitude.toFixed(4)}</span>
          </div>
          <div className="text-primary">
            <span>LNG: {point.longitude.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerPopup;
