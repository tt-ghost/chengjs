import React from 'react';
import { Button } from '@alifd/next'
import { connect } from 'react-redux'

function UserHome (props) {
  function showName() {
    props.showNameAsync({ name: 'chengzi' })
  }
  return <div>
    <Button onClick={showName}>显示</Button>
    <div>name: {props.user.name}</div>
  </div>
}

const mapState = ({ user }) => ({ user })
const mapDispatch = ({ user: { showName, showNameAsync }}) => ({
  showName,
  showNameAsync
})

export default connect(mapState, mapDispatch)(UserHome)