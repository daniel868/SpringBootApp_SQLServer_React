import React, {Component} from 'react';
import AircraftServices from "../../services/AircraftServices";
import Aircraft from "../reusableComponents/entities/Aircraft";
import Sidebar from "../nav_bars/Sidebar";

class UpdateAircraftComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Aircraft
                    history={this.props.history}
                    id={this.state.id}
                    button='Update'
                    title='Update Aircraft'
                />
            </div>
        );
    }
}

export default UpdateAircraftComponent;