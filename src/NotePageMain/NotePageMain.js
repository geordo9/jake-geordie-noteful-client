import React, { Component } from 'react';
import Note from '../Note/Note'
import './NotePageMain.css'

export default class NotePageMain extends Component {
  render(){

    const handleReturn = (note) => {
    this.props.history.push('/')
    }

  return (

    <section className='NotePageMain'>
      <Note
        id={this.props.note.id}
        name={this.props.note.title}
        modified={this.props.note.modified}
        content={this.props.note.content}
        handleDeleteNote = {this.props.handleDeleteNote}
        handleReturn = {handleReturn}
      />
      <div className='NotePageMain__content'>
        {this.props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
