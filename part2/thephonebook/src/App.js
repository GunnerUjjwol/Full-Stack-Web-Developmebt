import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({message, messageType}) => {
  if (message === null) {
    return null
  }
  if(messageType === 'success'){
    return (
      <div className="success">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
}
const Filter = ({filterValue, filterChanged}) => (
  <div>
    filter shown with: <input value={filterValue} onChange={filterChanged}/>
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.name} onChange={props.nameChanged}/>
    </div>
    <div>
      number: <input value={props.number} onChange={props.numberChanged}/>
    </div>
    <div>
      <button type="submit" >add</button>
    </div>
  </form>
  )

const Persons = (props) => (
  <div>
    {props.personsToShow.map(person => 
      <Person key={person.name} person={person} persons = {props.persons} setPersons = {props.setPersons} />)}
  </div>
)



const Person = (props) => {
  const handleDelete= (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
        personService
          .deletePerson(personToDelete.id)
          .then(response => {
            props.setPersons(props.persons.filter(person => person.id !== personToDelete.id))
            
          })
    }
  }
  return (
  <p>{props.person.name} {props.person.number} <button onClick={() => handleDelete(props.person)}>delete</button></p>
  )}


const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
      setPersons(allPersons)
    })
  },[])

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageType, setMessageType ] = useState('success')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterValueChange = event => {
    setFilterValue(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).includes(newName)){
      const personToUpdate = persons.find(person => person.name === newName)
      if(personToUpdate.number !== newNumber) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const changedPerson = {...personToUpdate, number: newNumber}
          personService
            .update(personToUpdate.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personToUpdate.id ?
                person : returnedPerson))
                setMessage(`Updated number of ${newName}`)
                setMessageType('success')
                setTimeout(() => {
                  setMessage(null)
                }, 3000)
        
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
              setMessage(`Information of ${newName} has already been removed from server`)
              setMessageType('error')
              setTimeout(() => {
                setMessage(null)
              }, 3000)
            })
        }
      } else {
        setMessage(`${newName} is already added to phonebook`)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`Added ${newName}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setNewName('');
          setNewNumber('');
        })
    }
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} messageType={messageType}/>
      <Filter filterValue = {filterValue} filterChanged={handleFilterValueChange}/>
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber}  addPerson={addPerson}
      nameChanged={handleNameInputChange} numberChanged = {handleNumberInputChange}/> 
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App