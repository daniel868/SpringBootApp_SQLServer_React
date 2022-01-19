import React, {Component} from 'react';
import CompanyService from "../../../services/CompanyService";
import ChooseCompanies from "../utils/ChooseCompanies";
import EmployeeService from "../../../services/EmployeeService";

class Employee extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            employeeName: '',
            employeeSurname: '',
            jobDescription: '',
            emailAddress: '',
            birthDate: '',
            phoneNumber: '',
            availableCompanies: [],
            selectedCompanies: [],

            buttonVal: this.props.button,
            titleVal: this.props.title
        }

        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changeEmployeeName = this.changeEmployeeName.bind(this);
        this.changeEmployeeSurname = this.changeEmployeeSurname.bind(this);
        this.changeJobDescription = this.changeJobDescription.bind(this);
        this.changeEmailAddress = this.changeEmailAddress.bind(this);
        this.changeBirthDate = this.changeBirthDate.bind(this);
    }

    componentDidMount() {
        CompanyService.getAllCompanies().then((result => {
            console.log(result.data)
            this.setState({availableCompanies: result.data})
        }))
        if (this.state.id != null) {
            //set data to the employee's fields
            EmployeeService.getEmployeeById(this.state.id).then(result => {
                console.log(result.data)
                const dto = result.data
                this.setState({
                    employeeName: dto.name,
                    employeeSurname: dto.surname,
                    birthDate: dto.birthDate,
                    jobDescription: dto.jobName,
                    phoneNumber: dto.phoneNumber,
                    emailAddress: dto.emailAddress
                })
            })
        }
    }

    retrieveCompaniesName = (childFlightInformation) => {
        this.setState({selectedCompanies: childFlightInformation})
    }

    changeEmployeeName = (event) => {
        this.setState({employeeName: event.target.value})
    }
    changeEmployeeSurname = (event) => {
        this.setState({employeeSurname: event.target.value})
    }
    changeJobDescription = (event) => {
        this.setState({jobDescription: event.target.value})
    }
    changeEmailAddress = (event) => {
        this.setState({emailAddress: event.target.value})
    }
    changeBirthDate = (event) => {
        this.setState({birthDate: event.target.value})
    }
    changePhoneNumber = (event) => {
        this.setState({phoneNumber: event.target.value})
    }

    saveEmployee = (event) => {
        event.preventDefault()

        let employee = {
            name: this.state.employeeName,
            surname: this.state.employeeSurname,
            birthDate: this.state.birthDate,
            jobName: this.state.jobDescription,
            phoneNumber: this.state.phoneNumber,
            emailAddress: this.state.emailAddress,
            employeeCompaniesInfo: this.state.selectedCompanies
        }
        console.log("employee => " + JSON.stringify(employee));

        if (this.state.id != null) {
            //update the employee
            EmployeeService.updateEmployee(this.state.id,employee).then(response=>{
                console.log(response.data)
                this.props.history.push('/home/search-for-employee')
            })
        } else {
            //save the employee
            EmployeeService.insertNewEmployee(employee).then(response => {
                console.log(response)
                this.props.history.push('/home/search-for-employee')
            })
        }
    }

    cancel = (event) => {
        this.props.history.push('/home/search-for-employee')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{marginTop: "15px"}}>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">{this.state.titleVal}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input placeholder="Name" name="employeeName"
                                               className="form-control"
                                               value={this.state.employeeName} onChange={this.changeEmployeeName}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Surname</label>
                                        <input placeholder="Surname" name="employeeSurname"
                                               className="form-control"
                                               value={this.state.employeeSurname} onChange={this.changeEmployeeSurname}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input placeholder="Email Address" name="emailAddress"
                                               className="form-control"
                                               value={this.state.emailAddress} onChange={this.changeEmailAddress}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Job Description</label>
                                        <input placeholder="Job Description" name="jobDescription"
                                               className="form-control"
                                               value={this.state.jobDescription} onChange={this.changeJobDescription}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input placeholder="Phone Number" name="phoneNumber"
                                               className="form-control"
                                               value={this.state.phoneNumber} onChange={this.changePhoneNumber}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Birth Date</label>
                                        <input placeholder="Birth Date" name="birthDate"
                                               className="form-control"
                                               value={this.state.birthDate} onChange={this.changeBirthDate}
                                        />
                                    </div>

                                    <div className="text-center">
                                        {this.state.id == null ? < label> Select company/s</label> : null}
                                        <ChooseCompanies dataApi={this.state.availableCompanies}
                                                         parentCallBack={this.retrieveCompaniesName}
                                                         isVisible={this.state.id == null}
                                        />
                                    </div>


                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveEmployee}>{this.state.buttonVal}
                                    </button>
                                    <button className="btn btn-danger"
                                            style={{marginLeft: "10px", marginTop: "10px"}}
                                            onClick={this.cancel}>Cancel
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Employee;