import React, {Component} from 'react';
import styled from "styled-components";
import Badge from "./Badge";
import {cardShadow, hoverEffect, themeColor} from "./utils"
import {Button} from "react-bootstrap";
import DashboardService from "../../services/DashboardService";

class MostUsedAircraft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromAPi: []
        }
    }

    componentDidMount() {
        DashboardService.getMostUsedPlanes().then((result => {
            console.log(result.data)
            this.setState({dataFromAPi: result.data})
        }))
    }

    render() {
        return (
            <div className="text-center">
                <h5 style={{marginTop: 10}}>Most used planes</h5>
                <InfoCard>
                    {
                        this.state.dataFromAPi.map((currentValue, index) => {
                            if (index < 2) {
                                return <Card>
                                    <CardContent>
                                        <Row>
                                            <Digit>{currentValue.localNumberOfFlights}</Digit>
                                            <InfoContainer>
                                                <Title>{currentValue.aircraftName}</Title>
                                                <SubTitle>{currentValue.percentage.toFixed(1)}% flights</SubTitle>
                                            </InfoContainer>
                                        </Row>
                                    </CardContent>
                                </Card>
                            }
                        })
                    }
                </InfoCard>
            </div>
        );
    }
}

const InfoCard = styled.div`
  height: 85%;
  width: 20rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const Card = styled.div`
  background-color: rgba(183, 194, 243, 0.3);
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  padding: 0.7rem 1rem 0.3rem 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  ${({justify}) =>
    justify &&
    `
      justify-content:space-around;
      width:90%
  `}
`;
const Digit = styled.div`
  background-color: ${themeColor};
  padding: 0.8rem 1rem;
  font-size: 0.7rem;
  border-radius: 1rem;
`;
const InfoContainer = styled.div`
  margin-left: 0.7rem;
`;
const Title = styled.h6`
  color: black;
`;
const SubTitle = styled.h6`
  color: #333333;
  font-weight: normal;
`;

export default MostUsedAircraft;