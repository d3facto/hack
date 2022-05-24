import axios from 'axios';
import configuration from './constants'
const URL = configuration.API_URL

export const get_user = async (user_id) => {
    const users = await axios.get(`${URL}/user/${user_id}`)
    return users.data
}

export const get_users = async () => {
    const users = await axios.get(`${URL}/users`)
    return users.data
}