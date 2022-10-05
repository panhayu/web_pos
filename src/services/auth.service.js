import axios from "axios";

let API_URL = process.env.VUE_APP_API_URL;

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