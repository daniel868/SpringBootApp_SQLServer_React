import React, {Component} from 'react';
import Client from "../reusableComponents/entities/Client";
import Sidebar from "../nav_bars/Sidebar";

class CreateClientComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Client
                    history={this.props.history}
                    button='Save'
                    title='Insert client'
                />
            </div>
        );
    }
}

export default CreateClientComponent;