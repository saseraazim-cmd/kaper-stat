# КаперСтат — Telegram Mini App

Личный трекер футбольных и хоккейных ставок.

## 🚀 Запуск проекта

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для production
```bash
npm run build
```

## 📱 Telegram Mini App

Это приложение настроено для работы как Telegram Mini App.
SDK подключён в `index.html`.

## 🌐 Деплой на Vercel

1. Загрузи репозиторий на GitHub
2. Подключи к Vercel
3. Vercel автоматически соберёт и опубликует
4. Полученный URL добавь в BotFather (Mini App)

## 🔧 Структура

- `index.html` — точка входа с Telegram SDK
- `src/main.jsx` — инициализация React
- `src/App.jsx` — основное приложение (все разделы)
- `vite.config.js` — конфигурация сборки
- `vercel.json` — конфигурация деплоя
