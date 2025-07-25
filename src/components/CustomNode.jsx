import { Handle } from 'reactflow';
import { LockClosedIcon } from '@heroicons/react/20/solid';

const CustomNode = ({ data, selected }) => {
  return (
    <div
      className={`rounded-lg shadow-lg border bg-white overflow-hidden ${
        selected ? 'ring-2 ring-blue-300 border-blue-400' : 'border-gray-200'
      }`}
      style={{ minWidth: '220px', maxWidth: '250px' }} // Max width to control wrapping
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-100 px-3 py-2">
        <div className="flex items-center space-x-2">
          <LockClosedIcon className="h-3 w-3" />
          <span className="font-semibold text-gray-800 text-sm">
            Send Message
          </span>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="icon"
          className="h-4 w-4"
        />
      </div>

      {/* Message Content with wrapping */}
      <div className="px-3 py-2 text-sm text-gray-700 break-words whitespace-pre-wrap">
        {data.text || 'No message'}
      </div>

      {/* React Flow Handles */}
      <Handle
        type="target"
        position="left"
        className="!bg-gray-400 !h-2 !w-2 !-left-1"
      />
      <Handle
        type="source"
        position="right"
        className="!bg-gray-400 !h-2 !w-2 !-right-1"
      />
    </div>
  );
};

export default CustomNode;
