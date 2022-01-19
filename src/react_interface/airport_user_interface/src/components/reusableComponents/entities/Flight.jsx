import React, {Component} from 'react';
import AircraftServices from "../../../services/AircraftServices";
import FlightServices from "../../../services/FlightServices";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";

class Flight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            departureTime: new Date('2021-12-18T21:11:54'),
            arrivalTime: new Date('2021-12-18T21:11:54'),
            fromLocation: '',
            toLocation: '',
            aircraft: '',
            price: '',
            aircraftDropdown: [],
            titleVal: this.props.title,
            buttonVal:this.props.button
        }

        this.changeDepartureTime = this.changeDepartureTime.bind(this);

        this.changeArrivingTime = this.changeArrivingTime.bind(this);

        this.changeToLocation = this.changeToLocation.bind(this);

        this.changeFromLocation = this.changeFromLocation.bind(this);

        this.changeAircraft = this.changeAircraft.bind(this);

        this.saveUpdate = this.saveUpdate.bind(this);

        this.changePrice = this.changePrice.bind(this);

    }

    componentDidMount() {
        AircraftServices.getAllAircraft().then((response => {
            console.log(response.data);
            this.setState({aircraftDropdown: response.data})
        }))

        if (this.state.id != null) {
            FlightServices.getFlightById(this.state.id).then((response => {
                console.log(response)
                let dto = response.data
                this.setState({
                    departureTime: dto.flight.departureDateTime,
                    arrivalTime: dto.flight.landingDateTime,
                    fromLocation: dto.flight.fromLocation,
                    toLocation: dto.flight.toLocation,
                    aircraft: dto.aircraftName,
                    price: dto.flight.cost
                })
            }))
        }
    }

    changeDepartureTime = (value) => {
        this.setState({departureTime: value})
    }

    changeArrivingTime = (value) => {
        this.setState({arrivalTime: value})
    }

    changeFromLocation = (event) => {
        this.setState({fromLocation: event.target.value})
    }

    changeToLocation = (event) => {
        this.setState({toLocation: event.target.value})
    }

    changePrice = (event) => {
        this.setState({price: event.target.value})
    }

    changeAircraft = (event) => {
        this.setState({aircraft: event.target.value})
    }


    saveUpdate = (event) => {
        event.preventDefault();

        let flight = {
            fromLocation: this.state.fromLocation,
            toLocation: this.state.toLocation,
            price: this.state.price,
            departureDateTime: this.state.departureTime,
            landingDateTime: this.state.arrivalTime,
            aircraftName: this.state.aircraft
        }
        console.log("flight => " + JSON.stringify(flight));

        if (this.state.id != null) {
            //TODO: Update the flight
            FlightServices.updateFlight(flight, this.state.id).then((response => {
                console.log(response);
                this.props.history.push('/flight/departure-flight')
            }))

        } else {
            //TODO: Save the flight
            FlightServices.insertNewFlight(flight).then((response => {
                this.props.history.push('/flight/departure-flight');
                console.log(response.data)
            }))
        }
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/flight/departure-flight')
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{marginTop: "15px"}}>
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">{this.props.title}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label style={{marginBottom: "10px"}}>Departure Time</label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={1}>
                                                <DateTimePicker
                                                    label="Pick departure time"
                                                    value={this.state.departureTime}
                                                    onChange={this.changeDepartureTime}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>

                                    <div className="form-group" style={{marginTop: "10px"}}>
                                        <label style={{marginBottom: "10px"}}>Arrival Time</label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={1}>
                                                <DateTimePicker
                                                    label="Pick arrival time"
                                                    value={this.state.arrivalTime}
                                                    onChange={this.changeArrivingTime}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>


                                    <div className="form-group">
                                        <label>From Location</label>
                                        <input placeholder="From Location" name="fromLocation" className="form-control"
                                               value={this.state.fromLocation} onChange={this.changeFromLocation}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>To Location</label>
                                        <input placeholder="To Location" name="toLocation" className="form-control"
                                               value={this.state.toLocation} onChange={this.changeToLocation}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input placeholder="Price" name="price" className="form-control"
                                               value={this.state.price} onChange={this.changePrice}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputState">Aircraft</label>
                                        <select id="inputState" className="form-control" onChange={this.changeAircraft}
                                                value={this.state.aircraft}>
                                            <option>Choose...</option>
                                            {
                                                this.state.aircraftDropdown.map(value =>
                                                    <option id={value.id}>{value.aircraftType}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveUpdate}>{this.state.buttonVal}
                                    </button>
                                    <button className="btn btn-danger"
                                            style={{marginLeft: "10px", marginTop: "10px"}} onClick={this.cancel}>Cancel
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

export default Flight;
