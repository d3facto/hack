import axios from 'axios';
import configuration from './constants'
const URL = configuration.API_URL

export const get_user = async (user_id) => {
    //return { id: 0, firstname: 'Robert', lastname: 'toto', profile: '' }
    const users = await axios.get(`${URL}/user/${user_id}`)
    return users.data
}

export const get_users = async () => {
    //return [ { id: 0, firstname: 'Robert', lastname: 'toto', profile: '' }]
    const users = await axios.get(`${URL}/users`)
    return users.data
}