import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if(list)
  { return JSON.parse(list); } 
  else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter item in cart", "danger")
    }
    else if (name && isEditing) {
      setList(list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name }
        }
        return item;
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "Item Edited Successfully", 'success')
    }
    else {
      showAlert(true, "Item Added in the cart", 'success')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('');
    }
  }
  const showAlert = (show = false, message = '', type = '') => {
    setAlert({ show, msg: message, type: type })
  }
  const clearList = () => {
    showAlert(true, 'All items are cleared', 'success');
    setList([]);
  }
  const removeItem = (id) => {
    showAlert(true, 'item Removed from cart', 'danger');
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  }
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  } , [list])
  
  return <section className="section-center">
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}

      <h2>Grocery Cart</h2> <br></br><br></br>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="Enter items in cart, i.e. eggs"
          value={name} onChange={(e) => setName(e.target.value)} />

        <button type="submit" className="submit-btn" >
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} list={list} />
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
      </div>
    )}
  </section>
}

export default App
