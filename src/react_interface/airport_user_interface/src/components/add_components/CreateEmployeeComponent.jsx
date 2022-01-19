import React, {Component} from 'react';
import Employee from "../reusableComponents/entities/Employee";
import Sidebar from "../nav_bars/Sidebar";

class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Employee
                    history = {this.props.history}
                    title = 'Insert Employee'
                    button = 'Save'
                />
            </div>
        );
    }
}

export default CreateEmployeeComponent;