import React from 'react';
import {FaPlane, FaPlaneArrival, FaPlaneDeparture} from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {IoMdPeople} from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {BiSearch, GiCommercialAirplane, MdOutlineBusinessCenter,FaUserAlt} from "react-icons/all";

export const SidebarData = [
    {
        title: 'Home',
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'Search for employees',
                path: '/home/search-for-employee',
                icon: <BiSearch/>
            },
            {
                title: 'Users',
                path: '/home/users',
                icon: <FaUserAlt/>
            }
        ]
    },
    {
        title: 'Flights',
        icon: <FaPlane/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'Departure flights',
                path: '/flight/departure-flight',
                icon: <FaPlaneDeparture/>,
                cName: 'sub-nav'
            },
            {
                title: 'Arrival flights',
                path: '/flight/arrival-flight',
                icon: <FaPlaneArrival/>,
                cName: 'sub-nav'
            },
            {
                title:'Aircraft',
                path: '/flight/aircraft',
                icon: <GiCommercialAirplane/>,
                cName: 'sub-nav'
            }
        ]
    },
    {
        title: 'Clients',
        path: '/clients',
        icon: <IoMdPeople/>
    },
    {
        title: 'Companies',
        path: '/companies',
        icon: <MdOutlineBusinessCenter/>
    }
];