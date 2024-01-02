import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import TodoForm from './components/TodoForm'
import Table from './components/Table'

function App() {

  const [todo, setTodos] = useState("");
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/apitodo/');
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className = 'bg-indigo-100 px-8 min-h-screen'>
      <nav className = 'py-8'>  
        <h1 className = 'text-5xl text-center'>ToDO List </h1>
      </nav>
      <TodoForm 
        setTodos = {setTodos}
        fetchData = {fetchData}
      /> 
      <Table 
        todo = {todo}
        setTodos = {setTodos}
        isLoading = {isLoading}
      />
    </div>
  )
}

export default App
