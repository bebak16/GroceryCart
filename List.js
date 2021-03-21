import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items, removeItem, editItem}) => {
 
  return <div className ='grocery-list'>
    <ol>
    {items.map((item) => {
      const {id, title} = item;
      return <article key ={id} className='grocery-item'>
        <p className="title">
           <li>{title}</li> </p>
        <div className='btn-container'>
          <button type='button' className='edit-btn' onClick = {() => editItem(id)}> 
          <FaEdit/>
          </button>
          <button type='button' className='delete-btn' onClick = {() => removeItem(id)}> 
          <FaTrash/>
          </button>
        </div>
      </article>
    })} </ol>
  </div>
}

export default List