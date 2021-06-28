import React, { createRef } from 'react';
import { connect } from 'react-redux'
import './style.scss'
import { put } from '../../../helper'

function PassportRegister (props) {

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
    put('/api/passport/register', values)
  }


  return <div className='auth-login'>
    <form ref={ref}>

      <div className='auth-login-item'>
        <label>username:</label>
        <input name='name' />
      </div>

      <div className='auth-login-item'>
        <label>password:</label>
        <input name='password' />
      </div>

      <div className='auth-login-item'>
        <label>repassword:</label>
        <input name='repassword' />
      </div>

      <div className='auth-login-item auth-login-submit'>
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

export default connect(mapState, mapDispatch)(PassportRegister)