import React, {Component} from 'react';
import Sidebar from "../nav_bars/Sidebar";
import Flight from "../reusableComponents/entities/Flight";
import User from "../reusableComponents/entities/User";

class CreateUserComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sidebar userDetail={this.props.userDetail}/>
                <User
                    history={this.props.history}
                    button='Save'
                    title='Insert new user'
                />
            </div>
        );
    }
}

export default CreateUserComponent;