import React from 'react';
import { motion } from 'framer-motion';
import { Mouse, Calculator, Zap, Target, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  onNavigateToSection?: (section: 'calculator' | 'converter' | 'polling') => void;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, onNavigateToSection }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'DPI Calculator', action: () => onNavigateToSection?.('calculator'), icon: Calculator },
      { name: 'Sensitivity Converter', action: () => onNavigateToSection?.('converter'), icon: Target },
      { name: 'Polling Rate Test', action: () => onNavigateToSection?.('polling'), icon: Zap },
      { name: 'Mouse Analyzer', action: () => onNavigateToSection?.('calculator'), icon: Mouse }
    ],
    games: [
      { name: 'Valorant DPI Settings', href: '#valorant-dpi' },
      { name: 'CS2 Sensitivity Guide', href: '#cs2-sensitivity' },
      { name: 'Apex Legends DPI', href: '#apex-dpi' },
      { name: 'Overwatch 2 Settings', href: '#overwatch-dpi' }
    ],
    resources: [
      { name: 'Gaming Tips & Guides', href: '#guides' },
      { name: 'Pro Player Settings', href: '#pro-settings' },
      { name: 'Mouse Reviews', href: '#mouse-reviews' },
      { name: 'DPI vs eDPI Guide', href: '#dpi-edpi-guide' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@mousedpicalculator.com' }
  ];

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? "bg-black/50 backdrop-blur-xl border-t border-white/10" 
      : "bg-white/50 backdrop-blur-xl border-t border-black/10",
    text: {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    },
    card: isDarkMode 
      ? "bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white" 
      : "bg-black/10 hover:bg-black/20 text-gray-600 hover:text-black",
  };

  return (
    <footer className={`${themeClasses.background} mt-20`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-3 rounded-xl`}>
                <Mouse className={`w-8 h-8 ${isDarkMode ? 'text-black' : 'text-white'}`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${themeClasses.text.primary}`}>Mouse DPI</h3>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Calculator</p>
              </div>
            </motion.div>
            <p className={`${themeClasses.text.secondary} text-sm mb-4`}>
              The ultimate free tool for calculating, testing, and converting mouse DPI settings. 
              Perfect for gamers, designers, and professionals.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`${themeClasses.card} p-2 rounded-lg transition-all duration-300`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h4 className={`${themeClasses.text.primary} font-semibold mb-4`}>Gaming Tools</h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((tool) => (
                <li key={tool.name}>
                  <motion.button
                    onClick={tool.action}
                    className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} text-sm flex items-center gap-2 transition-colors duration-300 text-left`}
                    whileHover={{ x: 5 }}
                  >
                    <tool.icon className="w-4 h-4" />
                    {tool.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Games Section */}
          <div>
            <h4 className={`${themeClasses.text.primary} font-semibold mb-4`}>Game Settings</h4>
            <ul className="space-y-2">
              {footerLinks.games.map((game) => (
                <li key={game.name}>
                  <motion.a
                    href={game.href}
                    className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} text-sm flex items-center gap-2 transition-colors duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {game.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h4 className={`${themeClasses.text.primary} font-semibold mb-4`}>Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((resource) => (
                <li key={resource.name}>
                  <motion.a
                    href={resource.href}
                    className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} text-sm flex items-center gap-2 transition-colors duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {resource.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO Keywords Section */}
        <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'} pt-8 mb-8`}>
          <div className="text-center">
            <h4 className={`${themeClasses.text.primary} font-semibold mb-4`}>Popular Searches</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'mouse dpi calculator',
                'gaming mouse dpi',
                'valorant dpi settings',
                'cs2 sensitivity',
                'apex legends dpi',
                'edpi calculator',
                'mouse sensitivity converter',
                'polling rate test',
                'gaming mouse settings',
                'pro player dpi',
                'best dpi for gaming',
                'dpi vs sensitivity'
              ].map((keyword) => (
                <span
                  key={keyword}
                  className={`${isDarkMode ? 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30' : 'bg-black/5 text-gray-600 border-black/10 hover:border-black/30'} px-3 py-1 rounded-full text-xs border transition-colors duration-300`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`${themeClasses.text.secondary} text-sm`}>
              © {currentYear} Mouse DPI Calculator. All rights reserved. 
              <span className="ml-2">Free gaming tools for competitive players.</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} transition-colors duration-300`}>
                Privacy Policy
              </a>
              <a href="#terms" className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} transition-colors duration-300`}>
                Terms of Service
              </a>
              <a href="#contact" className={`${themeClasses.text.secondary} hover:${isDarkMode ? 'text-white' : 'text-black'} transition-colors duration-300`}>
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Schema Markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Mouse DPI Calculator",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web Browser",
              "description": "Free online mouse DPI calculator and sensitivity converter for gaming",
              "url": "https://mousedpicalculator.com",
              "author": {
                "@type": "Organization",
                "name": "Mouse DPI Calculator"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;