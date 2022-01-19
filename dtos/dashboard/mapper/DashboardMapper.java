package com.example.airport.dtos.dashboard.mapper;

import com.example.airport.dtos.dashboard.AircraftDashboard;
import com.example.airport.dtos.dashboard.CompaniesDashboard;
import com.example.airport.dtos.dashboard.DashboardMethods;
import com.example.airport.dtos.dashboard.FlightDashboard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DashboardMapper extends DashboardMethods {
    private String inputAircraftDashboard;
    private String inputCompaniesDashboard;
    private String inputFlightDashboard;
    private String inputExpensiveFlight;
    private String inputCheepFlight;

    @Autowired
    public DashboardMapper() {
    }

    public String getInputAircraftDashboard() {
        return inputAircraftDashboard;
    }

    public void setInputAircraftDashboard(String inputAircraftDashboard) {
        this.inputAircraftDashboard = inputAircraftDashboard;
    }

    public String getInputCompaniesDashboard() {
        return inputCompaniesDashboard;
    }

    public void setInputCompaniesDashboard(String inputCompaniesDashboard) {
        this.inputCompaniesDashboard = inputCompaniesDashboard;
    }

    public String getInputFlightDashboard() {
        return inputFlightDashboard;
    }

    public void setInputFlightDashboard(String inputFlightDashboard) {
        this.inputFlightDashboard = inputFlightDashboard;
    }

    public String getInputExpensiveFlight() {
        return inputExpensiveFlight;
    }

    public void setInputExpensiveFlight(String inputExpensiveFlight) {
        this.inputExpensiveFlight = inputExpensiveFlight;
    }

    public String getInputCheepFlight() {
        return inputCheepFlight;
    }

    public void setInputCheepFlight(String inputCheepFlight) {
        this.inputCheepFlight = inputCheepFlight;
    }

    //map function
    public AircraftDashboard getAircraftDashboard() {
        return mapFromInputAircraftDashboard(inputAircraftDashboard);
    }

    public CompaniesDashboard getCompaniesDashboard() {
        return mapFromInputCompaniesDashboard(inputCompaniesDashboard);
    }

    public FlightDashboard getFlightDashboard() {
        return mapFromInputFlightDashboard(inputFlightDashboard);
    }

    public FlightDashboard getCheepFlightDashboard() {
        return mapFromInputCheepExpensiveFlight(inputCheepFlight);
    }

    public FlightDashboard getExpensiveFlightDashboard() {
        return mapFromInputCheepExpensiveFlight(inputExpensiveFlight);
    }
}
