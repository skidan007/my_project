import React from 'react';

const Input = ({ id, type = 'text', value, onChange, placeholder, required = false, className = '', min, max, ...props }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    min={min}
    max={max}
    className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, children, className = '' }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Textarea = ({ id, value, onChange, placeholder, rows, className = '' }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Select = ({ value, onValueChange, children, className = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef(null);
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemSelect = (selectedValue) => {
    if (onValueChange) {
      onValueChange(selectedValue);
    }
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative" ref={selectRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${className} dark:bg-gray-800 dark:border-gray-700 dark:text-white`}
      >
        <span>{value}</span>
        <div className="flex items-center px-2 pointer-events-none">
          <svg 
            className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out origin-top dark:bg-gray-800 dark:border-gray-700 dark:text-white">
          {React.Children.map(children, (child) => {
            if (child.type === SelectContent) {
              return React.cloneElement(child, {
                onItemSelect: handleItemSelect
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ children }) => <>{children}</>;
const SelectValue = ({ children }) => <>{children}</>;
const SelectContent = ({ children, onItemSelect }) => (
  <div className="py-1 max-h-60 overflow-y-auto">
    {React.Children.map(children, (child) => {
      if (child.type === SelectItem) {
        return React.cloneElement(child, {
          onItemSelect: onItemSelect
        });
      }
      return child;
    })}
  </div>
);
const SelectItem = ({ children, value, onSelect, onItemSelect }) => (
  <div 
    className="px-3 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-200 dark:hover:bg-blue-900"
    onClick={() => {
      if (onSelect) onSelect(value);
      if (onItemSelect) onItemSelect(value);
    }}
  >
    {children}
  </div>
);

const Switch = ({ id, checked, onCheckedChange, className = '' }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${checked ? 'bg-blue-600' : 'bg-gray-200'} ${className}`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

export { Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Switch };