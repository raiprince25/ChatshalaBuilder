import { ReactFlowProvider } from 'reactflow'
import FlowBuilder from './components/FlowBuilder'

function App() {
  return (
    <div className="h-screen w-full">
      <ReactFlowProvider>
        <FlowBuilder />
      </ReactFlowProvider>
    </div>
  )
}

export default App