import axios from "axios";

const COMPANY_API_BASE_URL = "http://localhost:8090/api/v1/home/";

class DashboardService {
    getMostUsedPlanes() {
        return axios.get(COMPANY_API_BASE_URL + "most-used-planes")
    }

    getEmployeesCompanies() {
        return axios.get(COMPANY_API_BASE_URL + "companies-employees")
    }

    getBestSellerFlights() {
        return axios.get(COMPANY_API_BASE_URL + "best-seller-flights")
    }

    getCheepFlight() {
        return axios.get(COMPANY_API_BASE_URL + "cheep-flight")
    }

    getExpensiveFlight() {
        return axios.get(COMPANY_API_BASE_URL + "expensive-flight")
    }
}

export default new DashboardService()