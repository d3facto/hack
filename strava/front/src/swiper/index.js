import React from 'react'
import TinderCard from 'react-tinder-card'
import styles from './style'

export const Card = ({ id, defacto, firstname, lastname }) => {
    return <div style={{ backgroundImage: 'url(' + defacto.image + ')', ...styles.card }}>
      <div style={styles.container}>
        <h3 style={styles.text}>{firstname} {lastname}</h3>
      </div>
    </div>
}


export const Swiper = ({ users }) => {
    return <TinderCard>
        { users.map((u) => <Card {...u} key={u.id} />) }
    </TinderCard>
}