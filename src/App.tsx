import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Globe,
  Award,
  Settings,
  ExternalLink
} from 'lucide-react';
import ProductList from './components/ProductList';
import CaseList from './components/CaseList';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultSheetUrl = 'https://docs.google.com/spreadsheets/d/1sdHSVVOYf47r84f9R7KV8iqWf_q5LMSkLzNMdWdpCi8/edit?usp=sharing';
  const defaultCaseSheetUrl = 'https://docs.google.com/spreadsheets/d/1FMNk9vTDuV4uyue4of1Db-kjrrgHByoj1rZKD5WvUfA/edit?usp=sharing';
  const defaultContactSheetUrl = 'https://script.google.com/macros/s/AKfycbxb5lIhIvt219dZpXmo6cWyuXTiC94iMcZe_GRiYsg36NbNuO9L76_UJ7FeUQtMbnfy6A/exec';
  const defaultContactEmail = 'rickfeng0804@gmail.com';
  
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('productSheetUrl') || defaultSheetUrl;
  });
  const [caseSheetUrl, setCaseSheetUrl] = useState(() => {
    return localStorage.getItem('caseSheetUrl') || defaultCaseSheetUrl;
  });
  const [contactSheetUrl, setContactSheetUrl] = useState(() => {
    return localStorage.getItem('contactSheetUrl') || defaultContactSheetUrl;
  });
  const [contactEmail, setContactEmail] = useState(() => {
    return localStorage.getItem('contactEmail') || defaultContactEmail;
  });
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [passwordPromptOpen, setPasswordPromptOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [tempUrl, setTempUrl] = useState(sheetUrl);
  const [tempCaseUrl, setTempCaseUrl] = useState(caseSheetUrl);
  const [tempContactUrl, setTempContactUrl] = useState(contactSheetUrl);
  const [tempContactEmail, setTempContactEmail] = useState(contactEmail);

  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleOpenSettings = () => {
    setPasswordInput('');
    setPasswordError('');
    setPasswordPromptOpen(true);
  };

  const handlePasswordSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passwordInput === '0928958050') {
      setPasswordPromptOpen(false);
      setTempUrl(sheetUrl);
      setTempCaseUrl(caseSheetUrl);
      setTempContactUrl(contactSheetUrl);
      setSettingsOpen(true);
    } else {
      setPasswordError('密碼錯誤，請重新輸入');
    }
  };

  const saveSettings = () => {
    setSheetUrl(tempUrl);
    localStorage.setItem('productSheetUrl', tempUrl);
    setCaseSheetUrl(tempCaseUrl);
    localStorage.setItem('caseSheetUrl', tempCaseUrl);
    setContactSheetUrl(tempContactUrl);
    localStorage.setItem('contactSheetUrl', tempContactUrl);
    setContactEmail(tempContactEmail);
    localStorage.setItem('contactEmail', tempContactEmail);
    setSettingsOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.companyName || !contactForm.contactName || !contactForm.phone || !contactForm.email) {
      alert('請填寫必填欄位');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData to send
      const formData = new FormData();
      formData.append('companyName', contactForm.companyName);
      formData.append('contactName', contactForm.contactName);
      formData.append('phone', contactForm.phone);
      formData.append('email', contactForm.email);
      formData.append('description', contactForm.description);
      formData.append('timestamp', new Date().toISOString());

      // If the URL is a Google Apps Script Web App, we can send data to it.
      if (contactSheetUrl.includes('script.google.com')) {
        // Construct query parameters for GET request
        const params = new URLSearchParams();
        params.append('companyName', contactForm.companyName);
        params.append('contactName', contactForm.contactName);
        params.append('phone', contactForm.phone);
        params.append('email', contactForm.email);
        params.append('description', contactForm.description);
        params.append('timestamp', new Date().toISOString());
        params.append('targetEmail', contactEmail);

        const urlWithParams = `${contactSheetUrl}?${params.toString()}`;

        await fetch(urlWithParams, {
          method: 'GET',
          mode: 'no-cors'
        });
      } else {
        // Simulate network delay for standard sheet URL
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.warn("Notice: To actually write data, please deploy a Google Apps Script Web App and use its URL.");
      }
      
      setSubmitSuccess(true);
      setContactForm({
        companyName: '',
        contactName: '',
        phone: '',
        email: '',
        description: ''
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('提交失敗，請稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-5xl font-black text-blue-900 tracking-tight">
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
            <button 
              onClick={handleOpenSettings}
              className="text-gray-500 hover:text-blue-700 transition-colors p-2"
              title="系統設定"
            >
              <Settings size={20} />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={handleOpenSettings}
              className="text-gray-500 hover:text-blue-700 transition-colors p-2"
            >
              <Settings size={20} />
            </button>
            <button
              className="text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt="Tech Power Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/60 to-transparent"></div>
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">產品與服務</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              我們提供從核心元件代理到大型發電廠工程的全方位解決方案，滿足工業與基礎建設的嚴苛要求。
            </p>
          </div>

          <ProductList sheetUrl={sheetUrl} />
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
          </div>

          <CaseList sheetUrl={caseSheetUrl} />
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
              <div className="bg-blue-800/50 rounded-xl p-6 border border-blue-700/50 mt-8">
                <h4 className="text-white font-bold mb-4 border-b border-blue-700/50 pb-2">公司基本資料</h4>
                <ul className="space-y-3 text-blue-100 text-sm md:text-base">
                  <li className="flex"><span className="w-24 shrink-0 text-blue-300">公司名稱：</span><span>豪豐科技有限公司<br/><span className="text-sm text-blue-200">HFGET Corporation</span></span></li>
                  <li className="flex"><span className="w-24 shrink-0 text-blue-300">統一編號：</span><span>42945830</span></li>
                  <li className="flex"><span className="w-24 shrink-0 text-blue-300">負責人：</span><span>呂家宏</span></li>
                  <li className="flex"><span className="w-24 shrink-0 text-blue-300">設立日期：</span><span>2018年3月14日</span></li>
                  <li className="flex"><span className="w-24 shrink-0 text-blue-300">資本總額：</span><span>新台幣 15,000,000 元</span></li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">立即與我們聯繫</h3>
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center">
                  <h4 className="text-lg font-bold mb-2">送出成功！</h4>
                  <p>我們已收到您的訊息，將會盡快與您聯繫。</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公司名稱 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.companyName}
                      onChange={(e) => setContactForm({...contactForm, companyName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="請輸入您的公司名稱" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">聯絡人姓名 <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.contactName}
                        onChange={(e) => setContactForm({...contactForm, contactName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="王小明" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">聯絡電話 <span className="text-red-500">*</span></label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                        placeholder="02-1234-5678" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">電子郵件 <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      placeholder="example@company.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">需求說明</label>
                    <textarea 
                      rows={4} 
                      value={contactForm.description}
                      onChange={(e) => setContactForm({...contactForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                      placeholder="請簡述您的需求或想了解的產品..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full font-medium py-3 rounded-lg transition-colors ${
                      isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'
                    }`}
                  >
                    {isSubmitting ? '處理中...' : '送出表單'}
                  </button>
                </form>
              )}
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
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white tracking-tight">
                    豪豐科技有限公司
                  </span>
                  <span className="text-xs text-gray-400">HFGET Corporation</span>
                </div>
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
                  <span className="leading-relaxed">
                    35144 苗栗縣頭份市上埔里4鄰中正一路139號9樓<br/>
                    <span className="text-sm text-gray-500">9 F., No. 139, Zhongzheng 1st Rd., Toufen City, Miaoli County</span>
                  </span>
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

      {/* Password Prompt Modal */}
      <AnimatePresence>
        {passwordPromptOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setPasswordPromptOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Settings size={20} className="text-blue-700" />
                  系統設定
                </h3>
                <button
                  onClick={() => setPasswordPromptOpen(false)}
                  className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handlePasswordSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    請輸入管理員密碼
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="輸入密碼"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500 mt-2">{passwordError}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setPasswordPromptOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium shadow-md"
                  >
                    確認
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSettingsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Settings size={20} className="text-blue-700" />
                  系統設定
                </h3>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      產品列表 Google Sheet URL
                    </label>
                    <a 
                      href={tempUrl || defaultSheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <ExternalLink size={14} /> 前往修改資料
                    </a>
                  </div>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    請確保試算表已設定為「知道連結的使用者皆可查看」，且包含「分類」、「產品」、「圖檔」三個欄位。
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      成功案例 Google Sheet URL
                    </label>
                    <a 
                      href={tempCaseUrl || defaultCaseSheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <ExternalLink size={14} /> 前往修改資料
                    </a>
                  </div>
                  <input
                    type="text"
                    value={tempCaseUrl}
                    onChange={(e) => setTempCaseUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    請確保試算表已設定為「知道連結的使用者皆可查看」，且包含「案場」、「圖檔」兩個欄位。
                  </p>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      聯絡表單 Google Apps Script URL
                    </label>
                    <a 
                      href={tempContactUrl || defaultContactSheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <ExternalLink size={14} /> 查看試算表
                    </a>
                  </div>
                  <input
                    type="text"
                    value={tempContactUrl}
                    onChange={(e) => setTempContactUrl(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="https://script.google.com/macros/s/..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    接收通知 Email (聯絡表單)
                  </label>
                  <input
                    type="email"
                    value={tempContactEmail}
                    onChange={(e) => setTempContactEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="your-email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    當有新表單送出時，系統將會寄送通知信至此信箱。
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => setSettingsOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    取消
                  </button>
                  <button
                    onClick={saveSettings}
                    className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium shadow-md"
                  >
                    儲存設定
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
