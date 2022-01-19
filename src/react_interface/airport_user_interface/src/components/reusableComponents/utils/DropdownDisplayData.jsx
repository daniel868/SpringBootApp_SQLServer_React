import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";
import {CgMoreVertical} from "react-icons/all";

class DropdownDisplayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: []
        }
    }

    componentDidMount() {
        this.setState({apiData:this.props.apiData})
    }

    render() {
        return (
            <div >
                <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                        <CgMoreVertical/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            this.state.apiData.map(data =>
                                <Dropdown.Item>{data}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

export default DropdownDisplayData;