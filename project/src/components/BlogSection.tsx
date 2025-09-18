import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Target, 
  Settings,
  Star,
  ShoppingCart,
  ExternalLink,
  Check,
  X,
  Award,
  Monitor,
  Gamepad2,
  MousePointer,
  Wifi,
  Battery,
  Weight,
  Gauge,
  DollarSign,
  Filter,
  Grid,
  List,
  Search,
  Calculator
} from 'lucide-react';

interface GamingMouse {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  dpi: string;
  weight: string;
  connectivity: 'Wireless' | 'Wired' | 'Both';
  sensor: string;
  buttons: number;
  batteryLife?: string;
  rgb: boolean;
  category: 'Premium' | 'Budget' | 'Pro' | 'Wireless';
  pros: string[];
  cons: string[];
  bestFor: string[];
  affiliateLink: string;
  description: string;
  features: string[];
  inStock: boolean;
}

const gamingMice: GamingMouse[] = [
  {
    id: 'zebronics-transformer-m',
    name: 'Transformer-M',
    brand: 'ZEBRONICS',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 299,
    originalPrice: 549,
    rating: 4.2,
    reviews: 28518,
    dpi: '3,600 DPI',
    weight: '95g',
    connectivity: 'Wired',
    sensor: 'High-Resolution Optical',
    buttons: 5,
    rgb: true,
    category: 'Budget',
    pros: [
      'Excellent value for money at ₹299',
      'Multi-color LED lighting effects',
      'Gold-plated USB connector for durability',
      'DPI switch for instant sensitivity adjustment',
      'Ergonomic design for comfortable gaming'
    ],
    cons: [
      'Limited DPI range compared to premium mice',
      'Wired connection only',
      'Basic sensor compared to high-end options',
      'May not suit professional esports players'
    ],
    bestFor: ['Budget Gaming', 'Casual Gaming', 'RGB Enthusiasts', 'Entry-Level Gaming'],
    affiliateLink: 'https://amzn.to/3VndesW',
    description: 'High-performance budget gaming mouse with RGB lighting and gold-plated USB connector',
    features: ['Multi-Color LED', 'DPI Switch', 'Gold-Plated USB', 'Ergonomic Design'],
    inStock: true
  },
  {
    id: 'razer-viper-v2-pro',
    name: 'Viper V2 Pro',
    brand: 'Razer',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 7051,
    originalPrice: 17999,
    rating: 3.8,
    reviews: 30,
    dpi: '30,000 DPI',
    weight: '59g',
    connectivity: 'Wireless',
    sensor: 'Focus Pro 30K',
    buttons: 5,
    batteryLife: '80 hours',
    rgb: false,
    category: 'Premium',
    pros: [
      'Ultra-lightweight at 59g',
      'Industry-leading 30K DPI sensor',
      'Hyperspeed wireless technology',
      'Long 80-hour battery life',
      'Premium build quality'
    ],
    cons: [
      'Very expensive at ₹7,051',
      'No RGB lighting',
      'Limited availability',
      'May be too light for some users'
    ],
    bestFor: ['Professional Gaming', 'Competitive FPS', 'High-End Gaming', 'Esports'],
    affiliateLink: 'https://amzn.to/41TR9Wv',
    description: 'Ultra-lightweight wireless gaming mouse with 30,000 DPI sensor',
    features: ['HyperSpeed Wireless', 'Focus Pro 30K', 'Optical Switches', 'Ultra-Light'],
    inStock: true
  },
  {
    id: 'ant-esports-gm320',
    name: 'GM320 RGB Gaming Mouse',
    brand: 'Ant Esports',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 499,
    originalPrice: 2799,
    rating: 4.3,
    reviews: 7470,
    dpi: '12,800 DPI',
    weight: '120g',
    connectivity: 'Wired',
    sensor: 'Optical Sensor',
    buttons: 8,
    rgb: true,
    category: 'Budget',
    pros: [
      'Great value at ₹499 (82% discount)',
      '8 programmable buttons for customization',
      'High 12,800 DPI for precision gaming',
      'RGB lighting with multiple effects',
      'Ergonomic design with braided cable'
    ],
    cons: [
      'Heavier at 120g compared to premium mice',
      'Wired connection only',
      'Basic sensor compared to high-end options',
      'Software may have limited features'
    ],
    bestFor: ['Budget Gaming', 'MMO Gaming', 'RGB Gaming', 'Programmable Controls'],
    affiliateLink: 'https://amzn.to/46rSMw7',
    description: 'RGB optical wired gaming mouse with 8 programmable buttons and ergonomic design',
    features: ['8 Programmable Buttons', 'RGB Lighting', 'Braided Cable', 'Ergonomic Design'],
    inStock: true
  },
  {
    id: 'offbeat-ripjaw',
    name: 'RIPJAW 2.4Ghz Wireless',
    brand: 'Offbeat',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 899,
    originalPrice: 1099,
    rating: 4.2,
    reviews: 7573,
    dpi: '3,200 DPI',
    weight: '85g',
    connectivity: 'Wireless',
    sensor: 'Optical Sensor',
    buttons: 7,
    batteryLife: 'Rechargeable',
    rgb: true,
    category: 'Wireless',
    pros: [
      'Wireless freedom with 2.4GHz connection',
      'Silent click buttons for quiet operation',
      '7 programmable buttons',
      'Rechargeable battery design',
      'Lightweight at 85g'
    ],
    cons: [
      'Limited DPI range at 3,200',
      'Battery life not specified clearly',
      'May have connectivity issues',
      'Basic sensor performance'
    ],
    bestFor: ['Wireless Gaming', 'Silent Gaming', 'Office Use', 'Casual Gaming'],
    affiliateLink: 'https://amzn.to/4nbCjTQ',
    description: 'Rechargeable wireless gaming mouse with silent click buttons and 7D functionality',
    features: ['2.4GHz Wireless', 'Silent Clicks', 'Rechargeable', '7D Buttons'],
    inStock: true
  },
  {
    id: 'logitech-g102',
    name: 'G102 Light Sync',
    brand: 'Logitech',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 1195,
    originalPrice: 2295,
    rating: 4.3,
    reviews: 11314,
    dpi: '8,000 DPI',
    weight: '85g',
    connectivity: 'Wired',
    sensor: 'Gaming Grade Sensor',
    buttons: 6,
    rgb: true,
    category: 'Budget',
    pros: [
      'Trusted Logitech brand quality',
      'Customizable RGB lighting with 16.8M colors',
      '6 programmable buttons',
      'Gaming-grade sensor with 8K DPI',
      'Lightweight design at 85g'
    ],
    cons: [
      'Wired connection only',
      'Limited DPI compared to premium mice',
      'Basic sensor compared to high-end options',
      'May not suit professional esports'
    ],
    bestFor: ['Budget Gaming', 'RGB Gaming', 'Casual Gaming', 'First Gaming Mouse'],
    affiliateLink: 'https://amzn.to/46ETfMy',
    description: 'Gaming mouse with customizable RGB lighting and 6 programmable buttons',
    features: ['RGB Light Sync', '6 Programmable Buttons', '8K DPI Tracking', 'Light Weight'],
    inStock: true
  }
];

const categories = ['All', 'Premium', 'Budget', 'Pro', 'Wireless'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Most Popular'];

interface BlogSectionProps {
  selectedPost: string | null;
  onPostSelect: (postId: string | null) => void;
  isDarkMode: boolean;
  onNavigateToSection?: (section: 'calculator' | 'converter' | 'polling') => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ selectedPost, onPostSelect, isDarkMode, onNavigateToSection }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMouse, setSelectedMouse] = useState<string | null>(null);

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
      ? "hover:border-white/30" 
      : "hover:border-black/30",
    button: {
      primary: isDarkMode 
        ? "bg-white text-black hover:bg-gray-200" 
        : "bg-black text-white hover:bg-gray-800",
      secondary: isDarkMode 
        ? "bg-white/10 hover:bg-white/20 text-white border border-white/20" 
        : "bg-black/10 hover:bg-black/20 text-black border border-black/20"
    }
  };

  // Filter and sort mice
  const filteredMice = gamingMice
    .filter(mouse => {
      const matchesCategory = selectedCategory === 'All' || mouse.category === selectedCategory;
      const matchesSearch = mouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mouse.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Rating':
          return b.rating - a.rating;
        case 'Most Popular':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  // Individual mouse review page
  if (selectedMouse) {
    const mouse = gamingMice.find(m => m.id === selectedMouse);
    if (!mouse) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className={`${themeClasses.card} rounded-3xl p-8 shadow-2xl`}>
          <motion.button
            onClick={() => setSelectedMouse(null)}
            className={`flex items-center ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} mb-6 transition-colors duration-300`}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Gaming Mice
          </motion.button>

          {/* Affiliate Button - Top */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href={mouse.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-6 h-6" />
              Buy {mouse.name} on Amazon - ₹{mouse.price}
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src={mouse.image}
                alt={mouse.name}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'} px-3 py-1 rounded-full text-sm font-medium`}>
                  {mouse.category}
                </span>
                {!mouse.inStock && (
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
              <h1 className={`text-4xl font-bold ${themeClasses.text.primary} mb-2`}>
                {mouse.brand} {mouse.name}
              </h1>
              <p className={`text-xl ${themeClasses.text.secondary} mb-4`}>
                {mouse.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(mouse.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className={`ml-2 ${themeClasses.text.primary} font-semibold`}>{mouse.rating}</span>
                  <span className={`${themeClasses.text.secondary} text-sm`}>({mouse.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-green-500">₹{mouse.price}</div>
                {mouse.originalPrice && (
                  <div className={`text-xl ${themeClasses.text.secondary} line-through`}>
                    ₹{mouse.originalPrice}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className={`w-5 h-5 ${themeClasses.text.primary}`} />
                    <span className={`font-semibold ${themeClasses.text.primary}`}>DPI</span>
                  </div>
                  <div className={themeClasses.text.secondary}>{mouse.dpi}</div>
                </div>
                <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className={`w-5 h-5 ${themeClasses.text.primary}`} />
                    <span className={`font-semibold ${themeClasses.text.primary}`}>Weight</span>
                  </div>
                  <div className={themeClasses.text.secondary}>{mouse.weight}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specs Table */}
          <div className="mb-8">
            <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6`}>Detailed Specifications</h3>
            <div className={`${themeClasses.card} rounded-2xl overflow-hidden`}>
              <table className="w-full">
                <tbody>
                  {[
                    { label: 'Sensor', value: mouse.sensor },
                    { label: 'DPI Range', value: mouse.dpi },
                    { label: 'Weight', value: mouse.weight },
                    { label: 'Connectivity', value: mouse.connectivity },
                    { label: 'Buttons', value: `${mouse.buttons} programmable` },
                    { label: 'Battery Life', value: mouse.batteryLife || 'N/A (Wired)' },
                    { label: 'RGB Lighting', value: mouse.rgb ? 'Yes' : 'No' },
                    { label: 'Warranty', value: '2 Years' }
                  ].map((spec, index) => (
                    <tr key={spec.label} className={index % 2 === 0 ? (isDarkMode ? 'bg-white/5' : 'bg-black/5') : ''}>
                      <td className={`px-6 py-4 font-semibold ${themeClasses.text.primary}`}>{spec.label}</td>
                      <td className={`px-6 py-4 ${themeClasses.text.secondary}`}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Affiliate Button - Middle */}
          <motion.div
            className="text-center mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <motion.a
              href={mouse.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 ${themeClasses.button.primary} px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-6 h-6" />
              Check Current Price on Amazon - ₹{mouse.price}
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4 flex items-center gap-2`}>
                <Check className="w-6 h-6 text-green-500" />
                Pros
              </h3>
              <div className={`${isDarkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/5 border-green-500/30'} rounded-2xl p-6 border`}>
                <ul className="space-y-3">
                  {mouse.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={themeClasses.text.secondary}>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4 flex items-center gap-2`}>
                <X className="w-6 h-6 text-red-500" />
                Cons
              </h3>
              <div className={`${isDarkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-500/5 border-red-500/30'} rounded-2xl p-6 border`}>
                <ul className="space-y-3">
                  {mouse.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className={themeClasses.text.secondary}>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Best For Section */}
          <div className="mb-8">
            <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-4`}>Best For</h3>
            <div className="flex flex-wrap gap-3">
              {mouse.bestFor.map((use, index) => (
                <span
                  key={index}
                  className={`${isDarkMode ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-500/10 text-blue-600 border-blue-500/30'} px-4 py-2 rounded-full border font-medium`}
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Affiliate Button - Bottom */}
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.a
              href={mouse.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-7 h-7" />
              Get the {mouse.name} Now - ₹{mouse.price}
              <ExternalLink className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-6 rounded-3xl shadow-2xl`}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MousePointer className={`w-16 h-16 ${isDarkMode ? 'text-black' : 'text-white'}`} />
          </motion.div>
        </div>
        <h2 className={`text-5xl font-bold ${themeClasses.text.primary} mb-4`}>
          Best Gaming Mice for DPI Optimization
        </h2>
        <p className={`text-xl ${themeClasses.text.secondary} max-w-3xl mx-auto`}>
          Discover the top gaming mice recommended by pros and enthusiasts. Find your perfect DPI setup with our curated selection.
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        variants={itemVariants}
        className={`${themeClasses.card} rounded-2xl p-6 mb-8`}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${themeClasses.text.primary}`} />
              <span className={`font-semibold ${themeClasses.text.primary}`}>Filter:</span>
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? themeClasses.button.primary
                      : themeClasses.button.secondary
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.text.secondary}`} />
              <input
                type="text"
                placeholder="Search mice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${themeClasses.card} border rounded-xl pl-10 pr-4 py-2 w-64 ${themeClasses.text.primary} transition-all duration-300`}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`${themeClasses.card} border rounded-xl px-4 py-2 ${themeClasses.text.primary} transition-all duration-300`}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? themeClasses.button.primary : themeClasses.button.secondary
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? themeClasses.button.primary : themeClasses.button.secondary
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Grid/List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
        {filteredMice.map((mouse, index) => (
          <motion.div
            key={mouse.id}
            variants={itemVariants}
            className={`${themeClasses.card} ${themeClasses.cardHover} rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer group ${
              viewMode === 'list' ? 'flex gap-6 p-6' : 'p-6'
            }`}
            onClick={() => setSelectedMouse(mouse.id)}
            whileHover={{ 
              scale: viewMode === 'grid' ? 1.02 : 1.01,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
              <div className="relative mb-4">
                <img
                  src={mouse.image}
                  alt={mouse.name}
                  className={`w-full object-cover rounded-2xl ${viewMode === 'list' ? 'h-32' : 'h-48'}`}
                />
                {!mouse.inStock && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`${isDarkMode ? 'bg-black/70 text-white' : 'bg-white/70 text-black'} px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}>
                    {mouse.category}
                  </span>
                </div>
                {mouse.originalPrice && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium ${themeClasses.text.secondary}`}>{mouse.brand}</span>
                {mouse.rgb && <div className="w-2 h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full"></div>}
                {mouse.connectivity === 'Wireless' && <Wifi className="w-4 h-4 text-blue-500" />}
              </div>

              <h3 className={`text-xl font-bold ${themeClasses.text.primary} mb-2 group-hover:${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
                {mouse.name}
              </h3>
              
              <p className={`${themeClasses.text.secondary} mb-4 text-sm leading-relaxed`}>
                {mouse.description}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(mouse.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className={`ml-1 text-sm ${themeClasses.text.primary} font-semibold`}>{mouse.rating}</span>
                  <span className={`${themeClasses.text.secondary} text-xs`}>({mouse.reviews})</span>
                </div>
              </div>

              <div className={`grid ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-2'} gap-3 mb-4 text-sm`}>
                <div className="flex items-center gap-2">
                  <Gauge className={`w-4 h-4 ${themeClasses.text.primary}`} />
                  <span className={themeClasses.text.secondary}>{mouse.dpi}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className={`w-4 h-4 ${themeClasses.text.primary}`} />
                  <span className={themeClasses.text.secondary}>{mouse.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MousePointer className={`w-4 h-4 ${themeClasses.text.primary}`} />
                  <span className={themeClasses.text.secondary}>{mouse.buttons} buttons</span>
                </div>
                {mouse.batteryLife && (
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${themeClasses.text.primary}`} />
                    <span className={themeClasses.text.secondary}>{mouse.batteryLife}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-green-500">₹{mouse.price}</div>
                  {mouse.originalPrice && (
                    <div className={`text-sm ${themeClasses.text.secondary} line-through`}>
                      ₹{mouse.originalPrice}
                    </div>
                  )}
                </div>
                
                <motion.a
                  href={mouse.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Best DPI Setup Toolkit Sidebar */}
      <motion.div
        variants={itemVariants}
        className={`${isDarkMode ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-black/10'} rounded-3xl p-8 mt-12 border`}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Award className={`w-12 h-12 ${themeClasses.text.primary}`} />
          </div>
          <h3 className={`text-3xl font-bold ${themeClasses.text.primary} mb-4`}>
            Complete DPI Setup Toolkit
          </h3>
          <p className={`${themeClasses.text.secondary} max-w-2xl mx-auto`}>
            Get the complete gaming setup with our recommended mice, plus essential tools to optimize your DPI settings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className={`${themeClasses.card} rounded-2xl p-6 text-center`}>
            <Calculator className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-3`} />
            <h4 className={`font-bold ${themeClasses.text.primary} mb-2`}>DPI Calculator</h4>
            <p className={`text-sm ${themeClasses.text.secondary} mb-4`}>Calculate your exact mouse DPI</p>
            <motion.button
              className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPostSelect(null);
                onNavigateToSection?.('calculator');
              }}
            >
              Use Tool
            </motion.button>
          </div>

          <div className={`${themeClasses.card} rounded-2xl p-6 text-center`}>
            <Target className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-3`} />
            <h4 className={`font-bold ${themeClasses.text.primary} mb-2`}>Sensitivity Converter</h4>
            <p className={`text-sm ${themeClasses.text.secondary} mb-4`}>Convert between games</p>
            <motion.button
              className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPostSelect(null);
                onNavigateToSection?.('converter');
              }}
            >
              Use Tool
            </motion.button>
          </div>

          <div className={`${themeClasses.card} rounded-2xl p-6 text-center`}>
            <Zap className={`w-8 h-8 ${themeClasses.text.primary} mx-auto mb-3`} />
            <h4 className={`font-bold ${themeClasses.text.primary} mb-2`}>Polling Rate Test</h4>
            <p className={`text-sm ${themeClasses.text.secondary} mb-4`}>Test mouse performance</p>
            <motion.button
              className={`${themeClasses.button.secondary} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPostSelect(null);
                onNavigateToSection?.('polling');
              }}
            >
              Use Tool
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogSection;
