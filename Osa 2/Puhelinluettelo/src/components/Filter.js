import React from 'react'

const Filter = (props) => {
  return ( 
    <form onSubmit={props.filter}>
      <div>
        Filter names: <input 
          value={props.newFilter} 
          onChange={props.handleFilter} />
      </div>
    </form>
  )
}

export default Filter
