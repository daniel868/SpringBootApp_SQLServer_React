import React, {Component} from 'react';
import Flight from "../reusableComponents/entities/Flight";
import Sidebar from "../nav_bars/Sidebar";

class CreateFlightComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Flight
                    history={this.props.history}
                    button='Save'
                    title='Insert new flight'
                />
            </div>
        );
    }
}

export default CreateFlightComponent;