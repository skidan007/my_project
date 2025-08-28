export const TaskCategory = {
  PERSONAL: 'personal',
  WORK: 'work',
  FITNESS: 'fitness',
  STUDY: 'study',
  HOUSEHOLD: 'household',
  BREAK: 'break'
};

export const CATEGORY_ICONS = {
  [TaskCategory.PERSONAL]: '👨‍💼',
  [TaskCategory.WORK]: '💼',
  [TaskCategory.FITNESS]: '💪',
  [TaskCategory.STUDY]: '📚',
  [TaskCategory.HOUSEHOLD]: '🏡',
  [TaskCategory.BREAK]: '☕'
};

export const ALARM_TONES = [
  { name: 'Default', url: 'data:audio/wav;base64,UklGRl9PRUxCRgBWQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAgAAAAAAAAAAAAAAA=' },
  { name: 'Chime', url: 'https://cdn.pixabay.com/audio/2022/03/10/chime-1-5360.mp3' },
  { name: 'Electronic', url: 'https://cdn.pixabay.com/audio/2022/01/21/pop-up-1-6548.mp3' },
];