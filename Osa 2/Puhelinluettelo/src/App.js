import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNbr, setNewNbr] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState([null])

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        setNotification([`${error}`, "err"])
        setTimeout(() => {
          setNotification([null, "err"])
        }, 4000)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNbrChange = (event) => {
    setNewNbr(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filter = (event) => {
    event.preventDefault()
    setNewFilter('')   
  }

  const addPerson = (event) => {
    event.preventDefault()
    const findName = persons.find(person => person.name === newName)
    const newPerson = {
      name : newName,
      number : newNbr
    }
    if (findName && window.confirm(`${newName} is already in the phonebook. Do you want to update the number?`)) { 
      const id = findName.id
      personService
        .newNumber(id, newPerson)
        .then(newPerson => {
          setPersons(persons.map(person => person.id !== id ? person : newPerson),
          setNotification([`Number updated for ${newName}`, "note"]),
          setTimeout(() => {
            setNotification([null, "note"])
          }, 4000))
        })
        .catch(error => {
          setNotification([`${error}`, "err"])
          setTimeout(() => {
            setNotification([null, "err"])
          }, 4000)//}
        })
    } else {
      personService
        .newPerson(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson),
          setNotification([`Added ${newName}`, "note"]),
          setTimeout(() => {
            setNotification([null, "note"])
          }, 4000))
        })
        .catch(error => {
            if (error.response){
                setNotification([`${error.response.data}`, "err"])
                    setTimeout(() => {
                    setNotification([null, "err"])
                }, 4000)
            } else if (error.request) {
                setNotification([`${error.request}`, "err"])
                    setTimeout(() => {
                    setNotification([null, "err"])
                }, 4000)
            console.log(error.request)
            } else {
                setNotification([`${error}`, "err"])
                    setTimeout(() => {
                    setNotification([null, "err"])
                }, 4000)
            }
        })
    }
    setNewName('')
    setNewNbr('')
  }

  const removePersons = (id) => {
    const delPerson = persons.find(person => person.id === id)
    const delName = delPerson.name
    const update = persons.filter(person => person.id !== id)
    personService
      .removePerson(id)
      .then(setPersons(update), setNotification([`${delName} deleted`, "note"]),
        setTimeout(() => {
          setNotification([null, "note"])
        }, 4000))
      .catch(error => {
        console.log(error.message)
        if (error.message === 'Request failed with status code 404') {
          setNotification([`'${delPerson.name}' has already been deleted`, "err"])
              setTimeout(() => {
              setNotification([null, "err"])
          }, 4000)
        } else { // remove 'if' for part 3?
        setNotification([`${error}`, "err"])
        setTimeout(() => {
          setNotification([null, "err"])
        }, 4000)
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>  
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} filter={filter} />
      
      <h3>Add a new</h3>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNbr={newNbr} handleNbrChange={handleNbrChange} />
      
      <h3>Numbers</h3>
      <Phonebook persons={persons} newFilter={newFilter} addPerson={addPerson} removePersons={removePersons} />
    </div>
  )

}

export default App
