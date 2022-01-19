package com.example.airport.dtos.flights;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FlightUtils implements UtilsInterface<Flight> {

    @Autowired
    public FlightUtils() {
    }

    @Override
    public void copyData(Flight oldValue, Flight newValue) {
        oldValue.setToLocation(newValue.getToLocation() == null ? oldValue.getToLocation() : newValue.getToLocation());
        oldValue.setFromLocation(newValue.getFromLocation() == null ? oldValue.getFromLocation() : newValue.getFromLocation());
        oldValue.setLandingDateTime(newValue.getLandingDateTime() == null ? oldValue.getLandingDateTime() : newValue.getLandingDateTime());
        oldValue.setDepartureDateTime(newValue.getDepartureDateTime() == null ? oldValue.getDepartureDateTime() : newValue.getDepartureDateTime());
        oldValue.setCost(newValue.getCost() == 0 ? oldValue.getCost() : newValue.getCost());
    }
}
