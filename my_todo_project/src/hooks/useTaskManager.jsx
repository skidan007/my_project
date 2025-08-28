import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../components/ui/toaster';
import { ALARM_TONES } from '../constants/app';

const useTaskManager = (alarmToneUrl) => {
  const [tasks, setTasks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(alarmToneUrl);
      audio.loop = true;
      audioRef.current = audio;
    }
    audioRef.current.src = alarmToneUrl;
  }, [alarmToneUrl]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let hasActiveTask = false;

    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.isCompleted) return task;

        const [startHour, startMinute] = task.startTime.split(':').map(Number);
        const taskStartMinutes = startHour * 60 + startMinute;
        const taskEndMinutes = task.duration ? taskStartMinutes + task.duration : null;

        const isActiveNow = currentMinutes >= taskStartMinutes && (!task.duration || currentMinutes < taskEndMinutes);
        
        if (isActiveNow && !task.isActive && task.alarmEnabled) {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
          }
          toast.success(`Alarm for "${task.title}"! ⏰`);
        }
        
        if (taskEndMinutes !== null && currentMinutes >= taskEndMinutes && !task.isCompleted) {
          return { ...task, isOverdue: true };
        }
        
        if (isActiveNow) hasActiveTask = true;
        
        return { ...task, isActive: isActiveNow };
      });
      
      if (!hasActiveTask && audioRef.current) {
        audioRef.current.pause();
      }
      return updatedTasks;
    });

  }, [currentTime]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: uuidv4(),
      isCompleted: false,
      isActive: false,
      isOverdue: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const completeTask = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, isCompleted: true, isActive: false } : task
    ));
    if (audioRef.current) {
        audioRef.current.pause();
    }
  };

  const snoozeTask = (id) => {
      setTasks(prevTasks => {
          const snoozedTask = prevTasks.find(t => t.id === id);
          if (!snoozedTask) return prevTasks;

          const [startHour, startMinute] = snoozedTask.startTime.split(':').map(Number);
          const newTime = new Date();
          newTime.setHours(startHour);
          newTime.setMinutes(startMinute + 5); 

          const newStartTime = `${String(newTime.getHours()).padStart(2, '0')}:${String(newTime.getMinutes()).padStart(2, '0')}`;
          toast.success(`Snoozed "${snoozedTask.title}" for 5 minutes.`);
          
          return prevTasks.map(task => 
              task.id === id ? { ...task, startTime: newStartTime, isActive: false } : task
          );
      });
  };

  const getDailyStats = () => {
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const missedTasks = tasks.filter(t => t.isOverdue && !t.isCompleted).length;
    const totalTasks = tasks.length;
    const timeSpentByCategory = tasks.reduce((acc, task) => {
      if (task.isCompleted && task.duration) {
        acc[task.category] = (acc[task.category] || 0) + task.duration;
      }
      return acc;
    }, {});

    return {
      totalTasks,
      completedTasks,
      missedTasks,
      timeSpentByCategory,
    };
  };

  const getRandomQuote = () => {
    const quotes = [
      "The best way to get started is to quit talking and begin doing. - Walt Disney",
      "The secret of getting ahead is getting started. - Mark Twain",
      "Don’t count the days, make the days count. - Muhammad Ali",
      "The future depends on what you do today. - Mahatma Gandhi",
      "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const sortedTasks = tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
  const activeTask = sortedTasks.find(t => t.isActive && !t.isCompleted);
  const nextTaskIndex = activeTask ? sortedTasks.findIndex(t => t.id === activeTask.id) + 1 : 0;
  const nextTask = sortedTasks[nextTaskIndex];

  return {
    tasks,
    activeTask,
    nextTask,
    currentTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    addTask,
    completeTask,
    snoozeTask,
    getDailyStats,
    getRandomQuote,
  };
};

export { useTaskManager };