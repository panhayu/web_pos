import axios from 'axios'
import authHeader from './auth-header'

let API_URL = 'https://dev-api-pos.jamlek.com/api/';

class UserService {

    // get methods

    getAllItems(params) {
        return axios.get(API_URL + 'items', {params: params,headers: authHeader()})
    }

    getItemsByCategory(params) {
        return axios.get(API_URL + 'categories', {params: params, headers: authHeader()})
    }

    getDineInTables() {
        return axios.get(API_URL + 'dining-tables', {headers: authHeader()})
    }

    getPaymentMethods() { 
        return axios.get(API_URL + 'payments', {headers: authHeader()})
    }

    getCategory(params) {
        return axios.get(API_URL + 'categories', {params: params, headers: authHeader()})
    }

    getOrderChannel() {
        return axios.get(API_URL + 'channels', {headers: authHeader()})
    }

    // post methods
    storeOrder(formData) {
        return axios.post(API_URL + 'orders', formData, {headers: authHeader()})
    }
}

export default new UserService();