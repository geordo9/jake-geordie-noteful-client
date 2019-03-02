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
/***************************************************************************************************************************************************************************/
  /*These three functions should update state and rerender
  when they are passed to the addfolder and addnote routes as props.
  I tried but couldnt get them to work so I removed them. 
  Delete request is on Note.js, Post is on addfolder.js and addnote.js*/
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
/***************************************************************************************************************************************************************************/
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
console.log('nav', notes)
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
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
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state
    console.log('route', notes)
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              return (
                <NoteListMain
                  {...routeProps}
/***************************************************************************************************************************************************************************/
                  //this controls what gets viewed on the main page and what gets viewd when a folder is clicked.
                  //there is something wrong with my logic here that I couldnt figure out
                  notes={notes.filter(note=>note.folderid==folderId ? !folderId : note)}
/***************************************************************************************************************************************************************************/
                />
              )
            }}
          />
        )}
        
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            return (
              <NotePageMain
                {...routeProps}
                note={notes.filter(note=>note.id==noteId)[0]}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
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
          {(this.state.notes.length) ? this.renderNavRoutes() : ''}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          {(this.state.notes.length) ? this.renderMainRoutes() : ''}
        </main>
      </div>

    )
  }
}

export default App
