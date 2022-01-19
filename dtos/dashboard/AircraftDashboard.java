package com.example.airport.dtos.dashboard;

public class AircraftDashboard {
    private String totalFlights;
    private String localNumberOfFlights;
    private String aircraftName;
    private float percentage;

    public float getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }

    public String getTotalFlights() {
        return totalFlights;
    }

    public void setTotalFlights(String totalFlights) {
        this.totalFlights = totalFlights;
    }

    public String getLocalNumberOfFlights() {
        return localNumberOfFlights;
    }

    public void setLocalNumberOfFlights(String localNumberOfFlights) {
        this.localNumberOfFlights = localNumberOfFlights;
    }

    public String getAircraftName() {
        return aircraftName;
    }

    public void setAircraftName(String aircraftName) {
        this.aircraftName = aircraftName;
    }
}
