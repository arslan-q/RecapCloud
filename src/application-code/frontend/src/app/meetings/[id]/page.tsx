'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Search, 
  CheckSquare, 
  AlertTriangle, 
  Lightbulb, 
  FileText, 
  Download, 
  Send,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { mockMeetingsList } from '@/data/mockMeeting';

export default function MeetingDetailsPage() {
  const params = useParams();
  const meetingId = params.id as string;

  // Находим нужную встречу из mock-данных
  const meeting = mockMeetingsList.find((m) => m.id === meetingId) || mockMeetingsList[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionItems, setActionItems] = useState(meeting.actionItems || []);

  const toggleTask = (index: number) => {
    const updated = [...actionItems];
    updated[index].status = updated[index].status === 'completed' ? 'pending' : 'completed';
    setActionItems(updated);
  };

  const filteredTranscript = meeting.transcript?.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition flex items-center gap-2 text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в Дашборд
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                {meeting.filename}
              </h1>
              <p className="text-xs text-slate-400">
                Загружено: {new Date(meeting.createdAt).toLocaleString()} • Длительность: {meeting.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Экспорт в Markdown сохранен!')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium flex items-center gap-1.5 text-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              .MD Отчет
            </button>
            <button 
              onClick={() => alert('Отчет отправлен в Telegram!')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-medium flex items-center gap-1.5 text-white transition shadow-lg shadow-blue-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              В Telegram
            </button>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Player & Transcript (5/12 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Audio Player Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Воспроизведение записи
                </span>
                <span className="font-mono">00:42 / {meeting.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition shadow-md shadow-blue-500/20 shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="bg-blue-500 h-full w-1/3"></div>
                </div>
              </div>
            </div>

            {/* Transcript Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-[550px] flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Расшифровка (Speech-to-Text)
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Поиск по диалогу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500/50"
                />
              </div>

              {/* Dialogue Scroll List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
                {filteredTranscript?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-[11px]">
                      <span className="text-blue-400 font-sans font-medium flex items-center gap-1">
                        <User className="w-3 h-3" /> {item.speaker}
                      </span>
                      <span>{item.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: AI Insights (7/12 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* AI Summary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Аналитика Gemini API
              </div>
              <h2 className="text-base font-bold text-white">Краткое содержание (Executive Summary)</h2>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                {meeting.summary}
              </p>
            </div>

            {/* Action Items Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                Список поручений (Action Items)
              </h3>

              <div className="space-y-2">
                {actionItems?.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.status === 'completed'}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0"
                    />
                    <div className="flex-1 space-y-0.5">
                      <p className={`text-xs font-medium ${item.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {item.task}
                      </p>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full inline-block">
                        Ответственный: {item.assignee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions & Risks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Key Decisions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> Принятые решения
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {meeting.decisions?.map((decision, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                      <span className="text-emerald-500 font-bold">•</span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Risks */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Выявленные риски
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {meeting.risks && meeting.risks.length > 0 ? (
                    meeting.risks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                        <span className="text-amber-500 font-bold">•</span>
                        {risk}
                      </li>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">Риски не обнаружены</p>
                  )}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}