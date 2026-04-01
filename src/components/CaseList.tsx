import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { motion } from 'motion/react';

interface Case {
  name: string;
  image: string;
}

interface CaseListProps {
  sheetUrl: string;
}

export default function CaseList({ sheetUrl }: CaseListProps) {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      setError(null);
      try {
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
            const parsedCases: Case[] = results.data.map((row: any) => ({
              name: row['案場'] || '',
              image: row['圖檔'] || '',
            })).filter(c => c.name); // Filter out empty rows

            setCases(parsedCases);
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
      fetchCases();
    }
  }, [sheetUrl]);

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
        <p className="font-medium mb-2">載入成功案例資料失敗</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        目前沒有成功案例資料
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cases.map((item, index) => (
        <motion.div
          key={`${item.name}-${index}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 group"
        >
          <div className="aspect-video bg-gray-100 relative overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white">{item.name}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
