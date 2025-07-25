import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import CustomNode from './CustomNode';

const nodeTypes = { textNode: CustomNode };

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const { screenToFlowPosition, addNodes } = useReactFlow();

  // When a node is clicked, open its settings
  const onNodeClick = (event, node) => setSelectedNode(node);

  // Deselect node when clicking on empty canvas
  const onPaneClick = () => setSelectedNode(null);

  // Allow only one outgoing edge per source handle
  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find((edge) => edge.source === params.source);
      if (existingEdge) return;

      setEdges((eds) =>
        addEdge(
          { ...params, markerEnd: { type: MarkerType.ArrowClosed } },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  const onEdgesDelete = (edgesToDelete) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.includes(edge)));
  };

  // Add new node from panel drag-drop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNodes({
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { text: `Message ${nodes.length + 1}` },
      });
    },
    [screenToFlowPosition, addNodes, nodes.length]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Update text for the currently selected node
  const onTextChange = (text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode?.id
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  };

  // Save flow with simple validation
  const handleSave = () => {
    if (nodes.length < 2) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    const nodesWithNoOutgoingEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );

    if (nodesWithNoOutgoingEdges.length > 1) {
      setSaveStatus('error');
      return;
    }

    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className="border-b bg-white pt-4 px-4 grid grid-cols-3 items-center"
        style={{ minHeight: '60px' }}
      >
        <div className="ml-4"></div>

        <div className="flex justify-center">
          {saveStatus === 'saved' && (
            <span className="px-2 py-2 bg-green-100 text-black-600 border border-green-100 rounded-lg text-sm font-medium">
              Flow saved successfully
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="px-2 py-2 bg-red-100 text-black border border-red-100 rounded-lg text-sm font-medium">
              Cannot save Flow
            </span>
          )}
        </div>

        <div className="flex justify-end mr-14 pb-2">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-bold text-blue-600 border border-blue-600 rounded-md transition-colors hover:bg-blue-50 hover:border-blue-400 hover:ring-2 hover:ring-blue-300"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Flow Canvas + Settings Panel */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode={['Backspace', 'Delete']}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <div className="w-64 border-l border-gray-200 bg-gray-50 flex flex-col">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onTextChange={onTextChange}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <FlowBuilder />
  </ReactFlowProvider>
);
