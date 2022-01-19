import React, {Component} from 'react';
import Employee from "../reusableComponents/entities/Employee";
import Sidebar from "../nav_bars/Sidebar";

class UpdateEmployeeComponent extends Component {
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
                <Employee
                    id={this.state.id}
                    history={this.props.history}
                    title='Update Employee'
                    button='Update'
                />
            </div>
        );
    }
}

export default UpdateEmployeeComponent;