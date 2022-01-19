import React, {Component} from 'react';
import Sidebar from "../nav_bars/Sidebar";
import User from "../reusableComponents/entities/User";

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }
    render() {
        return (
            <div>
                <Sidebar userDetail={this.props.userDetail}/>
                <User
                    history={this.props.history}
                    id={this.state.id}
                    button='Update'
                    title='Update User'
                />
            </div>
        );
    }
}

export default UpdateUserComponent;