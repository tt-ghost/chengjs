import React, { createRef } from 'react';
import { connect } from 'react-redux'
import './style.scss'
import { post } from '../../../helper'

function PassportLogin (props) {

  const ref = createRef()

  function getValues () {
    const { name, password, repassword } = ref.current
    return {
      name: name.value,
      password: password.value,
      repassword: repassword.value,
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    const values = getValues()
    post('/api/passport/login', values)
  }


  return <div className='passport-login'>
    <form ref={ref}>

      <div className='passport-login-item'>
        <label>username:</label>
        <input name='name' />
      </div>

      <div className='passport-login-item'>
        <label>password:</label>
        <input name='password' />
      </div>

      <div className='passport-login-item'>
        <label>repassword:</label>
        <input name='repassword' />
      </div>

      <div className='passport-login-item passport-login-submit'>
        <button onClick={onSubmit}>submit</button>
      </div>

    </form>
  </div>
}

const mapState = ({ user }) => ({ user })
const mapDispatch = ({ user: { showName, showNameAsync }}) => ({
  showName,
  showNameAsync
})

export default connect(mapState, mapDispatch)(PassportLogin)