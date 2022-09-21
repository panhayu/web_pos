import axios from "axios";

let API_URL = 'endpoint';

class AuthService {
    login(formData) {
        //TODO Implement on Login Function
    }

    logout() {
        localStorage.removeItem('user')
    }
}

export default new AuthService();