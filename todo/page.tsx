'use client'
import { Trash2, Plus, Check } from 'lucide-react'
import React, { useState } from 'react'

const ToDo = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addInputToTodos = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false, id: Date.now() }])
      setInputValue('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addInputToTodos()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .todo-item {
          animation: slideIn 0.3s ease-out;
        }

        .checkmark-animate {
          animation: checkmark 0.3s ease-out;
        }

        .input-focus:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .btn-hover {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .btn-hover:active {
          transform: translateY(0);
        }

        .delete-btn {
          transition: all 0.2s ease;
          opacity: 0;
        }

        .todo-item:hover .delete-btn {
          opacity: 1;
        }

        .checkbox {
          transition: all 0.2s ease;
        }

        .checkbox:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">
            My Tasks
          </h1>
          <p className="text-slate-500">
            {todos.length === 0 
              ? "No tasks yet. Add one to get started!" 
              : `${todos.filter(t => !t.completed).length} active, ${todos.filter(t => t.completed).length} completed`
            }
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-6 bg-white rounded-2xl shadow-lg p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 bg-slate-50 border-2 border-transparent text-slate-800 px-4 py-3 rounded-xl text-base focus:outline-none focus:border-indigo-500 input-focus transition-all"
            />
            <button
              onClick={addInputToTodos}
              className="bg-indigo-600 text-white px-6 py-3 font-semibold text-base flex items-center justify-center gap-2 rounded-xl btn-hover hover:bg-indigo-700"
            >
              <Plus size={20} strokeWidth={2.5} />
              Add
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-slate-400 text-lg">
                Your task list is empty
              </div>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className={`todo-item bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 group hover:shadow-md transition-shadow ${
                  todo.completed ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className={`checkbox flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                    todo.completed
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300 bg-white hover:border-indigo-400'
                  }`}
                >
                  {todo.completed && (
                    <Check size={16} strokeWidth={3} className="text-white checkmark-animate" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-base font-medium break-words ${
                      todo.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-700'
                    }`}
                  >
                    {todo.text}
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn flex-shrink-0 text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ToDo
