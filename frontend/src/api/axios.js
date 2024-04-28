import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://175.45.192.12/api/v1',
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:5173',
    // },
})

export default instance
