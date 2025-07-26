import React from 'react';
import { motion } from 'framer-motion';
import { Mouse, Target, Zap, Calculator, GamepadIcon, Settings, TrendingUp, Award, ExternalLink, ShoppingCart } from 'lucide-react';

interface SEOContentProps {
  isDarkMode: boolean;
}

const SEOContent: React.FC<SEOContentProps> = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Theme classes
  const themeClasses = {
    text: {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-300" : "text-gray-700",
    },
    card: isDarkMode 
      ? "bg-white/5 backdrop-blur-xl border border-white/10" 
      : "bg-white/80 backdrop-blur-xl border border-black/10",
    cardSecondary: isDarkMode 
      ? "bg-white/5" 
      : "bg-black/5",
  };

  // Gaming mice data matching BlogSection
  const topGamingMice = [
    {
      rank: 1,
      name: 'Logitech G Pro X Superlight',
      dpi: '25,600 DPI',
      weight: '63g',
      connectivity: 'Wireless',
      price: '$149.99',
      description: 'Perfect for competitive gaming with HERO sensor',
      affiliateLink: 'https://amazon.com/logitech-g-pro-x-superlight'
    },
    {
      rank: 2,
      name: 'Razer Viper V2 Pro',
      dpi: '30,000 DPI',
      weight: '58g',
      connectivity: 'Wireless',
      price: '$149.99',
      description: 'Ultra-lightweight with Focus Pro sensor',
      affiliateLink: 'https://amazon.com/razer-viper-v2-pro'
    },
    {
      rank: 3,
      name: 'Finalmouse Starlight-12 Phantom',
      dpi: '26,000 DPI',
      weight: '47g',
      connectivity: 'Wireless',
      price: '$189.99',
      description: 'Ultralight magnesium alloy construction',
      affiliateLink: 'https://amazon.com/finalmouse-starlight-12'
    },
    {
      rank: 4,
      name: 'SteelSeries Rival 650 Wireless',
      dpi: '12,000 DPI',
      weight: '121g',
      connectivity: 'Both',
      price: '$99.99',
      description: 'Dual sensor system with weight customization',
      affiliateLink: 'https://amazon.com/steelseries-rival-650'
    },
    {
      rank: 5,
      name: 'Zowie EC2-C',
      dpi: '3,200 DPI',
      weight: '70g',
      connectivity: 'Wired',
      price: '$69.99',
      description: 'No software needed, plug and play',
      affiliateLink: 'https://amazon.com/zowie-ec2-c'
    }
  ];

  const seoSections = [
    {
      id: 'what-is-dpi',
      title: '🖱️ What is Mouse DPI & Why It Matters?',
      icon: Mouse,
      content: `
        <p class="mb-4">DPI (Dots Per Inch) measures how sensitive your mouse is. Higher DPI means your cursor moves more pixels per inch of physical mouse movement. Understanding DPI is crucial for:</p>
        <ul class="list-disc list-inside mb-4 space-y-2">
          <li><strong>Gaming Performance:</strong> Precise aim in FPS games like Valorant and CS2</li>
          <li><strong>Design Work:</strong> Accurate cursor control for graphic design and CAD</li>
          <li><strong>Productivity:</strong> Comfortable navigation across multiple monitors</li>
          <li><strong>Ergonomics:</strong> Reducing wrist strain with optimal sensitivity</li>
        </ul>
        <p>Most professional gamers use 400-1600 DPI combined with low in-game sensitivity for maximum precision.</p>
      `
    },
    {
      id: 'best-dpi-fps',
      title: '🕹️ Best DPI Settings for FPS Games',
      icon: Target,
      content: `
        <div class="grid md:grid-cols-2 gap-6 mb-4">
          <div>
            <h4 class="font-bold ${themeClasses.text.primary} mb-2">Valorant</h4>
            <ul class="text-sm space-y-1">
              <li>• Pro Average: 400-800 DPI</li>
              <li>• Sensitivity: 0.2-0.5</li>
              <li>• eDPI Range: 200-400</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold ${themeClasses.text.primary} mb-2">CS2 (Counter-Strike 2)</h4>
            <ul class="text-sm space-y-1">
              <li>• Pro Average: 400-800 DPI</li>
              <li>• Sensitivity: 1.5-2.5</li>
              <li>• eDPI Range: 600-1200</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold ${themeClasses.text.primary} mb-2">Apex Legends</h4>
            <ul class="text-sm space-y-1">
              <li>• Pro Average: 800-1600 DPI</li>
              <li>• Sensitivity: 1.0-2.0</li>
              <li>• eDPI Range: 1000-2000</li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold ${themeClasses.text.primary} mb-2">Overwatch 2</h4>
            <ul class="text-sm space-y-1">
              <li>• Pro Average: 800-1600 DPI</li>
              <li>• Sensitivity: 3.0-6.0</li>
              <li>• eDPI Range: 3000-6000</li>
            </ul>
          </div>
        </div>
        <p class="text-sm ${themeClasses.text.secondary}">Remember: Lower DPI with higher in-game sensitivity often provides better precision than high DPI with low sensitivity.</p>
      `
    },
    {
      id: 'dpi-vs-edpi',
      title: '📏 DPI vs eDPI – What\'s the Difference?',
      icon: Calculator,
      content: `
        <div class="${themeClasses.cardSecondary} rounded-xl p-6 mb-4">
          <h4 class="font-bold ${themeClasses.text.primary} mb-3">Key Differences:</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h5 class="font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2">DPI (Hardware)</h5>
              <ul class="text-sm space-y-1">
                <li>• Mouse sensor setting</li>
                <li>• Hardware-level sensitivity</li>
                <li>• Affects all applications</li>
                <li>• Usually 400-3200 range</li>
              </ul>
            </div>
            <div>
              <h5 class="font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-2">eDPI (Effective DPI)</h5>
              <ul class="text-sm space-y-1">
                <li>• DPI × In-game Sensitivity</li>
                <li>• True game sensitivity</li>
                <li>• Game-specific setting</li>
                <li>• Better comparison metric</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="${isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'} rounded-xl p-4">
          <p class="font-semibold ${themeClasses.text.primary} mb-2">Formula: eDPI = DPI × In-Game Sensitivity</p>
          <p class="text-sm">Example: 800 DPI × 0.5 sensitivity = 400 eDPI</p>
        </div>
      `
    },
    {
      id: 'sensitivity-converter',
      title: '🔁 DPI to Sensitivity Converter Explained',
      icon: Settings,
      content: `
        <p class="mb-4">Our sensitivity converter helps you maintain consistent aim across different games by calculating equivalent sensitivities.</p>
        <div class="${themeClasses.cardSecondary} rounded-xl p-6 mb-4">
          <h4 class="font-bold ${themeClasses.text.primary} mb-3">How It Works:</h4>
          <ol class="list-decimal list-inside space-y-2">
            <li>Select your source game (e.g., Valorant)</li>
            <li>Enter your current DPI and sensitivity</li>
            <li>Choose target game (e.g., CS2)</li>
            <li>Get the equivalent sensitivity automatically</li>
          </ol>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-lg p-4">
            <h5 class="font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2">Benefits:</h5>
            <ul class="text-sm space-y-1">
              <li>• Consistent muscle memory</li>
              <li>• Faster adaptation to new games</li>
              <li>• Maintain competitive edge</li>
            </ul>
          </div>
          <div class="${isDarkMode ? 'bg-green-500/10' : 'bg-green-500/5'} rounded-lg p-4">
            <h5 class="font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-2">Supported Games:</h5>
            <ul class="text-sm space-y-1">
              <li>• Valorant, CS2, Apex Legends</li>
              <li>• Overwatch 2, Fortnite</li>
              <li>• And many more...</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 'top-gaming-mice',
      title: '🎮 Top 5 Gaming Mice with Adjustable DPI',
      icon: Award,
      content: `
        <div class="grid gap-4">
          ${topGamingMice.map((mouse) => `
            <div class="${themeClasses.cardSecondary} rounded-xl p-4 flex items-center gap-4">
              <div class="bg-gradient-to-r ${mouse.rank === 1 ? 'from-blue-500 to-purple-500' : 
                                              mouse.rank === 2 ? 'from-green-500 to-blue-500' :
                                              mouse.rank === 3 ? 'from-purple-500 to-pink-500' :
                                              mouse.rank === 4 ? 'from-orange-500 to-red-500' :
                                              'from-teal-500 to-green-500'} text-white rounded-lg p-3 font-bold">${mouse.rank}</div>
              <div class="flex-1">
                <h5 class="font-bold ${themeClasses.text.primary}">${mouse.name}</h5>
                <p class="text-sm ${themeClasses.text.secondary}">${mouse.dpi} • ${mouse.weight} • ${mouse.connectivity} • ${mouse.price}</p>
                <p class="text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}">${mouse.description}</p>
              </div>
              <a href="${mouse.affiliateLink}" target="_blank" rel="noopener noreferrer" 
                 class="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h7a2 2 0 002-2v-4.5M9 21h6"></path>
                </svg>
                Buy Now
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          `).join('')}
        </div>
      `
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto mt-16 px-4"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className={`text-4xl font-bold ${themeClasses.text.primary} mb-4`}>
          Complete DPI Guide & Resources
        </h2>
        <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
          Everything you need to know about mouse DPI, sensitivity settings, and gaming optimization.
        </p>
      </motion.div>

      <div className="space-y-8">
        {seoSections.map((section, index) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            className={`${themeClasses.card} rounded-3xl p-8 shadow-2xl`}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-4 rounded-2xl`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <section.icon className={`w-8 h-8 ${isDarkMode ? 'text-black' : 'text-white'}`} />
              </motion.div>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                {section.title}
              </h3>
            </div>
            
            <div 
              className={`${themeClasses.text.secondary} leading-relaxed prose prose-invert max-w-none`}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </motion.div>
        ))}
      </div>

      {/* Internal Linking Section */}
      <motion.div
        variants={itemVariants}
        className={`${isDarkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-black/10'} rounded-3xl p-8 mt-12 border`}
      >
        <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 text-center`}>
          Related Gaming Tools & Resources
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-xl p-4 mb-4`}>
              <Calculator className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-2`} />
              <h4 className={`font-semibold ${themeClasses.text.primary}`}>DPI Calculator</h4>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Calculate your exact mouse DPI</p>
            </div>
          </div>
          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-xl p-4 mb-4`}>
              <Zap className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-2`} />
              <h4 className={`font-semibold ${themeClasses.text.primary}`}>Polling Rate Test</h4>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Test your mouse polling rate</p>
            </div>
          </div>
          <div className="text-center">
            <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-xl p-4 mb-4`}>
              <TrendingUp className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-2`} />
              <h4 className={`font-semibold ${themeClasses.text.primary}`}>Sensitivity Converter</h4>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Convert between games</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SEOContent;