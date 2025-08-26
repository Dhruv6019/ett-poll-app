import { useState, useEffect } from 'react';

const POLL_STORAGE_KEY = 'pollData';

const getPollData = (pollType) => {
  const defaultData = {
    frontend: {
      options: [
        { id: "react", title: "React", description: "JavaScript library for building user interfaces", votes: 245, color: "hsl(193, 95%, 68%)" },
        { id: "vue", title: "Vue.js", description: "Progressive framework for building UIs", votes: 189, color: "hsl(153, 47%, 49%)" },
        { id: "angular", title: "Angular", description: "Platform for building mobile and desktop apps", votes: 156, color: "hsl(348, 86%, 61%)" },
        { id: "svelte", title: "Svelte", description: "Cybernetically enhanced web apps", votes: 87, color: "hsl(15, 100%, 50%)" }
      ]
    },
    backend: {
      options: [
        { id: "nodejs", title: "Node.js", description: "JavaScript runtime built on Chrome's V8", votes: 312, color: "hsl(120, 100%, 25%)" },
        { id: "python", title: "Python", description: "High-level programming language", votes: 298, color: "hsl(55, 100%, 50%)" },
        { id: "java", title: "Java", description: "Object-oriented programming language", votes: 201, color: "hsl(25, 100%, 50%)" },
        { id: "csharp", title: "C#", description: "Modern language by Microsoft", votes: 167, color: "hsl(280, 100%, 50%)" }
      ]
    },
    devtools: {
      options: [
        { id: "vscode", title: "VS Code", description: "Free source-code editor by Microsoft", votes: 423, color: "hsl(210, 100%, 60%)" },
        { id: "webstorm", title: "WebStorm", description: "Powerful IDE for JavaScript development", votes: 156, color: "hsl(45, 100%, 50%)" },
        { id: "vim", title: "Vim/Neovim", description: "Highly configurable text editor", votes: 134, color: "hsl(120, 50%, 40%)" },
        { id: "sublime", title: "Sublime Text", description: "Sophisticated text editor", votes: 89, color: "hsl(30, 100%, 50%)" }
      ]
    }
  };
  
  const storageKey = `poll_${pollType}`;
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  return defaultData[pollType] || { options: [] };
};

const usePollData = (pollType) => {
  const [pollData, setPollData] = useState(() => {
    return getPollData(pollType);
  });

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === `poll_${pollType}`) {
        setPollData(getPollData(pollType));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pollType]);

  // Poll for changes every 2 seconds as fallback
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getPollData(pollType);
      if (JSON.stringify(newData) !== JSON.stringify(pollData)) {
        setPollData(newData);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [pollType, pollData]);

  const updateVotes = (optionId) => {
    setPollData(prev => {
      const newData = {
        ...prev,
        options: prev.options.map(option => 
          option.id === optionId 
            ? { ...option, votes: option.votes + 1 }
            : option
        )
      };

      // Update localStorage
      const storageKey = `poll_${pollType}`;
      localStorage.setItem(storageKey, JSON.stringify(newData));

      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent('pollUpdate', { detail: { pollType, data: newData } }));

      return newData;
    });
  };

  const resetPoll = () => {
    const defaultData = getPollData(pollType);
    const resetData = {
      ...defaultData,
      options: defaultData.options.map(option => ({ ...option, votes: 0 }))
    };
    
    setPollData(resetData);
    
    const storageKey = `poll_${pollType}`;
    localStorage.setItem(storageKey, JSON.stringify(resetData));
    
    window.dispatchEvent(new CustomEvent('pollUpdate', { detail: { pollType, data: resetData } }));
  };

  const totalVotes = pollData.options.reduce((sum, option) => sum + option.votes, 0);

  return {
    options: pollData.options,
    totalVotes,
    updateVotes,
    resetPoll
  };
};

export default usePollData;