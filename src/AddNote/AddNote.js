import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import config from '../config'

export default class AddNote extends Component {
  static defaultProps = {
    folders: [],
  }

  handleAddNote = (e) => {
    e.preventDefault()
    const newNote = {
      title: e.target['title'].value,
      content: e.target['content'].value,
      folderid: e.target['folderid'].value
    }
    fetch(`${config.API_ENDPOINT}note`,{ 
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`},
      body: JSON.stringify(newNote)
    })
    .then(res => {
      if (!res.ok) {
      throw new Error(res.status)
    }
      return res.json()
    })
    .then(note => {
      this.props.handleAddNote(note)
      this.props.history.push(`/note/${note.id}`)
    })
    .catch(error => {
      console.log({error})
    })
    
  }

  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleAddNote(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='title'/> 
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='content' /> 
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='folderid'> 
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.title}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
