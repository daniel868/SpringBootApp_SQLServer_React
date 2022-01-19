import React, {Component} from 'react';
import Client from "../reusableComponents/entities/Client";
import Sidebar from "../nav_bars/Sidebar";

class UpdateClientComponent extends Component {
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
                <Client
                    id = {this.state.id}
                    history={this.props.history}
                    button='Update'
                    title='Update client'
                />
            </div>
        );
    }
}

export default UpdateClientComponent;