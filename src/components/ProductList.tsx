import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { motion } from 'motion/react';

interface Product {
  category: string;
  name: string;
  image: string;
}

interface ProductListProps {
  sheetUrl: string;
}

export default function ProductList({ sheetUrl }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Extract Spreadsheet ID from URL
        const match = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) {
          throw new Error('無效的 Google Sheet URL');
        }
        const sheetId = match[1];
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error('無法讀取資料，請確認試算表是否已設為「知道連結的使用者皆可查看」');
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedProducts: Product[] = results.data.map((row: any) => ({
              category: row['分類'] || '',
              name: row['產品'] || '',
              image: row['圖檔'] || '',
            })).filter(p => p.name); // Filter out empty rows

            setProducts(parsedProducts);
            
            // Extract unique categories
            const uniqueCategories = Array.from(new Set(parsedProducts.map(p => p.category).filter(Boolean)));
            setCategories(['全部', ...uniqueCategories]);
            
            setLoading(false);
          },
          error: (error: any) => {
            setError('解析資料失敗: ' + error.message);
            setLoading(false);
          }
        });
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (sheetUrl) {
      fetchProducts();
    }
  }, [sheetUrl]);

  const filteredProducts = activeCategory === '全部' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center max-w-2xl mx-auto my-10 border border-red-200">
        <p className="font-medium mb-2">載入產品資料失敗</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        目前沒有產品資料
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={`${product.name}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow group"
          >
            <div className="aspect-square bg-gray-50 relative overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580983546086-1c075f62241d?auto=format&fit=crop&w=800&q=80'; // Fallback image
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  無圖片
                </div>
              )}
              {product.category && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-medium text-blue-800 shadow-sm">
                  {product.category}
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{product.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
