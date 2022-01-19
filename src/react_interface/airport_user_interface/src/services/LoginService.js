import axios from "axios";

const LOGIN_API_BASE_URL = "http://localhost:8090/api/v1//login/";

class LoginService {

    getAllUsers() {
        return axios.get(LOGIN_API_BASE_URL + "users")
    }

    getUserById(userId) {
        return axios.get(LOGIN_API_BASE_URL + "users/" + userId)
    }

    checkUserCredentials(loginDto) {
        return axios.put(LOGIN_API_BASE_URL + "checkUserCredentials", loginDto)
    }

    insertNewUser(userDto) {
        return axios.post(LOGIN_API_BASE_URL + "insert-new-user", userDto)
    }

    updateNewUser(userId, userDto) {
        return axios.put(LOGIN_API_BASE_URL + "update-user/" + userId, userDto)
    }

}

export default new LoginService()