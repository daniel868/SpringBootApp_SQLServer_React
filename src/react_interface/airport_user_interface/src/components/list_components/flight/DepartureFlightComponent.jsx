import React, {Component} from 'react';
import FlightServices from "../../../services/FlightServices";
import {Button, Icon, Input} from "@mui/material";
import {Dropdown} from "react-bootstrap";
import {icons} from "react-icons";
import * as AiIcons from "react-icons/ai";
import {AiOutlineMore} from "react-icons/ai";
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";
import Sidebar from "../../nav_bars/Sidebar";


class DepartureFlightComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataFromApi: []
        }
        this.updateFlight = this.updateFlight.bind(this)
        this.deleteFlight = this.deleteFlight.bind(this)

    }

    componentDidMount() {
        FlightServices.getDepartureFlight().then((response => {
            this.setState({dataFromApi: response.data})
            console.log(response.data);
        }));
    }

    updateFlight(flightId) {
        console.log("Flight Id: " + flightId)
        this.props.history.push(`/update-flight/${flightId}`)
    }

    deleteFlight(flightId) {
        console.log("Deleted flight id: " + flightId)
        FlightServices.deleteFlight(flightId).then((response => {
            console.log(response)
            this.setState({
                dataFromApi: this.state.dataFromApi.filter(data => data.flight.id !== flightId)
            })
        }))
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <h2 className="text-center">Departure Flights</h2>

                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>From Location</th>
                            <th>To Location</th>
                            <th>Departure Date Time</th>
                            <th>Landing Date time</th>
                            <th>Aircraft</th>
                            <th>Average flight speed</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.dataFromApi.map(
                                row =>
                                    <tr key={row.flight.id}>
                                        <td>{row.flight.fromLocation}</td>
                                        <td>{row.flight.toLocation}</td>
                                        <td>{row.flight.departureDateTime}</td>
                                        <td>{row.flight.landingDateTime}</td>
                                        <td>{row.aircraftName}</td>
                                        <td>{row.averageSpeed} km/h</td>
                                        <UpdateDeleteDropdown id={row.flight.id}
                                                              updateItem={this.updateFlight}
                                                              deleteItem={this.deleteFlight}
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

export default DepartureFlightComponent;