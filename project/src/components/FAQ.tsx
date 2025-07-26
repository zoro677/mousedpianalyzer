import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'what-is-dpi',
    question: 'What is DPI and why does it matter for gaming?',
    answer: 'DPI (Dots Per Inch) measures mouse sensitivity - how many pixels your cursor moves per inch of physical mouse movement. For gaming, the right DPI ensures precise aim control. Most pro gamers use 400-1600 DPI combined with low in-game sensitivity for maximum accuracy in competitive games like Valorant, CS2, and Apex Legends.'
  },
  {
    id: 'best-dpi-gaming',
    question: 'What is the best DPI for gaming?',
    answer: 'There\'s no universal "best" DPI, but most professional gamers use 400-800 DPI. This range provides excellent precision while maintaining good tracking performance. The key is finding a DPI that works with your mousepad size, grip style, and in-game sensitivity preferences. Start with 800 DPI and adjust based on your comfort and accuracy.'
  },
  {
    id: 'dpi-vs-edpi',
    question: 'What\'s the difference between DPI and eDPI?',
    answer: 'DPI is your mouse hardware setting, while eDPI (effective DPI) is calculated as DPI × in-game sensitivity. eDPI gives you the true sensitivity comparison across different games. For example: 800 DPI × 0.5 sensitivity = 400 eDPI. eDPI is more useful for comparing sensitivities between players and games.'
  },
  {
    id: 'how-to-calculate-dpi',
    question: 'How do I calculate my mouse DPI?',
    answer: 'Use our DPI calculator tool above! Simply move your mouse a measured distance (like across a ruler) and we\'ll calculate your exact DPI. You can also check your mouse software or manufacturer specifications. Most gaming mice display DPI in their software or have DPI buttons to cycle through preset values.'
  },
  {
    id: 'sensitivity-converter',
    question: 'How does the sensitivity converter work?',
    answer: 'Our sensitivity converter maintains your muscle memory across different games by calculating equivalent sensitivities. It uses each game\'s sensitivity scaling to ensure the same physical mouse movement results in the same in-game rotation. This helps you maintain consistent aim when switching between games like Valorant and CS2.'
  },
  {
    id: 'polling-rate-importance',
    question: 'What is polling rate and why is it important?',
    answer: 'Polling rate (measured in Hz) is how often your mouse reports its position to your computer per second. Higher polling rates (1000Hz) provide smoother cursor movement and lower input lag, crucial for competitive gaming. Most gaming mice support 1000Hz polling rate, which reports position 1000 times per second.'
  },
  {
    id: 'low-vs-high-dpi',
    question: 'Should I use low or high DPI?',
    answer: 'Low DPI (400-800) offers better precision and is preferred by most competitive players, but requires more arm movement and desk space. High DPI (1600+) allows faster movement with less physical effort but can be harder to control precisely. Medium DPI (800-1200) often provides the best balance for most users.'
  },
  {
    id: 'mouse-acceleration',
    question: 'Should I use mouse acceleration?',
    answer: 'No, disable mouse acceleration for gaming. Acceleration makes your cursor speed inconsistent based on how fast you move your mouse, making it impossible to develop reliable muscle memory. Always use raw input in games and disable "Enhance pointer precision" in Windows mouse settings for consistent, predictable movement.'
  },
  {
    id: 'dpi-for-different-games',
    question: 'Do I need different DPI for different games?',
    answer: 'You can keep the same DPI across all games and adjust in-game sensitivity instead. This maintains consistent desktop navigation while allowing game-specific fine-tuning. However, some players prefer higher DPI for fast-paced games (Overwatch) and lower DPI for tactical shooters (CS2). Use our sensitivity converter to maintain consistent eDPI across games.'
  },
  {
    id: 'mousepad-size-dpi',
    question: 'How does mousepad size affect DPI choice?',
    answer: 'Larger mousepads allow for lower DPI settings, giving you more precision for the same in-game movement. Small mousepads require higher DPI to achieve full range of motion. Ideally, you should be able to do a 360° turn with one full swipe across your mousepad. Adjust your DPI and sensitivity combination to match your available space.'
  },
  {
    id: 'pro-player-settings',
    question: 'Should I copy pro player DPI settings?',
    answer: 'Pro settings are great starting points, but don\'t copy them blindly. Pros optimize for their specific hardware, playstyle, and years of muscle memory. Use pro settings as reference ranges: most Valorant pros use 200-400 eDPI, CS2 pros use 600-1200 eDPI. Start within these ranges and adjust based on your comfort and accuracy.'
  },
  {
    id: 'dpi-accuracy-myth',
    question: 'Does higher DPI mean better accuracy?',
    answer: 'Not necessarily. While higher DPI provides more granular cursor movement, it doesn\'t automatically improve accuracy. Many factors affect accuracy: sensor quality, surface compatibility, polling rate, and most importantly, your ability to control the movement. Most modern gaming mice perform excellently at any DPI between 400-3200.'
  }
];

interface FAQProps {
  isDarkMode: boolean;
}

const FAQ: React.FC<FAQProps> = ({ isDarkMode }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

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
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    },
    card: isDarkMode 
      ? "bg-white/5 backdrop-blur-xl border border-white/10" 
      : "bg-white/80 backdrop-blur-xl border border-black/10",
    cardHover: isDarkMode 
      ? "hover:bg-white/5" 
      : "hover:bg-black/5",
    button: {
      primary: isDarkMode 
        ? "bg-white text-black hover:bg-gray-200" 
        : "bg-black text-white hover:bg-gray-800",
      secondary: isDarkMode 
        ? "bg-white/10 hover:bg-white/20 text-white border border-white/20" 
        : "bg-black/10 hover:bg-black/20 text-black border border-black/20"
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto mt-16 px-4"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-6 rounded-3xl shadow-2xl`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HelpCircle className={`w-16 h-16 ${isDarkMode ? 'text-black' : 'text-white'}`} />
          </motion.div>
        </div>
        <h2 className={`text-5xl font-bold ${themeClasses.text.primary} mb-4`}>
          Frequently Asked Questions
        </h2>
        <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
          Everything you need to know about mouse DPI, sensitivity settings, and gaming optimization.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className={`${themeClasses.card} rounded-2xl overflow-hidden`}
          >
            <motion.button
              onClick={() => toggleItem(item.id)}
              className={`w-full p-6 text-left flex items-center justify-between ${themeClasses.cardHover} transition-all duration-300`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary} pr-4`}>
                {item.question}
              </h3>
              <motion.div
                animate={{ rotate: openItems.has(item.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className={`w-6 h-6 ${themeClasses.text.secondary}`} />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openItems.has(item.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'} pt-4`}>
                      <p className={`${themeClasses.text.secondary} leading-relaxed`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Additional SEO Content */}
      <motion.div
        variants={itemVariants}
        className={`${isDarkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-black/10'} rounded-3xl p-8 mt-12 border text-center`}
      >
        <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}>
          Still Have Questions?
        </h3>
        <p className={`${themeClasses.text.secondary} mb-6`}>
          Our DPI calculator and sensitivity converter tools are designed to help you find the perfect mouse settings. 
          Try them out above and optimize your gaming performance today!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            className={`${themeClasses.button.primary} px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Try DPI Calculator
          </motion.button>
          <motion.button
            className={`${themeClasses.button.secondary} px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Use Sensitivity Converter
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;