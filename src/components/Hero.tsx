import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full">
            <span className="text-orange-400 font-semibold">Teenage Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
            EP-133 K.O. II
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The ultimate pocket-sized sampler and sequencer. Create beats anywhere, anytime.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Guide
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Resources
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">64MB</div>
              <div className="text-sm text-slate-400 mt-1">Sample Memory</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">999</div>
              <div className="text-sm text-slate-400 mt-1">Patterns</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">12</div>
              <div className="text-sm text-slate-400 mt-1">Drum Pads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-slate-400 mt-1">Creativity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
