import axios from 'axios';
const URL = 'http://0.0.0.0:5000/'

export const get_users = async () => {
    const users = await axios.get(`${URL}/users`)
    return users.data
}