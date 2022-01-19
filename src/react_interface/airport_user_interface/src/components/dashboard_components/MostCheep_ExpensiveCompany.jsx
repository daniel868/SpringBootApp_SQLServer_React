import React, {Component} from 'react';
import styled from "styled-components";
import Badge from "./Badge";
import OtopeniAvatar from "./utils/otopeniAvatar.jpg"
import {cardShadow, hoverEffect, themeColor} from "./utils"
import DashboardService from "../../services/DashboardService";
import expensive from "./utils/expensive.png"

class MostCheep_ExpensiveCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cheepDataApi: '',
            expensiveDataApi: ''
        }
    }

    componentDidMount() {
        DashboardService.getExpensiveFlight().then(result => {
            console.log(result.data)
            this.setState({expensiveDataApi: result.data})
        })
        DashboardService.getCheepFlight().then(result => {
            console.log(result.data)
            this.setState({cheepDataApi: result.data})
        })
    }

    render() {
        return (
            <RecommendProject>
                <CardContent>
                    <Detail>
                        <InfoContainer>
                            <Avatar>
                                <img src={expensive} alt=""/>
                            </Avatar>
                            <Info>
                                <InfoName>{this.state.expensiveDataApi.companyName}</InfoName>
                                <InfoUpdate>{this.state.expensiveDataApi.flightDetails}</InfoUpdate>
                            </Info>
                        </InfoContainer>
                        <Badge content={this.state.expensiveDataApi.price}/>
                    </Detail>
                     <div style={{marginTop:10}}>
                    <Detail>
                        <InfoContainer>
                            <Avatar>
                                <img src={expensive} alt=""/>
                            </Avatar>
                            <Info>
                                <InfoName>{this.state.cheepDataApi.companyName}</InfoName>
                                <InfoUpdate>{this.state.cheepDataApi.flightDetails}</InfoUpdate>
                            </Info>
                        </InfoContainer>
                        <Badge content={this.state.cheepDataApi.price}/>
                    </Detail>
                     </div>
                </CardContent>
            </RecommendProject>
        );
    }
}

const RecommendProject = styled.div`
  border-radius: 1rem;
  height: 130%;
  padding: 1rem;
  background-color: white;
  width: 27.5vw;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    width: 80%;
    margin: 2rem 0;
  }
`;

const CardContent = styled.div`
  margin: 0.4rem;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.2rem;
    margin-bottom: 1rem;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Avatar = styled.div`
  margin-right: 1rem;
  img {
    height: 5rem;
    border-radius: 5rem;
  }
`;
const Info = styled.div``;
const InfoName = styled.h5`
  font-weight: 500;
`;
const InfoUpdate = styled.h6`
  font-weight: 300;
`;

export default MostCheep_ExpensiveCompany;