import { ShieldAlert, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-[1000] glass border-b border-primary/40 shadow-[0_4px_30px_rgba(0,240,255,0.1)] flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <ShieldAlert className="w-8 h-8 text-primary animate-pulse" />
          <div className="absolute inset-0 bg-primary/20 blur-md rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white flex items-center gap-2 uppercase">
            INTEL<span className="text-primary font-mono">//</span>FUSION
          </h1>
          <span className="text-[10px] text-primary/70 font-mono tracking-widest uppercase">
            Global Strategic Intelligence Dashboard
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 font-mono text-xs">
        <div className="flex flex-col text-right">
          <span className="text-zinc-500 uppercase">SYS_TIME (ZULU)</span>
          <span className="text-primary">{time}</span>
        </div>
        
        <div className="h-8 w-px bg-primary/30"></div>

        <div className="flex items-center gap-3 bg-surface/50 px-4 py-2 border border-primary/20 rounded-sm">
          <Activity className="w-4 h-4 text-humint animate-pulse" />
          <span className="text-white tracking-widest uppercase">Secure Uplink</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
