import axios from "axios";

const COMPANY_API_BASE_URL = "http://localhost:8090/api/v1//companies/";

class CompanyService {
    insertNewCompany(companyDto) {
        return axios.post(COMPANY_API_BASE_URL + "insert-new-company", companyDto)
    }

    updateCompany(id, companyDto) {
        return axios.put(COMPANY_API_BASE_URL + id, companyDto)
    }

    deleteCompany(id) {
        return axios.delete(COMPANY_API_BASE_URL + id)
    }

    getAllCompanies() {
        return axios.get(COMPANY_API_BASE_URL)
    }

    getCompanyById(id) {
        return axios.get(COMPANY_API_BASE_URL + id)
    }
}

export default new CompanyService()