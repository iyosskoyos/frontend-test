import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/'
})

export default instance

// 'http://localhost:5001/clone-f44bc/us-central1/api'
//'https://us-central1-clone-f44bc.cloudfunctions.net/api'