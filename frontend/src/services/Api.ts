import axios from 'axios'
import variables from '../../variables'

export default () => {
    return axios.create({
        baseURL: variables.API_URL
    })
}