import axios from 'axios';
const URL = 'http://0.0.0.0:5000/';

export const test = () => {
    axios.get(URL).then(resp => {
        console.log(resp.data);
    });

}