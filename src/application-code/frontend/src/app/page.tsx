'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cloud, 
  Upload, 
  FileAudio, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  Server,
  Zap
} from 'lucide-react';
import { mockMeetingsList } from '@/data/mockMeeting';

export default function Dashboard() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);

  const simulatePipeline = () => {
    setIsUploading(true);
    setUploadStep(1);

    setTimeout(() => setUploadStep(2), 1500); // S3 Upload
    setTimeout(() => setUploadStep(3), 3000); // EventBridge
    setTimeout(() => setUploadStep(4), 4500); // Gemini API
    setTimeout(() => {
      setIsUploading(false);
      setUploadStep(0);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">CloudMedia AI</h1>
              <p className="text-xs text-slate-400">Serverless Media Processing Pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Pipeline Active (Free Tier)
          </div>
        </header>

        {/* Upload Zone */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
          <div className="max-w-md mx-auto space-y-3">
            <div className="mx-auto w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 border border-slate-700">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Загрузите медиафайл</h3>
              <p className="text-xs text-slate-400 mt-1">Поддерживаются MP3, WAV, MP4 до 50MB</p>
            </div>
            
            <button
              onClick={simulatePipeline}
              disabled={isUploading}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              {isUploading ? 'Обработка пайплайном...' : 'Симулировать загрузку файла'}
            </button>
          </div>

          {/* Pipeline Tracker Widget */}
          {isUploading && (
            <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-2xl mx-auto">
              <p className="text-xs text-slate-400 mb-4 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 animate-bounce" /> Статус обработки события в реальном времени:
              </p>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className={`p-2.5 rounded-lg border ${uploadStep >= 1 ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-500'}`}>
                  1. S3 Storage
                </div>
                <div className={`p-2.5 rounded-lg border ${uploadStep >= 2 ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-slate-800 text-slate-500'}`}>
                  2. Pub/Sub Event
                </div>
                <div className={`p-2.5 rounded-lg border ${uploadStep >= 3 ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-slate-800 text-slate-500'}`}>
                  3. Gemini AI
                </div>
                <div className={`p-2.5 rounded-lg border ${uploadStep >= 4 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-slate-800 text-slate-500'}`}>
                  4. DynamoDB
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Media History Table */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-slate-300 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-400" />
            Недавние записи в NoSQL DB
          </h2>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Файл</th>
                  <th className="p-4">Дата</th>
                  <th className="p-4">Длительность</th>
                  <th className="p-4">Статус</th>
                  <th className="p-4 text-right">Действие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {mockMeetingsList.map((meeting) => (
                  <tr key={meeting.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-4 font-medium text-white flex items-center gap-3">
                      <FileAudio className="w-5 h-5 text-blue-400 shrink-0" />
                      {meeting.filename}
                    </td>
                    <td className="p-4 text-slate-400 text-xs">
                      {new Date(meeting.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-slate-400 text-xs font-mono">
                      {meeting.duration}
                    </td>
                    <td className="p-4">
                      {meeting.status === 'completed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/meetings/${meeting.id}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition"
                      >
                        Открыть отчет
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}