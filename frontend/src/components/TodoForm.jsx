import React, { useState } from 'react'
import axios from 'axios'
const TodoForm = (setTodos) => {

  const [newTodo, setNewTodo] = useState({
    'body': ''
})

const handleChange = (e) => {
  setNewTodo(prev => ({
    ...prev,
    'body': e.target.value
  }))
  console.log(newTodo)
}

const postData = async () => {
  try {
    await axios.post( 'http://127.0.0.1:8000/apitodo/' , newTodo)
    setNewTodo({ 'body' : ''})
    setTodos.fetchData() 
  } catch(error) {
    console.log(error);
  }
}


  return (
    <div>
      <input type = "text" placeholder = "Add Todos" className = "input input-ghost w-full max-w-xs" onChange={handleChange} value = {newTodo.body}/>
      <button className = "btn btn-primary ml-3" onClick={postData}>Add</button>
    </div>
  )
}

export default TodoForm