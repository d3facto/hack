import React, { useEffect, useState } from 'react'
import './App.css'
import { Swiper } from './swiper'
import { Header } from './header'
import { get_users } from './api'

function App() {
  const [ loading, setLoading ] = useState(true)
  const [ users, setUsers ] = useState(null)

  useEffect(() => {
    return get_users()
      .then((users) => {
        setUsers(users)
        setLoading(false)
      })
  }, [])

  if (loading)
    return <h1>Loading</h1>

  return (
    <div style={{ backgroundColor: 'lightgreen', height: '100%' }}>
      <Header></Header>
      <div class="flex-container">
        <Swiper users={users}></Swiper>
      </div>
    </div>
  )
}

export default App
