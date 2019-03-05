import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../config'


export default class Note extends Component {

  handleDelete = (e) => {
    fetch(`${config.API_ENDPOINT}note/${this.props.id}`,{ 
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${config.API_KEY}`},
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject()}
        else {
        console.log(this.props.history)
        this.props.handleReturn(this.props.id)
        this.props.handleDeleteNote(this.props.id)
        }   
      })
    .catch(error => {
      console.log({error})
    })
  }

  render(){
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          < Link to = {`/note/${this.props.id}`} >
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={() => this.handleDelete(this.props.id)}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )}
  }