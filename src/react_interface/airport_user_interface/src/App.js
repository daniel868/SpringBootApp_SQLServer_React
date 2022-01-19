import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateCompanyComponent from "./components/add_components/CreateCompanyComponent";
import CreateEmployeeComponent from "./components/add_components/CreateEmployeeComponent";
import CreateFlightComponent from "./components/add_components/CreateFlightComponent";
import CreateClientComponent from "./components/add_components/CreateClientComponent";
import SearchEmployeeComponent from "./components/list_components/home/SearchEmployeeComponent";
import DepartureFlightComponent from "./components/list_components/flight/DepartureFlightComponent";
import ArrivalFlightsComponent from "./components/list_components/flight/ArrivalFlightsComponent";
import SearchAircraftComponent from "./components/list_components/flight/SearchAircraftComponent";
import SearchCompaniesComponent from "./components/list_components/companies/SearchCompaniesComponent";
import SearchClientsComponent from "./components/list_components/clients/SearchClientsComponent";
import MainPage from "./components/MainPage";
import * as React from "react";
import UpdateFlightComponent from "./components/update_components/UpdateFlightComponent";
import UpdateAircraftComponent from "./components/update_components/UpdateAircraftComponent";
import CreateAircraftComponent from "./components/add_components/CreateAircraftComponent";
import UpdateClientComponent from "./components/update_components/UpdateClientComponent";
import UpdateCompanyComponent from "./components/update_components/UpdateCompanyComponent";
import UpdateEmployeeComponent from "./components/update_components/UpdateEmployeeComponent";
import LoginComponent from "./LoginComponent";
import CreateUserComponent from "./components/add_components/CreateUserComponent";
import UpdateUserComponent from "./components/update_components/UpdateUserComponent";
import SearchUser from "./components/list_components/user/SearchUser";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetail: ''
        }
        this.parentCallback = this.parentCallback.bind(this)
    }

    parentCallback = (parseData) => {
        this.setState({userDetail: parseData.insertedUsername})
        console.log(parseData)
        localStorage.setItem("username",parseData.insertedUsername)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={(props) =>
                        <LoginComponent parentCallback={this.parentCallback} {...props} />}/>
                    <Route exact path='/home' render={(props) =>
                        <MainPage userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route exact path='/home/search-for-employee' render={(props) =>
                        <SearchEmployeeComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/flight/departure-flight' exact render={(props) =>
                        <DepartureFlightComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/flight/arrival-flight' exact render={(props) =>
                        <ArrivalFlightsComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/flight/aircraft' exact render={(props) =>
                        <SearchAircraftComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/clients' exact render={(props) =>
                        <SearchClientsComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/companies' exact render={(props) =>
                        <SearchCompaniesComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/home/users' exact render={(props) =>
                        <SearchUser userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-flight' exact render={(props) =>
                        <CreateFlightComponent  userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-user' exact render={(props) =>
                        <CreateUserComponent  userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-aircraft' exact render={(props) =>
                        <CreateAircraftComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-employee' exact render={(props) =>
                        <CreateEmployeeComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-company' exact render={(props) =>
                        <CreateCompanyComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/add-new-client' exact render={(props) =>
                        <CreateClientComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-flight/:id' exact render={(props) =>
                        <UpdateFlightComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-aircraft/:id' exact render={(props) =>
                        <UpdateAircraftComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-client/:id' exact render={(props) =>
                        <UpdateClientComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-company/:id' exact render={(props) =>
                        <UpdateCompanyComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-employee/:id' exact render={(props) =>
                        <UpdateEmployeeComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                    <Route path='/update-user/:id' exact render={(props) =>
                        <UpdateUserComponent userDetail={localStorage.getItem("username")} {...props} />}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
