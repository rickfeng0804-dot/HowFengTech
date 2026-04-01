import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Battery,
  Droplet,
  Factory,
  Shield,
  Menu,
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Globe,
  Award
} from 'lucide-react';

const products = [
  {
    title: '電力系統元件',
    description: '提供高品質、高可靠度的電力系統核心元件，確保電網穩定運行。',
    icon: Zap,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: '變壓器',
    description: '代理及銷售各類型工業用與配電用變壓器，滿足不同電壓轉換需求。',
    icon: Battery,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: '水力發電廠工程',
    description: '專業的水力發電廠機電設備安裝、維護與升級工程服務。',
    icon: Droplet,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    title: '變電所工程',
    description: '涵蓋變電所新建、擴建及設備汰換工程，提供全方位解決方案。',
    icon: Factory,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: '變色絕緣套代理',
    description: '獨家代理具備溫度指示功能之變色絕緣套，提升設備巡檢效率與安全性。',
    icon: Shield,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const cases = [
  {
    title: '蘭陽水力發電廠工程',
    description: '負責發電機組更新及控制系統升級，大幅提升發電效率與運轉穩定性。',
    image: 'https://picsum.photos/seed/hydro1/800/600',
  },
  {
    title: '達觀水力發電廠工程',
    description: '參與新建水力發電廠之核心機電設備安裝與測試，確保工程如期如質完工。',
    image: 'https://picsum.photos/seed/hydro2/800/600',
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              豪
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">
              豪豐科技有限公司
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">首頁</a>
            <a href="#products" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">產品與服務</a>
            <a href="#cases" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">成功案例</a>
            <a href="#about" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">關於我們</a>
            <a href="#contact" className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition-colors font-medium">
              聯絡我們
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="flex flex-col px-4 py-4 space-y-4">
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b">首頁</a>
                <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b">產品與服務</a>
                <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b">成功案例</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium py-2 border-b">關於我們</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-blue-700 font-medium py-2">聯絡我們</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/powerplant/1920/1080"
            alt="Power Plant Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 text-blue-100 text-sm font-semibold tracking-wider mb-6 border border-blue-400/30">
                專業電力工程與設備代理
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                驅動產業升級的<br />
                <span className="text-orange-400">穩定力量</span>
              </h1>
              <div className="flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 inline-flex">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white shrink-0">
                  <Award size={18} />
                </div>
                <h2 className="text-lg md:text-xl font-medium text-orange-300 tracking-wide">
                  台灣電力公司最佳外包工程團隊及優良廠商代表
                </h2>
              </div>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed">
                豪豐科技有限公司致力於提供最優質的電力系統元件、變壓器及水力發電廠、變電所工程服務。以專業技術與創新產品，為您的企業打造安全、高效的能源基礎設施。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-lg font-medium transition-colors flex items-center gap-2">
                  探索我們的產品 <ArrowRight size={18} />
                </a>
                <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-lg font-medium transition-colors">
                  聯絡業務團隊
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">產品與工程服務</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              我們提供從核心元件代理到大型發電廠工程的全方位解決方案，滿足工業與基礎建設的嚴苛要求。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`w-16 h-16 rounded-xl ${product.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <product.icon className={`w-8 h-8 ${product.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                <a href="#contact" className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 group-hover:gap-2 transition-all">
                  了解更多 <ChevronRight size={16} className="ml-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section id="cases" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">成功案例分享</h2>
              <div className="w-20 h-1 bg-orange-500 mb-6"></div>
              <p className="text-gray-600 text-lg">
                憑藉深厚的工程實力與專案管理經驗，我們成功參與多項國家級基礎建設，深獲客戶信賴。
              </p>
            </div>
            <a href="#contact" className="hidden md:inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors">
              查看所有案例 <ArrowRight size={16} className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-6 right-8 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Award size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <a href="#contact" className="inline-flex items-center text-blue-700 font-medium hover:text-blue-800 transition-colors">
              查看所有案例 <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA / About Section */}
      <section id="about" className="py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">關於豪豐科技</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                我們是一支專注於電力工程與設備代理的專業團隊。多年來，我們秉持著「專業、誠信、創新」的理念，為國內外客戶提供最優質的服務。從設備選型、系統設計到工程施工，我們都能提供一站式的解決方案。
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">20+</div>
                  <div className="text-blue-200">年產業經驗</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">100+</div>
                  <div className="text-blue-200">成功專案</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">立即與我們聯繫</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司名稱</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="請輸入您的公司名稱" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">聯絡人姓名</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="王小明" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話</label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="02-1234-5678" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="example@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">需求說明</label>
                  <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="請簡述您的需求或想了解的產品..."></textarea>
                </div>
                <button type="button" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-lg transition-colors">
                  送出表單
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  豪
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  豪豐科技有限公司
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                專業電力系統元件代理與工程服務供應商，致力於提供穩定、安全、高效的能源解決方案。
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Globe size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">快速連結</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="hover:text-blue-400 transition-colors">首頁</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">產品與服務</a></li>
                <li><a href="#cases" className="hover:text-blue-400 transition-colors">成功案例</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors">關於我們</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">產品服務</h4>
              <ul className="space-y-3">
                <li><a href="#products" className="hover:text-blue-400 transition-colors">電力系統元件</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">變壓器</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">水力發電廠工程</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">變電所工程</a></li>
                <li><a href="#products" className="hover:text-blue-400 transition-colors">變色絕緣套代理</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">聯絡資訊</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                  <span>100 台北市中正區重慶南路一段123號</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-blue-500 shrink-0" />
                  <span>(02) 2345-6789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-blue-500 shrink-0" />
                  <span>contact@haofeng-tech.com.tw</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} 豪豐科技有限公司 版權所有.
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">隱私權政策</a>
              <a href="#" className="hover:text-white transition-colors">服務條款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
