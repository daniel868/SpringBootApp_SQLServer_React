import React, {Component} from 'react';
import Company from "../reusableComponents/entities/Company";
import Sidebar from "../nav_bars/Sidebar";

class CreateCompanyComponent extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Sidebar userDetail = {this.props.userDetail}/>
                <Company
                    history ={this.props.history}
                    button ='Save'
                    title = 'Insert Company'
                />
            </div>
        );
    }
}

export default CreateCompanyComponent;