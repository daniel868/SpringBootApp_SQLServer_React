import React, {Component} from 'react';
import DashboardSidebar from "./dashboard_components/DashboardSidebar";
import DashboardContent from "./dashboard_components/DashboardContent";
import styled from "styled-components";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: ''
        }

    }

    render() {
        return (
            <div style={{marginLeft: 10, marginTop: 10, marginRight: 10}}>
                <Container>
                    <DashboardSidebar userDetail={this.props.userDetail} history = {this.props.history}/>
                    <DashboardContent history={this.props.history}/>
                </Container>
            </div>
        );
    }
}

const Container = styled.div`
     display: flex;
     height: 97vh;
     background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
     border-radius: 2rem;
`;
export default MainPage;