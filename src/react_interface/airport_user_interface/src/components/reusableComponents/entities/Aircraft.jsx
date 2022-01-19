import React, {Component} from 'react';
import AircraftServices from "../../../services/AircraftServices";

class Aircraft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            aircraftType: '',
            engineNumbers: '',
            maxSpeed: '',
            seatsAmount: '',
            workingHours: '',
            buttonVal: this.props.button,
            titleVal: this.props.title
        }
        this.onAircraftTypeChange = this.onAircraftTypeChange.bind(this);
        this.onEngineNumbersChange = this.onEngineNumbersChange.bind(this);
        this.onMaxSpeedChange = this.onMaxSpeedChange.bind(this);
        this.onSeatsAmountChange = this.onSeatsAmountChange.bind(this);
        this.onWorkingHourChange = this.onWorkingHourChange.bind(this);

        this.cancel = this.cancel.bind(this)

    }

    componentDidMount() {
        if (this.state.id != null) {
            AircraftServices.getFlightById(this.state.id).then((result => {
                let aircraft = result.data
                this.setState({
                    aircraftType: aircraft.aircraftType,
                    engineNumbers: aircraft.engineNumber,
                    maxSpeed: aircraft.maxSpeed,
                    seatsAmount: aircraft.seatsNumber,
                    workingHours: aircraft.workingHour
                })
            }))
        }
    }

    onAircraftTypeChange = (event) => {
        this.setState({aircraftType: event.target.value})
    }

    onEngineNumbersChange = (event) => {
        this.setState({engineNumbers: event.target.value})
    }

    onMaxSpeedChange = (event) => {
        this.setState({maxSpeed: event.target.value})
    }

    onSeatsAmountChange = (event) => {
        this.setState({seatsAmount: event.target.value})
    }

    onWorkingHourChange = (event) => {
        this.setState({workingHours: event.target.value})
    }


    saveUpdate = (event) => {
        event.preventDefault();

        let aircraft = {
            aircraftType: this.state.aircraftType,
            engineNumber: this.state.engineNumbers,
            seatsNumber: this.state.seatsAmount,
            workingHour: this.state.workingHours,
            maxSpeed: this.state.maxSpeed,
        }
        console.log("aircraft => " + JSON.stringify(aircraft));

        if (this.state.id != null) {
            //TODO: Update
            AircraftServices.updateAircraft(aircraft, this.state.id).then((result => {
                console.log(result.data)
                this.props.history.push('/flight/aircraft')
            }))

        } else {
            //TODO: Save
            AircraftServices.insertNewAircraft(aircraft).then((response => {
                console.log(response.data)
                this.props.history.push('/flight/aircraft')
            }))
        }
    }

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/flight/aircraft')
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
                                        <label>Aircraft Type</label>
                                        <input placeholder="Name" name="aircraftType"
                                               className="form-control"
                                               value={this.state.aircraftType} onChange={this.onAircraftTypeChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Engine Number</label>
                                        <input placeholder="Engine Number" name="engineNumber" className="form-control"
                                               value={this.state.engineNumbers} onChange={this.onEngineNumbersChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Seats Count</label>
                                        <input placeholder="Number" name="seatsCount" className="form-control"
                                               value={this.state.seatsAmount} onChange={this.onSeatsAmountChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Max Speed</label>
                                        <input placeholder="Speed" name="maxSpeed" className="form-control"
                                               value={this.state.maxSpeed} onChange={this.onMaxSpeedChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Working Hours</label>
                                        <input placeholder="Hours" name="workingHours" className="form-control"
                                               value={this.state.workingHours} onChange={this.onWorkingHourChange}
                                        />
                                    </div>
                                    <button className="btn btn-success" style={{marginTop: "10px"}}
                                            onClick={this.saveUpdate}>{this.state.buttonVal}
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

export default Aircraft;