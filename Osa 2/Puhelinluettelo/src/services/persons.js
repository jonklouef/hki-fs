import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons' //'/api/persons'  

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newPerson = (newPerson) => { 
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const newNumber = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

const removePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data.persons) 
}

const service = { getAll, newPerson, newNumber, removePerson }
export default service
