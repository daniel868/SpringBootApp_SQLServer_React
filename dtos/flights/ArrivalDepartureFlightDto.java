package com.example.airport.dtos.flights;

import com.example.airport.entities.Flight;

public class ArrivalDepartureFlightDto {
    private String aircraftName;
    private Flight flight;
    private float averageSpeed;

    public ArrivalDepartureFlightDto(String aircraftName, Flight flight) {
        this.aircraftName = aircraftName;
        this.flight = flight;
    }

    public ArrivalDepartureFlightDto(String aircraftName, Flight flight, float averageSpeed) {
        this.aircraftName = aircraftName;
        this.flight = flight;
        this.averageSpeed = averageSpeed;
    }

    public ArrivalDepartureFlightDto() {
    }

    public String getAircraftName() {
        return aircraftName;
    }

    public void setAircraftName(String aircraftName) {
        this.aircraftName = aircraftName;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public float getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(float averageSpeed) {
        this.averageSpeed = averageSpeed;
    }
}
