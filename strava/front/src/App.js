import React, { useEffect, useState } from 'react'
import './App.css'
import { Swiper } from './swiper'
import { Header } from './header'
import { get_user, get_users } from './api'
import { get_connected_user_id, has_connected_user } from './utils'

function App() {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ] = useState(null)
  const [ connected, setConnected ] = useState(null)
  

  useEffect(() => {
    const promises = []
    if (has_connected_user())
      promises.push(get_user(get_connected_user_id()))
    else
      promises.push(undefined)
    promises.push(get_users())
    return Promise.all(promises)
    .then(([user, users]) => {
      setUsers(users)
      setConnected(user)
      setLoading(false)
    })
  }, [])

  if (loading)
    return <div className='flex-container'><h1>Loading 🧱 Hold tight.</h1></div>

  return (
    <div style={{ backgroundColor: '#fffe72', height: '100%' }}>
      <Header connected={connected}></Header>
      <div style={{ 'textAlign': 'center' }}>
        { connected ? <h1 style={{ 'marginTop': 40 }}>Hello, {connected.firstname} {connected.lastname} ! Ready to Strinder 😍 ?</h1> : '' }
      </div>
      <div className="flex-container">
        <Swiper users={users}></Swiper>
      </div>
    </div>
  )
}

export default App
