import { MeetingData } from '@/types/meeting';

export const mockMeetingsList: MeetingData[] = [
  {
    id: 'meeting-001',
    filename: 'Weekly_Sync_DevOps.mp3',
    createdAt: '2026-10-08T10:00:00Z',
    duration: '12:45',
    status: 'completed',
    summary: 'Обсудили архитектуру событийно-ориентированного конвейера медиаобработки. Утвердили разделение обязанностей между Cloud Engineer и Backend Developer.',
    actionItems: [
      { task: 'Развернуть VPC, S3 бакеты и IAM роли', assignee: 'DevOps Engineer', status: 'completed' },
      { task: 'Написать Lambda-функцию вызова Gemini API', assignee: 'Backend Engineer', status: 'in_progress' },
      { task: 'Настроить правила очистки S3 (Lifecycle Rule: 7 дней)', assignee: 'DevOps Engineer', status: 'pending' }
    ],
    decisions: [
      'Используем DynamoDB для хранения NoSQL метаданных',
      'Формат итогового отчета — JSON и Markdown'
    ],
    risks: [
      'Лимиты Free Tier на Gemini API при длительных транскрипциях'
    ],
    transcript: [
      { timestamp: '00:05', speaker: 'Спикер 1 (DevOps)', text: 'Всем привет! Я закончил набросок манифестов Terraform для VPC и S3.' },
      { timestamp: '00:42', speaker: 'Спикер 2 (Backend)', text: 'Отлично. Я подготовил промпт для Gemini API, который принимает транскрипт и выдает JSON.' }
    ]
  },
  {
    id: 'meeting-002',
    filename: 'Lecture_Cloud_Architecture.mp4',
    createdAt: '2026-10-07T14:30:00Z',
    duration: '45:10',
    status: 'completed',
    summary: 'Лекция по бессерверным архитектурам (Serverless) и паттерну Event-Driven Architecture.',
    actionItems: [
      { task: 'Подготовить схему взаимодействия Pub/Sub и Cloud Run', assignee: 'DevOps Engineer', status: 'completed' }
    ],
    decisions: [
      'Ограничить размер загружаемых файлов до 50MB'
    ],
    risks: [],
    transcript: [
      { timestamp: '00:00', speaker: 'Преподаватель', text: 'Сегодня мы разберем событийно-ориентированный подход в облаках.' }
    ]
  }
];