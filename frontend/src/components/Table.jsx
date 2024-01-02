import axios from 'axios'
import React, { useState } from 'react'
import {MdCheckBox, MdDelete, MdFactCheck, MdEditNote, MdDeleteOutline, MdCheckBoxOutlineBlank} from 'react-icons/md'

const Table = (todo) => {

  const [editText, setEditTex] = useState({
    'body' : ''
  })

  const handleDelete = async(id) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/apitodo/${id}/`);
        const newList = todo.todo.filter( item => item.id != id)
        todo.setTodos(newList);
      } catch (error) {
        console.log(error);
      }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/apitodo/${id}/`, value);
      const newTodos = todo.todo.map(item => item.id === id ? response.data : item);
      todo.setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckBox =  (id,value) => {
    handleEdit(id , {
      'completed' : !value 
    })
  }

  const handleChange = (e) => {
    setEditTex( prev => ({
      ...prev, 'body': e.target.value
    }));
    console.log(editText);
  }

  return (
    <div className='py-10'>
      <table className=' w-11/12 max-w-4xl'>
        <thead className='border-b-2 border-black'>
          <tr>
            <td className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left'>Status</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left'>Date Created</td>
            <td className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {todo.isLoading ? <div>Data is loading</div> : <> 
          { todo.todo.map((TodoItems, index) => {
              return (
              <tr key = {TodoItems.id} className='text-black border-b border-black'>
                <td className='p-3'>
                <span onClick = { () => handleCheckBox(TodoItems.id, TodoItems.completed) }
                className = 'inline-block cursor-pointer'> {TodoItems.completed?<MdCheckBox/>: <MdCheckBoxOutlineBlank/>} </span>
                </td>
                <td className='p-3 text-sm'>{TodoItems.body}</td>
                <td className='p-3 text-sm'>
                  {TodoItems.completed ? <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300'> Done </span> : <span className='p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300'> Incomplete </span> }
                </td>
                <td className='p-3 text-sm'> {TodoItems.created}</td>
                <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-4'>
                    <label htmlFor="my_modal_6" className="" onClick={() => setEditTex(TodoItems)}> 
                      <span className=' text-xl inline-block cursor-pointer'><MdEditNote/></span>
                    </label>    
                    
                    <span className=' text-xl inline-block cursor-pointer'><MdDeleteOutline onClick={ () => handleDelete(TodoItems.id)} /></span>
                </td>
              </tr>
              )
            })} </> }
        </tbody>
      </table>



      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Modal</h3>
          <input type="text" value={editText.body} onChange = {handleChange} className="input input-bordered w-full mt-5" />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-primary" onClick={() => handleEdit(editText.id,editText)}>Edit</label>
            <label htmlFor="my_modal_6" className="btn">Close!</label>
          </div>
        </div>
      </div>

    </div>
  )
} 

export default Table