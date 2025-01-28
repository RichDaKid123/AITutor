import { PlusCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-6">
          <PlusCircle className="w-16 h-16 text-blue-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Start Building Your App
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          This is your blank canvas. Begin creating something amazing by editing <code className="bg-slate-100 px-2 py-1 rounded text-sm">src/App.tsx</code>
        </p>
      </div>
    </div>
  );
}

export default App;