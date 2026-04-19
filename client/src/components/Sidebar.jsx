import { useState, useCallback } from 'react';
import { Database, FileJson, FileText, Image as ImageIcon, X, ChevronRight, Terminal } from 'lucide-react';
import { uploadFile } from '../services/api';
import toast from 'react-hot-toast';

const Sidebar = ({ onDataUpdated }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      toast.success(result.message, {
        icon: '✔️',
        style: {
          border: '1px solid #00f0ff',
          padding: '16px',
          color: '#00f0ff',
          background: 'rgba(10, 15, 20, 0.9)',
          fontFamily: 'monospace'
        },
      });
      if (onDataUpdated) onDataUpdated(result);
    } catch (error) {
      toast.error('DATA_INGEST_FAILURE', {
         icon: '⚠️',
         style: {
          border: '1px solid #ff003c',
          padding: '16px',
          color: '#ff003c',
          background: 'rgba(10, 15, 20, 0.9)',
          fontFamily: 'monospace'
        },
      });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed left-0 top-24 z-[1000] p-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="glass p-3 rounded-r-sm border border-l-0 border-primary/50 text-primary hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all shadow-lg group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-1 h-full bg-primary/20 skew-x-12 -translate-x-full group-hover:animate-[glitch_0.5s]"></div>
          <Database className="w-5 h-5 relative z-10" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed left-6 top-24 bottom-6 w-96 z-[1000] glass rounded-sm border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.05)] flex flex-col pointer-events-auto overflow-hidden">
      {/* Tech UI Corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary mr-1 mt-1"></div>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary ml-1 mt-1"></div>

      <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-primary/5 uppercase font-mono tracking-widest text-primary pt-6">
        <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <h2 className="text-sm font-bold">Data_Ingestion_Terminal</h2>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-primary hover:text-white transition-colors p-1 rounded hover:bg-primary/20 hover:border-primary/50 border border-transparent"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 flex flex-col gap-6 flex-1 overflow-y-auto">
        <div className="font-mono text-xs text-primary/70 border-l border-primary/30 pl-3 leading-relaxed">
           <p>{'> INITIALIZING UPLOAD PROTOCOL'}</p>
           <p className="animate-pulse">{'> WAITING FOR BINARY PACKETS...'}</p>
        </div>

        <div 
          className={`flex-1 border border-dashed rounded-sm flex flex-col items-center justify-center p-6 transition-all text-center relative group
            ${isDragging ? 'border-primary bg-primary/20 shadow-[inset_0_0_20px_rgba(0,240,255,0.3)]' : 'border-primary/30 hover:border-primary hover:bg-primary/5 bg-background/50'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Edge scanning effect when hovering */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none"></div>

          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleFileInput}
            accept=".csv, .json, image/*"
            disabled={isUploading}
          />
          
          <Database className={`w-12 h-12 mb-4 relative z-0 transition-all duration-300 ${isDragging ? 'text-primary scale-110 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]' : 'text-primary/40 group-hover:text-primary/80'}`} />
          
          <h3 className="text-sm font-bold text-white mb-2 font-mono tracking-widest uppercase relative z-0">
            {isUploading ? 'TRANSMITTING...' : 'DROP_PAYLOAD()'}
          </h3>
          <p className="text-xs text-primary/60 font-mono relative z-0">EXECUTE CLICKEVENT OR DRAG</p>
        </div>

        <div className="border border-primary/20 p-4 bg-background/80 rounded-sm">
            <h4 className="font-mono text-xs text-primary mb-3 uppercase tracking-widest flex items-center"><ChevronRight className="w-3 h-3"/> Supported Formats</h4>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-zinc-300 font-mono border-b border-primary/10 pb-2">
                    <span className="flex items-center gap-2"><FileJson className="w-3.5 h-3.5 text-osint" /> INTEL_JSON</span>
                    <span className="text-primary/50 text-[10px]">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300 font-mono border-b border-primary/10 pb-2">
                    <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-humint" /> RAW_CSV_FEED</span>
                    <span className="text-primary/50 text-[10px]">VERIFIED</span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-300 font-mono pb-1">
                    <span className="flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5 text-imint" /> SATELLITE_IMG</span>
                    <span className="text-primary/50 text-[10px]">VERIFIED</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
