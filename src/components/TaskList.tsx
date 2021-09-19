import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';


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
  const [controlField, setControlField] = useState(false);
  const [controlFieldText, setControlFieldText] = useState(false);
  const [controlChangeCheck, setControlChangeCheck] = useState(false);

  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle == ''){
      setControlField(true);
      setControlFieldText(false);
    }else{
      let title;
      tasks.map(task =>(
        title = task.title
      ))

      if(title === newTaskTitle){
        setControlFieldText(true);
        setControlField(false);
      }else{
        setControlField(false);
        setControlFieldText(false);
        let objTasks = {
          id: Math.floor(Math.random() * 100 + 1),  
          title: newTaskTitle,
          isComplete: false  
        }
        setTasks([...tasks, objTasks]);
        setNewTaskTitle('');
      }  
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const arrayTask = [...tasks];
   
    arrayTask.map((index) =>{
      if(index.id == id && index.isComplete === false){
        index.isComplete = true;
        setControlChangeCheck(true);
      }else if(index.id == id && index.isComplete === true){
        index.isComplete = false;
        setControlChangeCheck(false);
      }
    })
    setTasks(arrayTask)
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const array = [...tasks]; 
    const newTasks = array.filter((array) => array.id !== id);
    setTasks(newTasks);
  }


  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>
      {controlField &&
        <Alert variant="danger">Por favor informe uma task! </Alert>
      }

      {controlFieldText &&
        <Alert variant="danger"> Já existe uma task com o mesmo titulo!! </Alert>
      }
      
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