import React, {Component} from 'react';
import {Dropdown} from "react-bootstrap";
import {AiOutlineMore} from "react-icons/ai";
import {CgMoreVertical} from "react-icons/all";

class UpdateDeleteDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id
        }
    }

    updateFunc = (id) => {
        this.props.updateItem(id)
    }
    deleteFunc = (id) => {
        this.props.deleteItem(id)
    }


    render() {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                    <CgMoreVertical/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => this.updateFunc(this.state.id)}>Update</Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => this.deleteFunc(this.state.id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default UpdateDeleteDropdown;