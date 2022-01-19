import React, {Component} from 'react';
import AircraftServices from "../../../services/AircraftServices";
import UpdateDeleteDropdown from "../../reusableComponents/utils/UpdateDeleteDropdown";
import Sidebar from "../../nav_bars/Sidebar";


class SearchAircraftComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            aircraft: [],
        }

        this.updateAircraft = this.updateAircraft.bind(this)
        this.deleteAircraft = this.deleteAircraft.bind(this)
    }

    componentDidMount() {
        AircraftServices.getAllAircraft().then((response => {
            this.setState({aircraft: response.data})
            console.log(response.data)
        }))

    }

    updateAircraft(id) {
        console.log("Update : " + id)
        this.props.history.push(`/update-aircraft/${id}`)
    }

    deleteAircraft(id) {
        console.log("Delete : " + id)

        AircraftServices.deleteAircraft(id).then((response => {
            console.log(response)
            this.setState({
                aircraft: this.state.aircraft.filter(aircraft => aircraft.id !== id)
            })
        }))
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <h2 className="text-center">Aircraft</h2>

                <div className="row" style={{marginLeft: "10px", marginRight: "10px"}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>Aircraft Type</th>
                            <th>Engine Number</th>
                            <th>Max Speed</th>
                            <th>Seats Number</th>
                            <th>Total working hours</th>
                            <th>Number of flights</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.aircraft.map(
                                (currentAircraft, index) =>
                                    <tr key={currentAircraft.id}>
                                        <td>{currentAircraft.aircraftType}</td>
                                        <td>{currentAircraft.engineNumber}</td>
                                        <td>{currentAircraft.maxSpeed}</td>
                                        <td>{currentAircraft.seatsNumber}</td>
                                        <td>{currentAircraft.workingHour}</td>
                                        <td>{currentAircraft.numberOfFlights}</td>
                                        <UpdateDeleteDropdown id={currentAircraft.id}
                                                              updateItem={this.updateAircraft}
                                                              deleteItem={this.deleteAircraft}
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

export default SearchAircraftComponent;