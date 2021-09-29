import React from 'react'

const Phonebook = (props) => {
  const {persons, newFilter, removePersons} = props
  if (newFilter === '') {
   return (
    <table>
      <tbody>
        {
          persons.map(person => (
            <tr key={person.id}>
              <td width="150">
                {person.name}
              </td>
              <td>
                {person.number}
              </td>
              <td>
                <button onClick={() => {if (window.confirm(`Delete ${person.name}?`)) {
                                            removePersons(person.id)
                                          };}}>Delete</button>
              </td>
            </tr>
          )) 
        }  
      </tbody>
    </table>
  )
  } else {
    return (
      <table>
        <tbody>
          { 
            persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => 
              <tr key={person.id}>
                <td width="150">
                  {person.name}
                </td>
                <td>
                  {person.number}
                </td>
                <td>
                <button onClick={() => {if (window.confirm(`Delete ${person.name}?`)) {
                                          removePersons(person.id)
                                        };}}>Delete</button>
                </td>
              </tr>
            ) 
          }  
        </tbody>
      </table>
    )
  }
}

export default Phonebook
