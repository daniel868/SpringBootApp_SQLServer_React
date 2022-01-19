import React, {Component} from 'react';
import styled from "styled-components";
import {themeColor} from "../dashboard_components/utils"

const Div = styled.div`
    padding: 0.3rem 1rem;
    border-radius: 1rem;
    font-weight: 500;
    color: white;
    background-color: ${themeColor};
    cursor: pointer;
`;

class Badge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Div>
                {this.props.content}
            </Div>
        );
    }
}


export default Badge;