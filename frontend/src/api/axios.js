import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://223.130.139.240/api/v1',
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:5173',
    // },
})

export default instance
