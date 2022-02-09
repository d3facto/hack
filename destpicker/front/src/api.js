import axios from 'axios';
const URL = 'http://0.0.0.0:5000/';

export const test = () => {
    axios.get(URL).then(resp => {
        console.log(resp.data);
    });

}

export const destpicker = async (participants, destinations, mode) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const payload = {
        participants,
        destinations,
        mode
    }
    return await axios.post(`${URL}/destpicker`, payload, options)
}

