package com.example.airport.dtos.flights;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.Flight;
import org.springframework.stereotype.Component;

@Component
public class FlightDto implements DtoInterface<FlightDto,Flight> {

    private String fromLocation;
    private String toLocation;
    private String price;
    private String departureDateTime;
    private String landingDateTime;
    private String aircraftName;

    public FlightDto() {
    }


    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDepartureDateTime() {
        return departureDateTime;
    }

    public void setDepartureDateTime(String departureDateTime) {
        this.departureDateTime = departureDateTime;
    }

    public String getLandingDateTime() {
        return landingDateTime;
    }

    public void setLandingDateTime(String landingDateTime) {
        this.landingDateTime = landingDateTime;
    }

    public String getAircraftName() {
        return aircraftName;
    }

    public void setAircraftName(String aircraftName) {
        this.aircraftName = aircraftName;
    }


    @Override
    public Flight mapTo(FlightDto to) {
        Flight flight = new Flight();
        flight.setDepartureDateTime(to.getDepartureDateTime());
        flight.setLandingDateTime(to.getLandingDateTime());
        flight.setFromLocation(to.getFromLocation());
        flight.setToLocation(to.getToLocation());
        flight.setCost(Float.parseFloat(to.getPrice()));

        return flight;
    }

    @Override
    public FlightDto mapFrom(Flight from) {
        return null;
    }

    @Override
    public String toString() {
        return "FlightDto{" +
                "fromLocation='" + fromLocation + '\'' +
                ", toLocation='" + toLocation + '\'' +
                ", cost='" + price + '\'' +
                ", departureDateTime='" + departureDateTime + '\'' +
                ", landingDateTime='" + landingDateTime + '\'' +
                ", aircraftName='" + aircraftName + '\'' +
                '}';
    }
}
