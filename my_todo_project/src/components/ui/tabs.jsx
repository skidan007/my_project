import React, { useState } from "react";

const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabs = React.Children.toArray(children).find((c) => c.type === TabsList)
    ?.props.children;
  const content = React.Children.toArray(children).filter(
    (c) => c.type === TabsContent
  );

  return (
    <div className={className}>
      <TabsList setActiveTab={setActiveTab} activeTab={activeTab}>{tabs}</TabsList>
      {content.map((c) =>
        React.cloneElement(c, {
          key: c.props.value,
          isActive: activeTab === c.props.value,
        })
      )}
    </div>
  );
};
const TabsList = ({ setActiveTab, activeTab, children, className = "" }) => (
  <div
    className={`flex justify-center rounded-full bg-gray-800 p-1 ${className}`}
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        onClick: () => setActiveTab(child.props.value),
        isActive: activeTab === child.props.value,
      })
    )}
  </div>
);
const TabsTrigger = ({ children, onClick, value, isActive, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-2 rounded-full font-medium transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-400' : 'text-gray-300 hover:text-white'} ${className}`}
  >
    {children}
  </button>
);
const TabsContent = ({ children, isActive, className = "" }) =>
  isActive ? (
    <div className={`transition-all duration-300 ease-in-out transform ${className}`}>
      {children}
    </div>
  ) : null;

export { Tabs, TabsList, TabsTrigger, TabsContent };
