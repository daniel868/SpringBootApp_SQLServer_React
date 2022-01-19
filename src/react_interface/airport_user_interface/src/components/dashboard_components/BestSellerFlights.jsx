import React, {Component} from 'react';
import {cardShadow, hoverEffect, themeColor} from "./utils";
import styled from "styled-components";
import Badge from "./Badge";
import {Button} from "react-bootstrap";
import DashboardService from "../../services/DashboardService";
import best_seller from "./utils/best_seller.jpg"

class BestSellerFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
    }
    componentDidMount() {
        DashboardService.getBestSellerFlights().then((result => {
            console.log(result.data)
            this.setState({dataFromApi: result.data})
        }))
    }

    navigateToFlights = (event)=>{
        this.props.history.push('/flight/departure-flight')
    }

    render() {
        return (
            <InvoicesContainer>
                <CardContent>
                    {
                        this.state.dataFromApi.map((result,index)=>{
                            if (index<2){
                                return <Invoice>
                                    <Info>
                                        <Avatar>
                                            <img src={best_seller} alt=""/>
                                        </Avatar>
                                        <TextContainer>
                                            <Title>{result.flightDetails}</Title>
                                            <SubTitle>{result.companyName}</SubTitle>
                                        </TextContainer>
                                    </Info>
                                    <Container>
                                        <Badge content="Paid"/>
                                        <Price>$ {result.price} </Price>
                                    </Container>
                                </Invoice>
                            }
                        })
                    }
                </CardContent>
                <div className="text-center">
                    <Button
                        style={{background: "#ffffff", color: themeColor}}
                        onClick={this.navigateToFlights}>See all flights</Button>
                </div>
            </InvoicesContainer>
        );
    }
}

const InvoicesContainer = styled.div`
  width: 35rem;
  border-radius: 1rem;
  margin-top: 1rem;
  background-color: white;
  height: 160%;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CardContent = styled.div`
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin: 2rem 0;
  }
`;
const Invoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.4rem;
  padding-top: 0.6rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;
const Avatar = styled.div`
  img {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 3.5rem;
  }
`;
const TextContainer = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h6``;
const SubTitle = styled.h6`
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    gap: 0.6rem;
  }
`;
const Price = styled.div``;

export default BestSellerFlights;
