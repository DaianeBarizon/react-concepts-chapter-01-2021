import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [errorMessageTitle, setErrorMessageTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (newTaskTitle.length <= 0) {
      setErrorMessageTitle('O título não pode ser vazio!')
      return
    }

    setErrorMessageTitle('')

    setTasks([...tasks, { id: Math.random(), title: newTaskTitle, isComplete: false }]);

    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const newArr = tasks.map(obj => {
      if (obj.id === id) {
        return {...obj, isComplete: true};
      }
    
      return obj;
    });

    setTasks(newArr)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Adicionar novo todo" 
              onFocus={() => setErrorMessageTitle('')}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
    
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff"/>
            </button>
          </div>

          <p>{errorMessageTitle}</p>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}