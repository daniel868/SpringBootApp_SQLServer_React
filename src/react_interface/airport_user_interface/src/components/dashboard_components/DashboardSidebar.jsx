import React, {Component} from 'react';
import styled from "styled-components";
import Badge from "./Badge";
import {darkThemeColor} from "./utils";
import OtopeniAvatar from "./utils/otopeniAvatar.jpg"
import {SidebarData} from "../nav_bars/SidebarData";
import SubMenu from "../nav_bars/SubMenu";
import {Button} from "react-bootstrap";


class DashboardSidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <ProfileContainer>
                    <Avatar src={OtopeniAvatar} />
                    <Name>by: Alexandru-Șinc</Name>
                    <Button onClick={()=>this.props.history.push('/')}>Logout</Button>
                </ProfileContainer>
                <LinksContainer>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index}/>;
                    })}
                    <div className="text-center">
                        <h4 style={{color:"#ffffff"}}>Login as: {this.props.userDetail}</h4>
                    </div>
                </LinksContainer>
            </Container>
        );
    }
}

const Container = styled.div`
  width: 20%;
  height: 100% !important;
  border-radius: 2rem;
  background-color: #091322;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;

const Name = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;

const LinksContainer = styled.div`
  background-color: ${darkThemeColor};
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;
const ContactContainer = styled.div`
  width: 60%;
  background-color: #091322;
  color: #c4c4c4;
  height: 15%;
  margin: auto auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  a {
    color: white;
    text-decoration: none;
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin-bottom: 2rem;
  }
`;

export default DashboardSidebar;


