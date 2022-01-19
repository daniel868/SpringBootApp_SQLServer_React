import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8090/api/v1//employees/";

class EmployeeService {

    getAllEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL)
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + employeeId)
    }

    insertNewEmployee(employeeDto) {
        return axios.post(EMPLOYEE_API_BASE_URL + "insert-new-employee", employeeDto)
    }

    updateEmployee(employeeId, employeeDto) {
        return axios.put(EMPLOYEE_API_BASE_URL + employeeId, employeeDto)
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + employeeId)
    }
}

export default new EmployeeService()