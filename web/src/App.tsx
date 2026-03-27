import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { TaskList } from './components/TaskList'
import { TaskForm } from './components/TaskForm'
import type { Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('sygg-tasks')
    return saved ? JSON.parse(saved) : []
  })
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    localStorage.setItem('sygg-tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id ? { ...t, ...taskData } : t
      ))
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: Date.now() 
      }
      setTasks([...tasks, newTask])
    }
  }

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setTasks(tasks.filter(t => t.id !== id))
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const openNewTaskModal = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content font-sans">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-base-300 pb-6 mt-8">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-br from-primary to-accent text-transparent bg-clip-text mb-2 tracking-tight">
              Sygg Dashboard
            </h1>
            <p className="text-base-content/70 font-medium text-lg">Manage your recurring goals and wallpaper integration.</p>
          </div>
          
          <button 
            onClick={openNewTaskModal}
            className="btn btn-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all text-white font-bold"
          >
            <Plus size={20} className="mr-1" />
            New Goal
          </button>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="stat bg-base-100 shadow rounded-2xl border border-base-200">
            <div className="stat-title font-semibold text-base-content/60">Active Goals</div>
            <div className="stat-value text-primary font-bold">{tasks.length}</div>
            <div className="stat-desc">Tracking your daily progress</div>
          </div>
          {/* We will add more stats here in the future like Wallpapers Generated */}
        </div>

        {/* Main Content */}
        <main>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Goals</h2>
          </div>
          
          <TaskList 
            tasks={tasks} 
            onEdit={handleEditTask} 
            onDelete={handleDeleteTask} 
          />
        </main>
      </div>

      <TaskForm 
        key={isFormOpen ? (editingTask?.id || 'new') : 'closed'}
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  )
}

export default App
