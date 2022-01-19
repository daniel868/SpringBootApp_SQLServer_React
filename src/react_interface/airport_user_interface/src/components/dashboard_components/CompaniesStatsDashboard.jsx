import React, {Component} from 'react';
import {cardShadow, hoverEffect, themeColor} from "./utils";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import airlines from "./utils/airlines.jpg"
import DashboardService from "../../services/DashboardService";

class CompaniesStatsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
    }

    navigateToCompanies = (event) => {
        this.props.history.push('/companies')
    }

    componentDidMount() {
        DashboardService.getEmployeesCompanies().then(result => {
            console.log(result.data)
            this.setState({dataFromApi: result.data})
        })
    }

    render() {
        return (
            <div>
                <YourProjects>
                    {
                        this.state.dataFromApi.map(result => {
                            return <Project>
                                <Avatar>
                                    <img src={airlines} alt=""/>
                                </Avatar>
                                <Detail>
                                    <Title>{result.companyName}</Title>
                                    <SubTitle>Employees : {result.employeeAmount}</SubTitle>
                                    <SubTitle>Flights: {result.flightsAmount}</SubTitle>
                                </Detail>
                            </Project>
                        })
                    }

                    <div className="text-center">
                        <Button
                            style={{background: "#ffffff", color: themeColor}}
                            onClick={this.navigateToCompanies}>See all companies</Button>
                    </div>
                </YourProjects>
            </div>
        );
    }
}


const YourProjects = styled.div`
  height: 95%;
  background-color: white;
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    width: 75%;
    margin-top: 1rem;
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;
const Avatar = styled.div`
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 4rem;
  }
`;
const Detail = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h5`
  font-weight: 500;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;
const SubTitle = styled.h6`
  font-weight: 300;
`;
const AllProjects = styled.h6`
  text-align: end;
  color: ${themeColor};
  cursor: pointer;
`;

export default CompaniesStatsDashboard;