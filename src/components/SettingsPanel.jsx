import { useState, useEffect } from 'react';

const SettingsPanel = ({ node, onTextChange, onClose }) => {
  const [text, setText] = useState(node?.data?.text || '');

  useEffect(() => {
    setText(node?.data?.text || '');
  }, [node]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="relative border-b border-gray-200 py-3">
        <button
          onClick={onClose}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-center text-sm font-medium text-gray-800">Message</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-3">
        <label className="block text-xs text-gray-400">Text</label>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
