import { useState , useEffect } from 'react'
import "./index.css"
function App() {
  const [newItem , setNewItem] = useState('')
  const [todos , setTodos] = useState(localStorage.getItem('items') === null ? [] 
                                      : JSON.parse(localStorage.getItem('items'))
                                    )
  
  useEffect(()=>{
    localStorage.setItem("items" , JSON.stringify(todos))
  } , [todos])

  function handleSubmit(e){
    e.preventDefault()
    setTodos(currentTodo =>{
      return [
        ...currentTodo ,
        {
          title: newItem,
          id:crypto.randomUUID(),
          completed:false
        }
      ]
    })
    setNewItem('')
  }
  function toggleChecked(id , completed){
    setTodos(currentTodo =>{
      return  currentTodo.map(todo=>todo.id === id ? {...todo , completed} : todo)
    })
  }
  function deleteTodo(id){
    setTodos(currentTodo =>{
      return  currentTodo.filter(todo=>todo.id !== id )
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className="form-row">
          <label htmlFor="item">new Task</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id='item'/>
          <button className='btn' >Create</button>
        </div>
      </form>
      <h1>Task Management App</h1>
      
      {todos.map(todo =>{
        return (
          <ul className='list'>
            <li >
              <label >
                <input onClick={e=> toggleChecked(todo.id , e.target.checked)}  type="checkbox" checked={todo.completed} />
                {todo.title}
              </label>
              <button onClick={()=>deleteTodo(todo.id)}  className='btn btn-danger'>delete</button>
            </li>
          </ul>
        )
      })}
    </>
  )
}

export default App
