export const Tabs = ({ value, onValueChange, children }) => (
  <div className="flex justify-center space-x-4 border-b pb-2 mb-4">
    {children.map((tab) => (
      <div
        key={tab.props.value}
        className={`cursor-pointer text-lg font-medium ${
          tab.props.value === value ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
        }`}
        onClick={() => onValueChange(tab.props.value)}
      >
        {tab.props.label}
      </div>
    ))}
  </div>
);

export const Tab = ({ value, label }) => null;
