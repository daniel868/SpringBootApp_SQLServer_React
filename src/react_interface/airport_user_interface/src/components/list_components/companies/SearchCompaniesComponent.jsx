import React, {Component} from 'react';
import CompanyService from "../../../services/CompanyService";
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";
import DropdownDisplayData from "../../reusableComponents/utils/DropdownDisplayData";
import Sidebar from "../../nav_bars/Sidebar";

class SearchCompaniesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFromApi: []
        }
        this.updateCompany = this.updateCompany.bind(this)
        this.deleteCompany = this.deleteCompany.bind(this)
    }

    componentDidMount() {
        CompanyService.getAllCompanies().then((response => {
            console.log(response.data)
            this.setState({dataFromApi: response.data})
        }))
    }

    updateCompany(companyId) {
        console.log("Update company " + companyId)
        this.props.history.push(`/update-company/${companyId}`)
    }

    deleteCompany(companyId) {
        console.log("Delete company " + companyId)
        CompanyService.deleteCompany(companyId).then((result => {
            console.log(result.data)
            this.setState({
                dataFromApi: this.state.dataFromApi.filter(data => data.id !== companyId)
            })
        }))
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <h2 className="text-center">Companies</h2>
                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>CompanyName</th>
                            <th>BusinessFiscalValue</th>
                            <th>EmployeeAmount</th>
                            <th>AvailableFlights</th>
                            <th>Year</th>
                            <th>Number of employee</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.dataFromApi.map(
                                row =>
                                    <tr key={row.id}>
                                        <td>{row.companyName}</td>
                                        <td>{row.businessFiscalValue}</td>
                                        <td>{row.employeesAmount}</td>
                                        <td>{
                                            <DropdownDisplayData apiData={row.flightsInformation}/>
                                        }</td>
                                        <td>{row.year}</td>
                                        <td>{row.numberOfEmployee}</td>
                                        <UpdateDeleteDropdown id={row.id}
                                                              updateItem={this.updateCompany}
                                                              deleteItem={this.deleteCompany}
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

export default SearchCompaniesComponent;