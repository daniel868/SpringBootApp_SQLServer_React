import React, {Component} from 'react';
import Aircraft from "../reusableComponents/entities/Aircraft";
import Sidebar from "../nav_bars/Sidebar";

class CreateAircraftComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Aircraft
                    history={this.props.history}
                    button='Save'
                    title='Insert Aircraft'
                />
            </div>
        );
    }
}

export default CreateAircraftComponent;