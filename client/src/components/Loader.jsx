import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-zinc-400 font-medium tracking-wide">Syncing Intelligence Data...</p>
        </div>
      </div>
    );
  }

  return <Loader2 className="w-6 h-6 text-primary animate-spin" />;
};

export default Loader;
