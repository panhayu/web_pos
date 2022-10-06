import axios from "axios";

let API_URL = 'https://dev-api-pos.jamlek.com/api/';

class AuthService {
    login(formData) {
        return axios.post(API_URL + 'login', formData).then((response) => { 
            if (response.data.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data.data
        })
    }

    logout() {
        localStorage.removeItem('user')
    }
}

export default new AuthService();