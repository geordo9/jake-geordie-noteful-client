import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../config'


export default class Note extends Component {


  handleDelete = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}note/${this.props.id}`,{ 
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`},
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(e)}
        else {
        console.log('deleted')
/***************************************************************************************************************************************************************************/
          //need to pass in a function that will update state and one that navigates back to main page
          //so that once remove is clicked, the item is no longer on screen
/***************************************************************************************************************************************************************************/
        }   
      })
    .catch(error => {
      console.error({error})
    })
  }

  render(){
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={(e) => this.handleDelete(e)}>
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