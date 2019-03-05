import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import config from '../config'
import Note from '../Note/Note'

import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  setNoteful = noteful => {
    this.setState({
      notes: noteful.notes,
      folders: noteful.folders
    })
  }
  handleDeleteNote = (noteToDelete) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteToDelete)
    })
  }
  handleAddNote = (newNote) => {
    this.setState({
     notes: [ ...this.state.notes, newNote ]
    })
  }
  handleAddFolder = (newFolder) => {
    this.setState({
      folders: [ ...this.state.folders, newFolder ]
     })
  }
  componentDidMount() {
      fetch(config.API_ENDPOINT, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(this.setNoteful)
        .catch(error => this.setState({ error }))
    }
  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/jake-geordie-noteful-client', '/jake-geordie-noteful-client/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} render={routeProps =>
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path = '/jake-geordie-noteful-client/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path = '/jake-geordie-noteful-client/add-folder'
          component={NotePageNav}
          
        />
        <Route
          path = '/jake-geordie-noteful-client/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {
          ['/jake-geordie-noteful-client', '/jake-geordie-noteful-client/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              return (
                <NoteListMain
                  {...routeProps}
                  handleDeleteNote = {this.handleDeleteNote}
                  notes={!folderId ? notes : notes.filter(note=>note.folderid==folderId)}
                />
              )
            }}
          />
        )}
        
        <Route
          path = '/jake-geordie-noteful-client/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            return (
              <NotePageMain
                {...routeProps}
                note={notes.filter(note=>note.id==noteId)[0]}
                handleDeleteNote = {this.handleDeleteNote}
              />
            )
          }}
        />
        <Route
          path = '/jake-geordie-noteful-client/add-folder'
          render={routeProps => {
            return (
              <AddFolder
              {...routeProps}
              handleAddFolder = {this.handleAddFolder}
              />
              )
          }}
        />
        <Route
          path='/jake-geordie-noteful-client/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
                handleAddNote = {this.handleAddNote}
              />
            )
          }}
        />
      </>
    )
  }

  render() {
    return (
      <div className='App'>
        <nav className='App__nav'>
          { this.renderNavRoutes()}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to = '/jake-geordie-noteful-client'> Noteful </Link>
            {' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          { this.renderMainRoutes()}
        </main>
      </div>

    )
  }
}

export default App
