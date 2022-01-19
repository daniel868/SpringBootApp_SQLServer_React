import React, {Component} from 'react';
import Flight from "../reusableComponents/entities/Flight";
import Sidebar from "../nav_bars/Sidebar";

class UpdateFlightComponent extends Component {
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
                <Flight
                    history={this.props.history}
                    id={this.state.id}
                    button='Update'
                    title='Update Flight'
                />
            </div>
        );
    }
}

export default UpdateFlightComponent;