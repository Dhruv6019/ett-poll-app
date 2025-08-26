# ETT Poll Application

A modern, real-time polling application built with React and Vite, featuring live synchronization across multiple browser tabs and instant vote updates.

## 🚀 Features

### Core Functionality
- **Real-time Synchronization**: Votes are synchronized instantly across all open browser tabs
- **Cross-tab Communication**: Changes in one tab reflect immediately in all other tabs
- **Persistent Data**: Poll data persists across browser sessions using localStorage
- **Multiple Poll Categories**: Separate polls for Frontend, Backend, and DevTools topics
- **Interactive Results**: Dynamic charts showing vote distribution and percentages
- **Responsive Design**: Optimized for desktop and mobile devices

### Technical Features
- **Centralized State Management**: Custom `usePollData` hook for consistent data handling
- **Local Storage Integration**: Automatic data persistence and retrieval
- **Event-driven Updates**: Efficient state updates using custom events
- **Type-safe Components**: Built with modern React patterns and best practices
- **Performance Optimized**: Minimal re-renders and efficient state updates

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: Custom hooks with Context pattern
- **Storage**: Browser localStorage API

## 📁 Project Structure

```
ett-poll-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FrontendPoll.jsx
│   │   ├── BackendPoll.jsx
│   │   ├── DevToolsPoll.jsx
│   │   ├── ResultsChart.jsx
│   │   └── ui/             # Shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   │   └── usePollData.js  # Core polling logic
│   ├── pages/              # Route-based page components
│   │   ├── FrontendPollPage.jsx
│   │   ├── BackendPollPage.jsx
│   │   ├── DevToolsPollPage.jsx
│   │   └── ResultsPage.jsx
│   └── lib/               # Utility functions
├── public/                # Static assets
└── package.json
```

## 🎯 Poll Categories

### Frontend Technologies
- React
- Vue.js
- Angular
- Svelte

### Backend Technologies
- Node.js
- Python/Django
- Java/Spring
- Go

### DevOps & Tools
- Docker
- Kubernetes
- Jenkins
- GitHub Actions

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhruv6019/ett-poll-app.git
   cd ett-poll-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🧪 Testing Real-time Features

1. **Open multiple browser tabs** of the application
2. **Cast votes** in any poll category
3. **Observe synchronization** - changes appear instantly across all tabs
4. **Test persistence** - close and reopen the browser, data remains intact

## 🎨 Customization

### Adding New Poll Categories
1. Create a new poll component in `src/components/`
2. Add corresponding route in `src/pages/`
3. Update navigation in `src/components/Navbar.jsx`

### Modifying Poll Options
Edit the options array in each poll component:
```javascript
const options = [
  { id: 'option1', label: 'Option Name', votes: 0 },
  // Add more options...
];
```

### Styling Customization
- Modify Tailwind classes in component files
- Update theme configuration in `tailwind.config.js`
- Customize color schemes in `src/index.css`

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Static Hosting
The built files in `dist/` can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhruv Teli**
- GitHub: [@Dhruv6019](https://github.com/Dhruv6019)
- Email: dhruvteli.dev@gmail.com

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide React](https://lucide.dev/)