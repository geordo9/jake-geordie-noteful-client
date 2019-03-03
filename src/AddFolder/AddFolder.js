import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import config from '../config'

export default class AddFolder extends Component {

handleAddFolder = (e) => {
  e.preventDefault()
  const newFolder = {
    title: e.currentTarget['folder'].value
  }
  fetch(`${config.API_ENDPOINT}folder`,{ 
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'Authorization': `Bearer ${config.API_KEY}`},
    body: JSON.stringify(newFolder)
  })
  .then(res => {
    if (!res.ok) {
    throw new Error(res.status)
  }
    return res.json()
  })
  .then(folder => {
    this.props.handleAddFolder(folder)
    this.props.history.push(`/folder/${folder.id}`)
  })
  .catch(error => {
    console.log({error})
  })
  
  console.log(newFolder)
}

  render() {
    
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleAddFolder}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
