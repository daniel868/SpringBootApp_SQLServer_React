import React, {Component} from 'react';
import FlightServices from "../../../services/FlightServices";
import MultipleSelect from "../utils/MultipleItems";
import {List} from "@mui/material";
import CompanyService from "../../../services/CompanyService";

class Company extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            companyName: '',
            businessFiscalValue: '',
            employeesAmount: '',
            year: '',
            flightInformation: [],
            availableDepartureFlights: [],
            oldFlights: [],

            buttonVal: this.props.button,
            titleVal: this.props.title
        }

        this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
        this.onBusinessFiscalValueChange = this.onBusinessFiscalValueChange.bind(this);
        this.onEmployeesAmountChange = this.onEmployeesAmountChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.saveCompany = this.saveCompany.bind(this);
        this.retrieveFlightInformation = this.retrieveFlightInformation.bind(this)
    }

    componentDidMount() {
        FlightServices.getDepartureFlight().then(response => {
            this.setState({availableDepartureFlights: response.data})
            console.log(response.data)
        })

        if (this.state.id != null) {
            CompanyService.getCompanyById(this.state.id).then((response => {
                console.log(response.data)
                this.setState({
                    companyName: response.data.companyName,
                    businessFiscalValue: response.data.businessFiscalValue,
                    employeesAmount: response.data.employeesAmount,
                    year: response.data.year,
                    oldFlights: response.data.flightsInformation
                })
            }))
        }
    }

    retrieveFlightInformation = (childFlightInformation) => {
        this.setState({flightInformation: childFlightInformation})
    }


    onCompanyNameChange = (event) => {
        this.setState({companyName: event.target.value})
    }

    onBusinessFiscalValueChange = (event) => {
        this.setState({businessFiscalValue: event.target.value})
    }

    onEmployeesAmountChange = (event) => {
        this.setState({employeesAmount: event.target.value})
    }
    onYearChange = (event) => {
        this.setState({year: event.target.value})
    }

    saveCompany = (event) => {
        event.preventDefault();

        let company = {
            companyName: this.state.companyName,
            businessFiscalValue: this.state.businessFiscalValue,
            employeesAmount: this.state.employeesAmount,
            year: this.state.year,
            flightsInformation: this.state.flightInformation
        }
        if (this.state.id != null) {
            //TODO:Update component
            CompanyService.updateCompany(this.state.id, company).then(response => {
                console.log(response)
                this.props.history.push('/companies')
            })
        } else {
            //TODO: Save component
            CompanyService.insertNewCompany(company).then((result => {
                console.log(result.data)
                this.props.history.push('/companies')
            }))
        }
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/companies')
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
                                        <label>Company Name</label>
                                        <input placeholder="Name" name="clientName"
                                               className="form-control"
                                               value={this.state.companyName} onChange={this.onCompanyNameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Business Fiscal Value</label>
                                        <input placeholder="Value" name="businessFiscalValue" className="form-control"
                                               value={this.state.businessFiscalValue}
                                               onChange={this.onBusinessFiscalValueChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Employee Amount</label>
                                        <input placeholder="Amount" name="employeeAmount" className="form-control"
                                               value={this.state.employeesAmount}
                                               onChange={this.onEmployeesAmountChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Year</label>
                                        <input placeholder="Year" name="year" className="form-control"
                                               value={this.state.year} onChange={this.onYearChange}
                                        />
                                    </div>

                                    <div className="text-center">
                                        {this.state.id == null ? < label> Select flight/s</label> : null}
                                        <MultipleSelect dataApi={this.state.availableDepartureFlights}
                                                        parentCallBack={this.retrieveFlightInformation}
                                                        oldData={this.state.oldFlights}
                                                        isVisible={this.state.id == null}
                                        />
                                    </div>

                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveCompany}>{this.state.buttonVal}
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={this.cancel}
                                            style={{marginLeft: "10px", marginTop: "10px"}}>Cancel
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

export default Company;