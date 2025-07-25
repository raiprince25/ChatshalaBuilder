import { useState } from 'react'

const SaveButton = ({ nodes, edges, onSaveStatus }) => {
  const [localError, setLocalError] = useState(null)
  const [localSuccess, setLocalSuccess] = useState(false)

  const handleSave = () => {
    setLocalSuccess(false)
    setLocalError(null)
    if (nodes.length === 0) {
      onSaveStatus('saved')
      setLocalSuccess(true)
      return
    }

    const nodesWithNoOutgoingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    )

    if (nodesWithNoOutgoingEdges.length > 1) {
      setLocalError('Cannot save Flow')
      onSaveStatus('error')
      return
    }

    onSaveStatus('saved')
    setLocalSuccess(true)
  }

  return (
    <div className="flex items-center w-full bg-white border-b border-gray-200 p-2">
      <div className="flex-1"></div>

      {/* Centered Status Card */}
      <div className="flex-1 flex justify-center">
        {(localError || localSuccess) && (
          <div
            className={`px-4 py-1 rounded-md font-bold text-sm ${
              localError
                ? 'bg-red-100 text-red-400 border border-red-200'
                : 'bg-green-100 text-green-400 border border-green-200'
            }`}
          >
            {localError || 'Flow saved successfully'}
          </div>
        )}
      </div>

      {/* Right Side - Save Button */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>

  )
}

export default SaveButton
