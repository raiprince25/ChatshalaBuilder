import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div
        className="flex flex-col items-center justify-center p-2 w-40 border border-gray-400 rounded-md bg-white cursor-grab hover:shadow-md hover:bg-gray-50 active:cursor-grabbing transition"
        draggable
        onDragStart={(event) => onDragStart(event, 'textNode')}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-indigo-600 mb-2" />
        <span className="text-sm font-medium text-indigo-700">Message</span>
      </div>
    </div>
  )
}

export default NodesPanel
