import React from 'react'

const AddPerson = (props) => {
  return ( 
    <form onSubmit={props.addPerson}>
      <div>
        name: <input 
          value={props.newName} 
          onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input 
          value={props.newNbr} 
          onChange={props.handleNbrChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddPerson
