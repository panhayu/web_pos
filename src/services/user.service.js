import axios from 'axios'
import authHeader from './auth-header'

let API_URL = 'https://dev-api-pos.jamlek.com/api/';

class UserService {
    
    getAllItems() {
        return axios.get(API_URL + 'items', {headers: authHeader()})
    }

    getItemsByCategory(params) {
        return axios.get(API_URL + 'categories', {params: params, headers: authHeader()})
    }

    getDineInTables() {
        return axios.get(API_URL + 'dining-tables', {headers: authHeader()})
    }
}

export default new UserService();