import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-5xl font-extrabold bg-gradient-to-br from-primary to-accent text-transparent bg-clip-text mb-4 transition-all hover:scale-105">
            Sygg
          </h2>
          <p className="text-base-content/70 mb-8 font-medium">See Your Goals Grow</p>
          <div className="card-actions">
            <button 
              className="btn btn-primary shadow-lg hover:shadow-primary/50 transition-all font-bold"
              onClick={() => setCount((count) => count + 1)}
            >
              Goals Tracked: {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
