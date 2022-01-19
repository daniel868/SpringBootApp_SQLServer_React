package com.example.airport.dtos.dashboard;

public abstract class DashboardMethods {
    public AircraftDashboard mapFromInputAircraftDashboard(String inputAircraftDashboard) {
        String[] parts = inputAircraftDashboard.split(",");
        AircraftDashboard aircraftDashboard = new AircraftDashboard();
        aircraftDashboard.setTotalFlights(parts[0]);
        aircraftDashboard.setLocalNumberOfFlights(parts[1]);
        aircraftDashboard.setAircraftName(parts[2]);

        aircraftDashboard.setPercentage((Float.parseFloat(parts[1]) / Float.parseFloat(parts[0])) * 100);

        return aircraftDashboard;
    }

    public CompaniesDashboard mapFromInputCompaniesDashboard(String inputCompaniesDashboard) {
        String[] parts = inputCompaniesDashboard.split(",");
        CompaniesDashboard companiesDashboard = new CompaniesDashboard();
        companiesDashboard.setFlightsAmount(Integer.parseInt(parts[0]));
        companiesDashboard.setEmployeeAmount(Integer.parseInt(parts[1]));
        companiesDashboard.setCompanyName(parts[2]);

        return companiesDashboard;
    }

    public FlightDashboard mapFromInputFlightDashboard(String inputFlightDashboard) {
        String[] parts = inputFlightDashboard.split(",");
        FlightDashboard flightDashboard = new FlightDashboard();
        flightDashboard.setFlightDetails(parts[0]);
        flightDashboard.setPrice(Float.parseFloat(parts[1]));
        flightDashboard.setCompanyName(parts[2]);

        return flightDashboard;
    }

    public FlightDashboard mapFromInputCheepExpensiveFlight(String inputFlight) {
        String[] parts = inputFlight.split(",");
        FlightDashboard flightDashboard = new FlightDashboard();
        flightDashboard.setCompanyName(parts[0]);
        flightDashboard.setFlightDetails(parts[1]);
        flightDashboard.setPrice(Float.parseFloat(parts[2]));

        return flightDashboard;
    }
}
