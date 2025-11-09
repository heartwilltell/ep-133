import { Button } from "@/components/ui/button";

const resources = [
  {
    category: "Official Resources",
    items: [
      {
        title: "Official User Guide",
        description: "Complete manual from Teenage Engineering",
        link: "https://teenage.engineering/guides/ep-133",
        icon: "📖"
      },
      {
        title: "Firmware Updates",
        description: "Keep your device up to date",
        link: "https://teenage.engineering/downloads",
        icon: "⬇️"
      },
      {
        title: "Support & FAQ",
        description: "Get help and find answers",
        link: "https://teenage.engineering/support",
        icon: "💬"
      }
    ]
  },
  {
    category: "Community & Learning",
    items: [
      {
        title: "Reddit Community",
        description: "Join r/teenageengineering for tips and tricks",
        link: "https://reddit.com/r/teenageengineering",
        icon: "👥"
      },
      {
        title: "YouTube Tutorials",
        description: "Video guides and beat-making sessions",
        link: "https://youtube.com/results?search_query=ep-133+ko+2+tutorial",
        icon: "🎥"
      },
      {
        title: "Discord Community",
        description: "Real-time chat with other users",
        link: "https://discord.gg/teenageengineering",
        icon: "💭"
      }
    ]
  },
  {
    category: "Sample Packs & Tools",
    items: [
      {
        title: "Free Sample Packs",
        description: "Curated sounds ready for the EP-133",
        link: "https://www.reddit.com/r/Drumkits/",
        icon: "🎵"
      },
      {
        title: "Sample Transfer Tool",
        description: "Organize and transfer samples efficiently",
        link: "https://teenage.engineering/downloads",
        icon: "🔄"
      },
      {
        title: "MIDI Tools",
        description: "Software for MIDI sequencing and sync",
        link: "https://www.ableton.com/",
        icon: "🎛️"
      }
    ]
  }
];

const quickTips = [
  {
    title: "Quick Sampling",
    tip: "Hold SOUND + press a pad to instantly sample to that pad",
    icon: "⚡"
  },
  {
    title: "Pattern Chain",
    tip: "Hold WRITE and tap patterns in sequence to create a song",
    icon: "🔗"
  },
  {
    title: "Backup Often",
    tip: "Save your projects to microSD regularly to prevent data loss",
    icon: "💾"
  },
  {
    title: "Battery Life",
    tip: "Use rechargeable batteries for eco-friendly, long sessions",
    icon: "🔋"
  }
];

export default function ToolsResources() {
  return (
    <div id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools & Resources
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to master your EP-133 K.O. II
          </p>
        </div>
        
        {/* Resources Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          {resources.map((category, idx) => (
            <div key={idx} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-slate-800">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx}
                    className="group bg-slate-50 rounded-xl p-6 hover:bg-orange-50 hover:shadow-lg transition-all border border-slate-200 hover:border-orange-300"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 mb-4 text-sm">
                      {item.description}
                    </p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-orange-500 hover:text-orange-600"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      Learn More →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Tips */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Quick Tips & Tricks
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {quickTips.map((tip, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-orange-400">
                      {tip.title}
                    </h4>
                    <p className="text-slate-300 text-sm">
                      {tip.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
