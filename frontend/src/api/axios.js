import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://www.pette.me/api/v1',
    // baseURL: 'http://223.130.153.84/api/v1',
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:5173',
    // },
})

export default instance