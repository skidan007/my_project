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
      <TabsList setActiveTab={setActiveTab}>{tabs}</TabsList>
      {content.map((c) =>
        React.cloneElement(c, {
          key: c.props.value,
          isActive: activeTab === c.props.value,
        })
      )}
    </div>
  );
};
const TabsList = ({ setActiveTab, children, className = "" }) => (
  <div
    className={`flex justify-around rounded-full bg-gray-100 p-1 ${className}`}
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        onClick: () => setActiveTab(child.props.value),
      })
    )}
  </div>
);
const TabsTrigger = ({ children, onClick, value, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex-1 p-2 rounded-full font-medium transition-colors  ${className}`}
  >
    {children}
  </button>
);
const TabsContent = ({ children, isActive, className = "" }) =>
  isActive ? <div className={className}>{children}</div> : null;

export { Tabs, TabsList, TabsTrigger, TabsContent };
