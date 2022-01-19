import React, {Component} from 'react';
import Company from "../reusableComponents/entities/Company";
import Sidebar from "../nav_bars/Sidebar";

class UpdateCompanyComponent extends Component {
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
                <Company
                    id = {this.state.id}
                    history ={this.props.history}
                    button ='Update'
                    title = 'Update Company'
                />
            </div>
        );
    }
}

export default UpdateCompanyComponent;