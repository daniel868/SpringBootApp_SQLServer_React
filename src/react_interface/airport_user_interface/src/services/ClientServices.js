import axios from "axios";

const CLIENT_API_BASE_URL = "http://localhost:8090/api/v1/";

class ClientServices {
    getAllClients() {
        return axios.get(CLIENT_API_BASE_URL + "clients")
    }

    getClientById(id) {
        return axios.get(CLIENT_API_BASE_URL + "clients/" + id)
    }

    insertNewClient(client) {
        return axios.post(CLIENT_API_BASE_URL + "/clients/insert-new-client", client)
    }

    updateClient(id, client) {
        return axios.put(CLIENT_API_BASE_URL + "clients/" + id, client)
    }
    deleteClient(id){
        return axios.delete(CLIENT_API_BASE_URL + "clients/" + id)
    }
}

export default new ClientServices();