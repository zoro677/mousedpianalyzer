import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mouse, 
  Calculator, 
  Zap, 
  Target, 
  RotateCcw, 
  Play, 
  Pause, 
  BookOpen,
  HelpCircle,
  Info,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Settings,
  Monitor,
  Gamepad2,
  Copy,
  Check,
  Sun,
  Moon,
  Plus,
  Minus,
  Edit3,
  Users,
  Trophy,
  Clock,
  Activity
} from 'lucide-react';
import BlogSection from './components/BlogSection';
import FAQ from './components/FAQ';
import SEOContent from './components/SEOContent';
import Footer from './components/Footer';

interface MouseEvent {
  timestamp: number;
  x: number;
  y: number;
}

interface GameSensitivity {
  name: string;
  multiplier: number;
}

const games: GameSensitivity[] = [
  { name: 'Valorant', multiplier: 0.07 },
  { name: 'CS2 (Counter-Strike 2)', multiplier: 0.022 },
  { name: 'Apex Legends', multiplier: 0.022 },
  { name: 'Overwatch 2', multiplier: 0.0066 },
  { name: 'Fortnite', multiplier: 0.005 },
  { name: 'Call of Duty', multiplier: 0.001 },
  { name: 'PUBG', multiplier: 0.01 },
  { name: 'Rainbow Six Siege', multiplier: 0.00223 }
];

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // DPI Calculator States
  const [pixelsMoved, setPixelsMoved] = useState<number>(0);
  const [distance, setDistance] = useState<number>(5);
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [calculatedDPI, setCalculatedDPI] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [manualPixels, setManualPixels] = useState<string>('');
  const [manualDistance, setManualDistance] = useState<string>('');
  const [isManualMode, setIsManualMode] = useState<boolean>(false);

  // Enhanced Sensitivity Converter States
  const [game1, setGame1] = useState<string>('Valorant');
  const [game1Sensitivity, setGame1Sensitivity] = useState<number>(0.5);
  const [currentDPI, setCurrentDPI] = useState<number>(800);
  const [game2, setGame2] = useState<string>('CS2 (Counter-Strike 2)');
  const [targetDPI, setTargetDPI] = useState<number>(800);
  const [convertedSensitivity, setConvertedSensitivity] = useState<number>(0);
  const [cm360Game1, setCm360Game1] = useState<number>(0);
  const [cm360Game2, setCm360Game2] = useState<number>(0);
  const [in360Game1, setIn360Game1] = useState<number>(0);
  const [in360Game2, setIn360Game2] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Polling Rate Tester States
  const [pollingEvents, setPollingEvents] = useState<MouseEvent[]>([]);
  const [isPollingActive, setIsPollingActive] = useState(false);
  const [averagePollingRate, setAveragePollingRate] = useState<number>(0);
  const [maxPollingRate, setMaxPollingRate] = useState<number>(0);
  const [minPollingRate, setMinPollingRate] = useState<number>(0);

  // Navigation States
  const [activeSection, setActiveSection] = useState<'calculator' | 'converter' | 'polling' | 'guides' | 'faq'>('calculator');
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null);

  // Refs
  const pollingAreaRef = useRef<HTMLDivElement>(null);
  const measuringBoxRef = useRef<HTMLDivElement>(null);

  // Theme classes
  const themeClasses = {
    background: isDarkMode 
      ? "bg-black text-white" 
      : "bg-white text-black",
    card: isDarkMode 
      ? "bg-gray-900 border-gray-700" 
      : "bg-white border-gray-300",
    text: {
      primary: isDarkMode ? "text-white" : "text-black",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    },
    button: {
      primary: isDarkMode 
        ? "bg-white text-black hover:bg-gray-200" 
        : "bg-black text-white hover:bg-gray-800",
      secondary: isDarkMode 
        ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700" 
        : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
    }
  };

  // Navigation function
  const handleNavigateToSection = (section: 'calculator' | 'converter' | 'polling') => {
    setActiveSection(section);
    setSelectedBlogPost(null);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DPI Calculator Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isManualMode) return;
    
    const rect = measuringBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsTracking(true);
    setStartPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
    setPixelsMoved(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTracking || !startPosition || isManualMode) return;
    
    const rect = measuringBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const deltaX = currentX - startPosition.x;
    const deltaY = currentY - startPosition.y;
    const totalPixels = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setPixelsMoved(Math.round(totalPixels));
  };

  const handleMouseUp = () => {
    if (!isTracking || isManualMode) return;
    
    setIsTracking(false);
    calculateDPI();
  };

  const calculateDPI = () => {
    const pixels = isManualMode ? parseFloat(manualPixels) : pixelsMoved;
    const dist = isManualMode ? parseFloat(manualDistance) : distance;
    
    if (pixels > 0 && dist > 0) {
      const dpi = pixels / dist;
      setCalculatedDPI(Math.round(dpi));
    }
  };

  const resetDPICalculator = () => {
    setPixelsMoved(0);
    setCalculatedDPI(0);
    setIsTracking(false);
    setStartPosition(null);
    setManualPixels('');
    setManualDistance('');
  };

  const adjustDistance = (increment: number) => {
    setDistance(Math.max(1, distance + increment));
  };

  const toggleManualMode = () => {
    setIsManualMode(!isManualMode);
    resetDPICalculator();
  };

  // Calculate DPI when manual inputs change
  useEffect(() => {
    if (isManualMode && manualPixels && manualDistance) {
      calculateDPI();
    }
  }, [manualPixels, manualDistance, isManualMode]);

  // Enhanced Sensitivity Converter Logic
  useEffect(() => {
    const game1Data = games.find(g => g.name === game1);
    const game2Data = games.find(g => g.name === game2);
    
    if (game1Data && game2Data && game1Sensitivity > 0 && currentDPI > 0 && targetDPI > 0) {
      const gameConversionFactor = game1Data.multiplier / game2Data.multiplier;
      const dpiConversionFactor = currentDPI / targetDPI;
      const convertedSens = game1Sensitivity * gameConversionFactor * dpiConversionFactor;
      setConvertedSensitivity(Math.round(convertedSens * 1000) / 1000);

      const game1eDPI = currentDPI * game1Sensitivity * game1Data.multiplier;
      const game2eDPI = targetDPI * convertedSens * game2Data.multiplier;
      
      const cm360_1 = (2.54 * 360) / game1eDPI;
      const cm360_2 = (2.54 * 360) / game2eDPI;
      const in360_1 = 360 / game1eDPI;
      const in360_2 = 360 / game2eDPI;

      setCm360Game1(Math.round(cm360_1 * 100) / 100);
      setCm360Game2(Math.round(cm360_2 * 100) / 100);
      setIn360Game1(Math.round(in360_1 * 100) / 100);
      setIn360Game2(Math.round(in360_2 * 100) / 100);
    }
  }, [game1, game1Sensitivity, currentDPI, game2, targetDPI]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedSensitivity.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const resetConverter = () => {
    setGame1('Valorant');
    setGame1Sensitivity(0.5);
    setCurrentDPI(800);
    setGame2('CS2 (Counter-Strike 2)');
    setTargetDPI(800);
    setConvertedSensitivity(0);
    setCm360Game1(0);
    setCm360Game2(0);
    setIn360Game1(0);
    setIn360Game2(0);
  };

  // Polling Rate Tester Logic
  const handlePollingMouseMove = (e: React.MouseEvent) => {
    if (!isPollingActive) return;
    
    const now = performance.now();
    const newEvent: MouseEvent = {
      timestamp: now,
      x: e.clientX,
      y: e.clientY
    };
    
    setPollingEvents(prev => {
      const updated = [...prev, newEvent].slice(-200);
      
      if (updated.length > 10) {
        const intervals = [];
        for (let i = 1; i < updated.length; i++) {
          const interval = updated[i].timestamp - updated[i-1].timestamp;
          if (interval > 0.5 && interval < 50) {
            intervals.push(interval);
          }
        }
        
        if (intervals.length > 5) {
          intervals.sort((a, b) => a - b);
          const trimmedIntervals = intervals.slice(
            Math.floor(intervals.length * 0.1),
            Math.floor(intervals.length * 0.9)
          );
          
          const avgInterval = trimmedIntervals.reduce((a, b) => a + b, 0) / trimmedIntervals.length;
          const avgRate = Math.round(1000 / avgInterval);
          const maxRate = Math.round(1000 / Math.min(...trimmedIntervals));
          const minRate = Math.round(1000 / Math.max(...trimmedIntervals));
          
          setAveragePollingRate(Math.min(avgRate, 2000));
          setMaxPollingRate(Math.min(maxRate, 2000));
          setMinPollingRate(Math.max(minRate, 50));
        }
      }
      
      return updated;
    });
  };

  const startPollingTest = () => {
    setIsPollingActive(true);
    setPollingEvents([]);
    setAveragePollingRate(0);
    setMaxPollingRate(0);
    setMinPollingRate(0);
  };

  const stopPollingTest = () => {
    setIsPollingActive(false);
  };

  const resetPollingTest = () => {
    setIsPollingActive(false);
    setPollingEvents([]);
    setAveragePollingRate(0);
    setMaxPollingRate(0);
    setMinPollingRate(0);
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

  const navigationItems = [
    { id: 'calculator', label: 'DPI Calculator', icon: Calculator },
    { id: 'converter', label: 'Sensitivity Converter', icon: Target },
    { id: 'polling', label: 'Polling Rate Test', icon: Zap },
    { id: 'guides', label: 'Gaming Tips & Guides', icon: BookOpen },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} sticky top-0 z-50 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-3 rounded-xl shadow-lg`}>
                  <Mouse className={`w-8 h-8 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${themeClasses.text.primary}`}>Mouse DPI Calculator</h1>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>Free Gaming Tools & Sensitivity Converter</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <motion.button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-3 rounded-xl ${themeClasses.button.secondary} transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-2">
                  {navigationItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id as any);
                        setSelectedBlogPost(null);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? themeClasses.button.primary
                          : `${themeClasses.text.secondary} hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                  <select
                    value={activeSection}
                    onChange={(e) => {
                      setActiveSection(e.target.value as any);
                      setSelectedBlogPost(null);
                    }}
                    className={`${themeClasses.card} border rounded-lg px-3 py-2 text-sm`}
                  >
                    {navigationItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {activeSection === 'calculator' && (
              <motion.div
                key="calculator"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-7xl mx-auto px-4 py-8"
              >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-8 rounded-3xl shadow-2xl`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Calculator className={`w-20 h-20 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                    </motion.div>
                  </div>
                  <h2 className={`text-6xl font-bold ${themeClasses.text.primary} mb-4`}>
                    Mouse DPI Calculator
                  </h2>
                  <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
                    Calculate your exact mouse DPI by measuring pixel movement over a known distance. Perfect for gaming optimization and sensitivity tuning.
                  </p>
                </motion.div>

                {/* DPI Calculator Tool */}
                <motion.div
                  variants={itemVariants}
                  className={`${themeClasses.card} border rounded-3xl p-8 shadow-2xl`}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Controls Section */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-2xl font-bold ${themeClasses.text.primary}`}>DPI Calculator</h3>
                        <motion.button
                          onClick={toggleManualMode}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                            isManualMode 
                              ? themeClasses.button.primary
                              : themeClasses.button.secondary + ' border'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit3 className="w-4 h-4" />
                          {isManualMode ? 'Manual Mode' : 'Mouse Mode'}
                        </motion.button>
                      </div>

                      {!isManualMode ? (
                        <>
                          {/* Mouse Mode Controls */}
                          <div>
                            <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>
                              Pixels Moved
                            </label>
                            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-xl px-4 py-3 text-center`}>
                              <div className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                                {pixelsMoved}
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>
                              Distance
                            </label>
                            <div className="flex items-center gap-2">
                              <motion.button
                                onClick={() => adjustDistance(-1)}
                                className={`${themeClasses.button.secondary} border p-2 rounded-lg font-bold transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              
                              <div className={`flex-1 ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-xl px-4 py-3 text-center`}>
                                <div className={`text-xl font-bold ${themeClasses.text.primary}`}>
                                  {distance}
                                </div>
                              </div>
                              
                              <motion.button
                                onClick={() => adjustDistance(1)}
                                className={`${themeClasses.button.secondary} border p-2 rounded-lg font-bold transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Manual Mode Controls */}
                          <div>
                            <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>
                              Pixels Moved
                            </label>
                            <input
                              type="number"
                              value={manualPixels}
                              onChange={(e) => setManualPixels(e.target.value)}
                              className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                              placeholder="Enter pixels moved"
                            />
                          </div>

                          <div>
                            <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>
                              Distance
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={manualDistance}
                              onChange={(e) => setManualDistance(e.target.value)}
                              className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                              placeholder="Enter distance"
                            />
                          </div>
                        </>
                      )}

                      {/* Unit Selector */}
                      <div>
                        <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>
                          Unit
                        </label>
                        <select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value as 'inches' | 'cm')}
                          className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                        >
                          <option value="inches">inches</option>
                          <option value="cm">cm</option>
                        </select>
                      </div>

                      {/* DPI Result */}
                      <div className={`${isDarkMode ? 'bg-green-500/20 border-green-500/30' : 'bg-green-500/10 border-green-500/30'} rounded-2xl p-6 border text-center`}>
                        <div className={`text-5xl font-bold ${themeClasses.text.primary} mb-2`}>
                          {calculatedDPI}
                        </div>
                        <div className={`text-xl font-bold ${themeClasses.text.primary}`}>
                          DPI
                        </div>
                      </div>

                      {/* Reset Button */}
                      <motion.button
                        onClick={resetDPICalculator}
                        className={`w-full ${themeClasses.button.secondary} border px-4 py-3 rounded-xl font-semibold transition-all duration-300`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RotateCcw className="w-4 h-4 inline mr-2" />
                        Reset
                      </motion.button>
                    </div>

                    {/* Measuring Box Section */}
                    <div className="space-y-4">
                      <h4 className={`${themeClasses.text.primary} font-semibold`}>
                        {isManualMode ? 'Manual Input Mode' : 'Mouse Measuring Area'}
                      </h4>
                      
                      {!isManualMode ? (
                        <div
                          ref={measuringBoxRef}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          className={`relative h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl border-2 border-dashed transition-all duration-300 cursor-crosshair ${
                            isTracking 
                              ? 'border-green-500 bg-green-500/10' 
                              : `${isDarkMode ? 'border-gray-600' : 'border-gray-400'}`
                          }`}
                          style={{ userSelect: 'none' }}
                        >
                          <div className="absolute inset-6 flex items-center justify-center">
                            <div className="text-center">
                              <Mouse className={`w-20 h-20 ${themeClasses.text.secondary} mx-auto mb-4`} />
                              <p className={`${themeClasses.text.primary} text-xl font-medium mb-2`}>
                                {isTracking ? 'Keep dragging to measure...' : 'Click and drag to measure DPI'}
                              </p>
                              <p className={`${themeClasses.text.secondary} text-sm`}>
                                {isTracking 
                                  ? `Pixels moved: ${pixelsMoved}`
                                  : 'Set your distance first, then drag your mouse that exact distance'
                                }
                              </p>
                            </div>
                          </div>
                          
                          {/* Start Position Indicator */}
                          {startPosition && isTracking && (
                            <div
                              className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-2 -translate-y-2 pointer-events-none"
                              style={{
                                left: startPosition.x,
                                top: startPosition.y
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className={`h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-400'} flex items-center justify-center`}>
                          <div className="text-center">
                            <Edit3 className={`w-20 h-20 ${themeClasses.text.secondary} mx-auto mb-4`} />
                            <p className={`${themeClasses.text.primary} text-xl font-medium mb-2`}>
                              Manual Input Mode
                            </p>
                            <p className={`${themeClasses.text.secondary} text-sm`}>
                              Enter your pixels and distance values manually
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeSection === 'converter' && (
              <motion.div
                key="converter"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-7xl mx-auto px-4 py-8 space-y-8"
              >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-8 rounded-3xl shadow-2xl`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Target className={`w-20 h-20 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                    </motion.div>
                  </div>
                  <h2 className={`text-6xl font-bold ${themeClasses.text.primary} mb-4`}>
                    Gaming Sensitivity Converter
                  </h2>
                  <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
                    Convert your mouse sensitivity between different games while maintaining the same muscle memory and aim consistency.
                  </p>
                </motion.div>

                {/* Enhanced Sensitivity Converter Tool */}
                <motion.div
                  variants={itemVariants}
                  className={`${themeClasses.card} border rounded-3xl p-8 shadow-2xl`}
                >
                  <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6`}>Convert Between Games</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>From Game</label>
                          <select
                            value={game1}
                            onChange={(e) => setGame1(e.target.value)}
                            className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                          >
                            {games.map(game => (
                              <option key={game.name} value={game.name}>
                                {game.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>To Game</label>
                          <select
                            value={game2}
                            onChange={(e) => setGame2(e.target.value)}
                            className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                          >
                            {games.map(game => (
                              <option key={game.name} value={game.name}>
                                {game.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>Current Sensitivity in {game1}</label>
                        <input
                          type="number"
                          step="0.001"
                          value={game1Sensitivity}
                          onChange={(e) => setGame1Sensitivity(Number(e.target.value))}
                          className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                          placeholder="Enter your current sensitivity"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>Current DPI</label>
                          <input
                            type="number"
                            value={currentDPI}
                            onChange={(e) => setCurrentDPI(Number(e.target.value))}
                            className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                            placeholder="Current DPI"
                          />
                        </div>

                        <div>
                          <label className={`block ${themeClasses.text.primary} font-medium mb-2`}>Target DPI</label>
                          <input
                            type="number"
                            value={targetDPI}
                            onChange={(e) => setTargetDPI(Number(e.target.value))}
                            className={`w-full ${themeClasses.card} border rounded-xl px-4 py-3 ${themeClasses.text.primary} transition-all duration-300`}
                            placeholder="Target DPI"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Output Section */}
                    <div className="space-y-6">
                      <div className={`${isDarkMode ? 'bg-green-500/20 border-green-500/30' : 'bg-green-500/10 border-green-500/30'} rounded-2xl p-6 border`}>
                        <h4 className={`${themeClasses.text.primary} font-semibold mb-2`}>Converted Sensitivity for {game2}</h4>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`text-4xl font-bold ${themeClasses.text.primary}`}>{convertedSensitivity}</div>
                          <motion.button
                            onClick={copyToClipboard}
                            className={`${themeClasses.button.secondary} border p-2 rounded-lg transition-all duration-300`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          </motion.button>
                        </div>
                        <p className="text-green-500 text-sm">
                          Use this sensitivity in {game2} for the same feel
                        </p>
                      </div>

                      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
                        <h5 className={`font-semibold ${themeClasses.text.primary} mb-3`}>Real-World Movement</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h6 className="font-medium text-blue-500 mb-2">{game1}</h6>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>cm/360°:</span>
                                <span className={`${themeClasses.text.primary} font-medium`}>{cm360Game1}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>in/360°:</span>
                                <span className={`${themeClasses.text.primary} font-medium`}>{in360Game1}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-medium text-green-500 mb-2">{game2}</h6>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>cm/360°:</span>
                                <span className={`${themeClasses.text.primary} font-medium`}>{cm360Game2}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>in/360°:</span>
                                <span className={`${themeClasses.text.primary} font-medium`}>{in360Game2}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={resetConverter}
                        className={`w-full ${themeClasses.button.secondary} border px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Reset All Values
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Why Use Sensitivity Converter */}
                <motion.div
                  variants={itemVariants}
                  className={`${themeClasses.card} border rounded-3xl p-8 shadow-2xl mb-8`}
                >
                  <h3 className={`text-3xl font-bold ${themeClasses.text.primary} mb-6 text-center`}>
                    Why Use a Sensitivity Converter?
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className={`${isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-500/5 border-blue-500/30'} rounded-2xl p-6 border text-center`}>
                      <Users className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>Consistent Muscle Memory</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        Maintain the same physical mouse movement across all games. Your aim training transfers perfectly between titles.
                      </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/5 border-green-500/30'} rounded-2xl p-6 border text-center`}>
                      <Trophy className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>Competitive Advantage</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        Pro players use consistent sensitivity across games. Don't waste time readjusting when switching between Valorant, CS2, and Apex.
                      </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-500/5 border-purple-500/30'} rounded-2xl p-6 border text-center`}>
                      <Clock className={`w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>Save Time</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        No more guessing or spending hours finding the right sensitivity. Get the exact conversion instantly.
                      </p>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-500/5 border-orange-500/30'} rounded-2xl p-6 border`}>
                    <h4 className={`text-lg font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                      <Info className="w-5 h-5" />
                      How It Works
                    </h4>
                    <p className={`${themeClasses.text.secondary} mb-4`}>
                      Our converter uses each game's unique sensitivity scaling to calculate equivalent settings. It ensures that moving your mouse 
                      1 inch will result in the same degree of rotation in both games, maintaining perfect muscle memory transfer.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className={`font-semibold ${themeClasses.text.primary} mb-2`}>What is eDPI?</h5>
                        <p className={`${themeClasses.text.secondary} text-sm`}>
                          eDPI (effective DPI) = DPI × In-game Sensitivity. This gives you the true sensitivity comparison across games.
                        </p>
                      </div>
                      <div>
                        <h5 className={`font-semibold ${themeClasses.text.primary} mb-2`}>360° Distance</h5>
                        <p className={`${themeClasses.text.secondary} text-sm`}>
                          Shows how far you need to move your mouse for a complete 360° turn - a key metric for consistency.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Pro Tips Section */}
                <motion.div
                  variants={itemVariants}
                  className={`${isDarkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-black/10'} rounded-3xl p-8 border`}
                >
                  <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 text-center`}>
                    Pro Tips for Sensitivity Conversion
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Best Practices
                      </h4>
                      <ul className={`space-y-2 ${themeClasses.text.secondary} text-sm`}>
                        <li>• Test your converted sensitivity in aim trainers first</li>
                        <li>• Give yourself 1-2 weeks to fully adapt to new settings</li>
                        <li>• Keep your DPI consistent across all games when possible</li>
                        <li>• Use the 360° distance as your primary reference metric</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        Common Mistakes
                      </h4>
                      <ul className={`space-y-2 ${themeClasses.text.secondary} text-sm`}>
                        <li>• Changing sensitivity too frequently</li>
                        <li>• Not accounting for different DPI settings</li>
                        <li>• Expecting instant adaptation to new settings</li>
                        <li>• Ignoring game-specific factors like FOV differences</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeSection === 'polling' && (
              <motion.div
                key="polling"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="max-w-7xl mx-auto px-4 py-8 space-y-8"
              >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-8 rounded-3xl shadow-2xl`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Zap className={`w-20 h-20 ${isDarkMode ? 'text-black' : 'text-white'}`} />
                    </motion.div>
                  </div>
                  <h2 className={`text-6xl font-bold ${themeClasses.text.primary} mb-4`}>
                    Mouse Polling Rate Tester
                  </h2>
                  <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
                    Test your mouse polling rate to ensure optimal performance for gaming. Higher polling rates provide smoother cursor movement and lower input lag.
                  </p>
                </motion.div>

                {/* Polling Rate Tester Tool */}
                <motion.div
                  variants={itemVariants}
                  className={`${themeClasses.card} border rounded-3xl p-8 shadow-2xl`}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Controls and Results */}
                    <div className="space-y-6">
                      <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}>Test Your Polling Rate</h3>
                      
                      <div className="flex gap-3">
                        <motion.button
                          onClick={isPollingActive ? stopPollingTest : startPollingTest}
                          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isPollingActive
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isPollingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          {isPollingActive ? 'Stop Test' : 'Start Test'}
                        </motion.button>
                        
                        <motion.button
                          onClick={resetPollingTest}
                          className={`${themeClasses.button.secondary} border px-6 py-3 rounded-xl font-semibold transition-all duration-300`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RotateCcw className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Results */}
                      <div className="space-y-4">
                        <div className={`${isDarkMode ? 'bg-blue-500/20 border-blue-500/30' : 'bg-blue-500/10 border-blue-500/30'} rounded-2xl p-6 border`}>
                          <h4 className={`${themeClasses.text.primary} font-semibold mb-4`}>Polling Rate Results</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${themeClasses.text.primary}`}>{averagePollingRate}</div>
                              <div className="text-blue-500 text-sm">Average Hz</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-500">{maxPollingRate}</div>
                              <div className="text-green-500 text-sm">Max Hz</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-500">{minPollingRate}</div>
                              <div className="text-orange-500 text-sm">Min Hz</div>
                            </div>
                          </div>
                        </div>

                        {/* Performance Analysis */}
                        {averagePollingRate > 0 && (
                          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
                            <h5 className={`font-semibold ${themeClasses.text.primary} mb-3`}>Performance Analysis</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>Input Delay:</span>
                                <span className={`${themeClasses.text.primary} font-medium`}>
                                  ~{averagePollingRate > 0 ? Math.round(1000 / averagePollingRate * 10) / 10 : 0}ms
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>Performance:</span>
                                <span className={`font-medium ${
                                  averagePollingRate >= 1000 ? 'text-green-500' :
                                  averagePollingRate >= 500 ? 'text-yellow-500' : 'text-red-500'
                                }`}>
                                  {averagePollingRate >= 1000 ? 'Excellent' :
                                   averagePollingRate >= 500 ? 'Good' : 'Needs Improvement'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={themeClasses.text.secondary}>Gaming Ready:</span>
                                <span className={`font-medium ${averagePollingRate >= 500 ? 'text-green-500' : 'text-red-500'}`}>
                                  {averagePollingRate >= 500 ? 'Yes' : 'No'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Testing Area */}
                    <div className="space-y-4">
                      <h4 className={`${themeClasses.text.primary} font-semibold`}>Mouse Movement Test Area</h4>
                      <div
                        ref={pollingAreaRef}
                        onMouseMove={handlePollingMouseMove}
                        className={`relative h-96 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl border-2 border-dashed transition-all duration-300 cursor-crosshair ${
                          isPollingActive 
                            ? 'border-green-500 bg-green-500/10' 
                            : `${isDarkMode ? 'border-gray-600' : 'border-gray-400'}`
                        }`}
                      >
                        <div className="absolute inset-6 flex items-center justify-center">
                          <div className="text-center">
                            <Zap className={`w-20 h-20 ${themeClasses.text.secondary} mx-auto mb-4`} />
                            <p className={`${themeClasses.text.primary} text-xl font-medium mb-2`}>
                              {isPollingActive ? 'Move your mouse around this area' : 'Click "Start Test" to begin'}
                            </p>
                            <p className={`${themeClasses.text.secondary} text-sm`}>
                              {isPollingActive 
                                ? 'Keep moving to get accurate polling rate measurements'
                                : 'Large testing area for comfortable mouse movement'
                              }
                            </p>
                          </div>
                        </div>
                        
                        {isPollingActive && (
                          <div className={`absolute top-4 left-4 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} ${themeClasses.text.primary} px-3 py-2 rounded-lg text-sm`}>
                            <div>Events: {pollingEvents.length}</div>
                            <div>Current: {averagePollingRate}Hz</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* What is Polling Rate */}
                <motion.div
                  variants={itemVariants}
                  className={`${themeClasses.card} border rounded-3xl p-8 shadow-2xl mb-8`}
                >
                  <h3 className={`text-3xl font-bold ${themeClasses.text.primary} mb-6 text-center`}>
                    Understanding Mouse Polling Rate
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className={`${isDarkMode ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-500/5 border-blue-500/30'} rounded-2xl p-6 border text-center`}>
                      <Activity className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>What is Polling Rate?</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        Polling rate (Hz) is how many times per second your mouse reports its position to your computer. Higher = more responsive.
                      </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/5 border-green-500/30'} rounded-2xl p-6 border text-center`}>
                      <Gamepad2 className={`w-12 h-12 ${isDarkMode ? 'text-green-400' : 'text-green-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>Gaming Impact</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        Higher polling rates reduce input lag and provide smoother tracking, crucial for competitive gaming and precise aiming.
                      </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-500/5 border-purple-500/30'} rounded-2xl p-6 border text-center`}>
                      <Monitor className={`w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-4`} />
                      <h4 className={`text-xl font-bold ${themeClasses.text.primary} mb-3`}>Optimal Settings</h4>
                      <p className={`${themeClasses.text.secondary} text-sm`}>
                        Most gaming mice support 1000Hz (1ms response time). Some newer mice offer 2000Hz, 4000Hz, or even 8000Hz.
                      </p>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-500/5 border-orange-500/30'} rounded-2xl p-6 border`}>
                    <h4 className={`text-lg font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                      <Info className="w-5 h-5" />
                      Polling Rate Standards
                    </h4>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${themeClasses.text.primary}`}>125Hz</div>
                        <div className={`text-sm ${themeClasses.text.secondary}`}>8ms delay</div>
                        <div className={`text-xs ${themeClasses.text.secondary}`}>Basic mice</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${themeClasses.text.primary}`}>500Hz</div>
                        <div className={`text-sm ${themeClasses.text.secondary}`}>2ms delay</div>
                        <div className={`text-xs ${themeClasses.text.secondary}`}>Good for gaming</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-green-500`}>1000Hz</div>
                        <div className={`text-sm text-green-500`}>1ms delay</div>
                        <div className={`text-xs text-green-500`}>Gaming standard</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold text-blue-500`}>2000Hz+</div>
                        <div className={`text-sm text-blue-500`}>0.5ms delay</div>
                        <div className={`text-xs text-blue-500`}>High-end gaming</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Troubleshooting Guide */}
                <motion.div
                  variants={itemVariants}
                  className={`${isDarkMode ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-white/10' : 'bg-gradient-to-r from-red-500/5 to-orange-500/5 border-black/10'} rounded-3xl p-8 border`}
                >
                  <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6 text-center`}>
                    Troubleshooting Low Polling Rates
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                        <Settings className="w-5 h-5 text-blue-500" />
                        Common Solutions
                      </h4>
                      <ul className={`space-y-2 ${themeClasses.text.secondary} text-sm`}>
                        <li>• Check your mouse software for polling rate settings</li>
                        <li>• Try different USB ports (preferably USB 3.0+)</li>
                        <li>• Update your mouse drivers and firmware</li>
                        <li>• Disable USB power saving in Device Manager</li>
                        <li>• Close unnecessary background applications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-bold ${themeClasses.text.primary} mb-3 flex items-center gap-2`}>
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        When to Worry
                      </h4>
                      <ul className={`space-y-2 ${themeClasses.text.secondary} text-sm`}>
                        <li>• Polling rate consistently below 500Hz</li>
                        <li>• Large variations between min and max rates</li>
                        <li>• Noticeable input lag during gaming</li>
                        <li>• Mouse cursor feels choppy or unresponsive</li>
                        <li>• Inconsistent performance across different games</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeSection === 'guides' && (
              <BlogSection 
                selectedPost={selectedBlogPost} 
                onPostSelect={setSelectedBlogPost}
                isDarkMode={isDarkMode}
                onNavigateToSection={handleNavigateToSection}
              />
            )}

            {activeSection === 'faq' && <FAQ isDarkMode={isDarkMode} />}
          </AnimatePresence>
        </main>

        {/* SEO Content Section */}
        {activeSection === 'calculator' && <SEOContent isDarkMode={isDarkMode} />}

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} onNavigateToSection={handleNavigateToSection} />
      </div>
    </div>
  );
}

export default App;