import React, {Component} from 'react';
import styled from "styled-components";
import {Nav} from "react-bootstrap";
import {FiSearch} from "react-icons/all";
import {InputLabel} from "@mui/material";

class DashboardNavBar extends Component {
    render() {
        return (
            <NavbarContainer>
                <h4>
                    Airport Management System
                </h4>
                <InputContainer>
                    <Icon>
                        <FiSearch/>
                    </Icon>
                    <Input type="text" placeholder="Search for flights"/>
                </InputContainer>
            </NavbarContainer>
        );
    }
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
`;

const Icon = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: #dce4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  svg {
    color: #555555;
  }
`;
const Input = styled.input`
  border: none;
  background-color: #dce4ff;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: #464646;
  &:focus {
    border: none;
    outline: none;
  }
`;
export default DashboardNavBar;