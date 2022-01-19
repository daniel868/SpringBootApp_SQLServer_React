import React, {Component} from 'react';
import FlightServices from "../../../services/FlightServices";
import {format} from "date-fns";
import ClientServices from "../../../services/ClientServices";

class Client extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            clientName: '',
            clientSurname: '',
            phoneNumber: '',
            emailAddress: '',
            buttonVal: this.props.button,
            titleVal: this.props.title,
            departureFights: [],
            fromLocation: '',
            toLocation: '',
            departureDateTime: ''
        }
        this.onClientNameChange = this.onClientNameChange.bind(this);
        this.onClientSurnameChange = this.onClientSurnameChange.bind(this);
        this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
        this.onEmailAddressChange = this.onEmailAddressChange.bind(this);
        this.onFromChange = this.onFromChange.bind(this);
        this.onToChange = this.onToChange.bind(this);
    }

    componentDidMount() {
        FlightServices.getDepartureFlight().then((response => {
            console.log(response.data)
            this.setState({departureFights: response.data})
        }))
        if (this.state.id != null) {
            ClientServices.getClientById(this.state.id).then((response => {
                console.log(response.data)
                this.setState({
                    clientName: response.data.client.name,
                    clientSurname: response.data.client.surname,
                    phoneNumber: response.data.client.phoneNumber,
                    emailAddress: response.data.client.emailAddress,
                    fromLocation: response.data.flightInfo.split('->')[0],
                    toLocation: response.data.flightInfo.split('->')[1],
                    departureDateTime: this.transforDateTime(response.data.flightInfo.split('->')[2])
                })
            }))
        } else {

        }
    }

    onClientNameChange = (event) => {
        this.setState({clientName: event.target.value})
    }

    onClientSurnameChange = (event) => {
        this.setState({clientSurname: event.target.value})
    }

    onPhoneNumberChange = (event) => {
        this.setState({phoneNumber: event.target.value})
    }
    onEmailAddressChange = (event) => {
        this.setState({emailAddress: event.target.value})
    }

    saveClient = (event) => {
        event.preventDefault();

        let client = {
            name: this.state.clientName,
            surname: this.state.clientSurname,
            emailAddress: this.state.emailAddress,
            phoneNumber: this.state.phoneNumber,
            fromLocation: this.state.fromLocation,
            toLocation: this.state.toLocation,
        }

        console.log("client => " + JSON.stringify(client));
        if (this.state.id != null) {
            //update a new client
            ClientServices.updateClient(this.state.id, client).then((result => {
                console.log(result.data)
                this.props.history.push('/clients')
            }))
        } else {
            //save a new client
            ClientServices.insertNewClient(client).then(result => {
                console.log(result.data)
                this.props.history.push('/clients')
            })
        }
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/clients')
    }

    onFromChange = (event) => {
        this.setState({fromLocation: event.target.value})
        console.log(this.state.fromLocation)
    }
    onToChange = (event) => {
        this.setState({toLocation: event.target.value})
    }

    onDepartureDateTimeChange = (event) => {
        this.setState({departureDateTime: event.target.value})
    }

    transforDateTime = (dateTime) => {
        var date = new Date(dateTime)
        return format(date, "MMMM do, yyyy H:mma")
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
                                        <label>Client Name</label>
                                        <input placeholder="Name" name="clientName"
                                               className="form-control"
                                               value={this.state.clientName} onChange={this.onClientNameChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client Surname</label>
                                        <input placeholder="Surname" name="clientSurname" className="form-control"
                                               value={this.state.clientSurname} onChange={this.onClientSurnameChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input placeholder="Number" name="phoneNumber" className="form-control"
                                               value={this.state.phoneNumber} onChange={this.onPhoneNumberChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input placeholder="Email" name="emailAddress" className="form-control"
                                               value={this.state.emailAddress} onChange={this.onEmailAddressChange}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <label>Choose a flight</label>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputState">From</label>
                                        <select id="inputState" className="form-control" onChange={this.onFromChange}
                                                value={this.state.fromLocation}>
                                            <option>Pick an option</option>
                                            {
                                                this.state.departureFights.map(data =>
                                                    <option id={data.flight.id}>{data.flight.fromLocation}</option>
                                                )

                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputState">To</label>
                                        <select id="inputState" className="form-control" value={this.state.toLocation}
                                                onChange={this.onToChange}>
                                            <option>Pick an option</option>
                                            {
                                                this.state.departureFights.filter(data => {
                                                    if (this.state.fromLocation !== '')
                                                        return data.flight.fromLocation === this.state.fromLocation;
                                                    else
                                                        return data
                                                })
                                                    .map(data =>
                                                        <option id={data.flight.id}>{data.flight.toLocation}</option>
                                                    )
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputState">Departure Date&Time</label>
                                        <select id="inputState" className="form-control"
                                                onChange={this.onDepartureDateTimeChange}
                                                value={this.state.departureDateTime}>
                                            <option>Pick an option</option>
                                            {
                                                this.state.departureFights.filter(data => {
                                                    if (this.state.fromLocation !== '' && this.state.toLocation !== '') {
                                                        return data.flight.fromLocation === this.state.fromLocation
                                                            && data.flight.toLocation === this.state.toLocation;
                                                    } else {
                                                        return null;
                                                    }
                                                }).map(data =>
                                                    <option id={data.flight.id}>{
                                                        this.transforDateTime(data.flight.departureDateTime)
                                                    }</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveClient}>{this.state.buttonVal}
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

export default Client;