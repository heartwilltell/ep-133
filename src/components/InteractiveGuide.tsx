import { useState } from "react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "sampling",
    title: "Sampling",
    icon: "🎤",
    description: "Record and manipulate audio samples",
    features: [
      "Built-in microphone for quick sampling",
      "Line input for external sources",
      "Sample trimming and time-stretching",
      "Up to 64MB of sample memory",
      "Support for stereo samples"
    ]
  },
  {
    id: "sequencing",
    title: "Sequencing",
    icon: "🎹",
    description: "Create complex patterns and arrangements",
    features: [
      "12 velocity-sensitive pads",
      "Up to 999 patterns",
      "Pattern chaining for arrangements",
      "Swing and humanize functions",
      "Step sequencer with probability"
    ]
  },
  {
    id: "effects",
    title: "Effects",
    icon: "✨",
    description: "Shape your sound with built-in effects",
    features: [
      "Punch-in effects for live performance",
      "Reverb, delay, and modulation",
      "Bit crusher and filter",
      "Master compressor and EQ",
      "Per-pad effects routing"
    ]
  },
  {
    id: "workflow",
    title: "Workflow",
    icon: "⚡",
    description: "Streamlined creative process",
    features: [
      "Battery powered (4x AA batteries)",
      "USB-C for power and data transfer",
      "MIDI sync with other devices",
      "Backup projects to microSD",
      "Speaker and headphone output"
    ]
  }
];

export default function InteractiveGuide() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  
  const active = sections.find(s => s.id === activeSection) || sections[0];
  
  return (
    <div id="guide" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Guide
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the powerful features of the EP-133 K.O. II
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Section Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                className={`h-auto py-4 px-4 flex flex-col items-center gap-2 ${
                  activeSection === section.id 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "hover:bg-slate-100"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="text-2xl">{section.icon}</span>
                <span className="text-sm font-semibold">{section.title}</span>
              </Button>
            ))}
          </div>
          
          {/* Active Section Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 min-h-[400px] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{active.icon}</div>
              <div>
                <h3 className="text-3xl font-bold">{active.title}</h3>
                <p className="text-slate-600 mt-1">{active.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {active.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 flex-1">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
