import React, { createRef } from 'react';
import { connect } from 'react-redux'
import './style.scss'
import { post } from '../../../helper'

function PassportLogin (props) {

  const ref = createRef()

  function getValues () {
    const { name, password, rememberMe } = ref.current
    return {
      name: name.value,
      password: password.value,
      rememberMe: rememberMe.value,
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
        <label>用户名:</label>
        <input name='name' />
      </div>

      <div className='passport-login-item'>
        <label>密码:</label>
        <input name='password' />
      </div>

      <div className='passport-login-item'>
        <label>记住密码:</label>
        <input name='rememberMe' type='checkbox' />
      </div>

      <div className='passport-login-item'>
        <label>第三方登录:</label>
        <a href='/api/passport/github/callback' target='_blank'>Github</a>
      </div>

      <div className='passport-login-item passport-login-submit'>
        <button onClick={onSubmit}>submit</button>
      </div>

    </form>
  </div>
}

const mapState = ({ user }) => ({ user })
const mapDispatch = ({ user: { getUser }}) => ({
  getUser
})

export default connect(mapState, mapDispatch)(PassportLogin)