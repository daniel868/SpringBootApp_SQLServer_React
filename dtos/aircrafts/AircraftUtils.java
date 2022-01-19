package com.example.airport.dtos.aircrafts;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.Aircraft;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AircraftUtils implements UtilsInterface<Aircraft> {

    @Autowired
    public AircraftUtils() {
    }

    @Override
    public void copyData(Aircraft oldValue, Aircraft newValue) {
        oldValue.setAircraftType(newValue.getAircraftType() != null ? newValue.getAircraftType() : oldValue.getAircraftType());
        oldValue.setWorkingHour(newValue.getWorkingHour() != 0 ? newValue.getWorkingHour() : oldValue.getWorkingHour());
        oldValue.setMaxSpeed(newValue.getMaxSpeed() != 0 ? newValue.getMaxSpeed() : oldValue.getMaxSpeed());
        oldValue.setEngineNumber(newValue.getEngineNumber() != 0 ? newValue.getEngineNumber() : oldValue.getEngineNumber());
        oldValue.setSeatsNumber(newValue.getSeatsNumber() != 0 ? newValue.getSeatsNumber() : oldValue.getSeatsNumber());

    }
}
