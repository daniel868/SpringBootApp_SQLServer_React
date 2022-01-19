import React, {Component} from 'react';
import EmployeeService from "../../../services/EmployeeService";
import DropdownDisplayData from "../../reusableComponents/utils/DropdownDisplayData";
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";
import Sidebar from "../../nav_bars/Sidebar";

class SearchEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
        this.updateEmployee = this.updateEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)

        console.log(this.props.userDetail)
    }

    componentDidMount() {
        EmployeeService.getAllEmployees().then(result => {
            console.log(result.data)
            this.setState({dataFromApi: result.data})
        })
    }

    updateEmployee(employeeId) {
        console.log("Update employee " + employeeId)
        this.props.history.push(`/update-employee/${employeeId}`)
    }

    deleteEmployee(employeeId) {
        console.log("Delete employee " + employeeId)
        EmployeeService.deleteEmployee(employeeId).then(result => {
            console.log(result.data)
            this.setState({
                dataFromApi: this.state.dataFromApi.filter(data => data.id !== employeeId)
            })
        })
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <h2 className="text-center">Employees</h2>
                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Job Description</th>
                            <th>Phone Number</th>
                            <th>Birth Date</th>
                            <th>Email Address</th>
                            <th>Number of jobs</th>
                            <th>Companies</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.dataFromApi.map(
                                row =>
                                    <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>{row.surname}</td>
                                        <td>{row.jobName}</td>
                                        <td>{row.phoneNumber}</td>
                                        <td>{row.birthDate}</td>
                                        <td>{row.emailAddress}</td>
                                        <td>{row.jobCount}</td>
                                        <td>
                                            <DropdownDisplayData apiData={row.employeeCompaniesInfo}/>
                                        </td>
                                        <UpdateDeleteDropdown id={row.id}
                                                              updateItem={this.updateEmployee}
                                                              deleteItem={this.deleteEmployee}
                                        />
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SearchEmployeeComponent;