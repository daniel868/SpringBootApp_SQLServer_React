import React, {Component} from 'react';
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";
import ClientServices from "../../../services/ClientServices";
import Sidebar from "../../nav_bars/Sidebar";

class SearchClientsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
        this.updateClient = this.updateClient.bind(this)
        this.deleteClient = this.deleteClient.bind(this)

    }

    componentDidMount() {
        ClientServices.getAllClients().then(result => {
            console.log(result.data)
            this.setState({dataFromApi: result.data})
        })
    }

    updateClient(clientId) {
        console.log("Update " + clientId)
        this.props.history.push(`/update-client/${clientId}`)
    }

    deleteClient(clientId) {
        console.log("Delete client " + clientId)
        ClientServices.deleteClient(clientId).then((response => {
            console.log(response)
            this.setState({
                dataFromApi: this.state.dataFromApi.filter(data => data.client.id !== clientId)
            })
        }))
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <h2 className="text-center">Clients</h2>
                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Flight</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.dataFromApi.map(
                                row =>
                                    <tr key={row.client.id}>
                                        <td>{row.client.name}</td>
                                        <td>{row.client.surname}</td>
                                        <td>{row.client.emailAddress}</td>
                                        <td>{row.client.phoneNumber}</td>
                                        <td>{row.flightInfo}</td>
                                        <UpdateDeleteDropdown id={row.client.id}
                                                              updateItem={this.updateClient}
                                                              deleteItem={this.deleteClient}
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

export default SearchClientsComponent;