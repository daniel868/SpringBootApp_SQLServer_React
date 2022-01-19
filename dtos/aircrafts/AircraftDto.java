package com.example.airport.dtos.aircrafts;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.Aircraft;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AircraftDto implements DtoInterface<Aircraft, AircraftDto> {
    private Long id;
    private String aircraftType;
    private String engineNumber;
    private String seatsNumber;
    private String workingHour;
    private String maxSpeed;

    private String numberOfFlights;

    @Autowired
    public AircraftDto() {
    }

    public AircraftDto(String aircraftType, String engineNumber, String seatsNumber, String workingHour, String maxSpeed) {
        this.aircraftType = aircraftType;
        this.engineNumber = engineNumber;
        this.seatsNumber = seatsNumber;
        this.workingHour = workingHour;
        this.maxSpeed = maxSpeed;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
    }

    public String getSeatsNumber() {
        return seatsNumber;
    }

    public void setSeatsNumber(String seatsNumber) {
        this.seatsNumber = seatsNumber;
    }

    public String getWorkingHour() {
        return workingHour;
    }

    public void setWorkingHour(String workingHour) {
        this.workingHour = workingHour;
    }

    public String getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(String maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public String getNumberOfFlights() {
        return numberOfFlights;
    }

    public void setNumberOfFlights(String numberOfFlights) {
        this.numberOfFlights = numberOfFlights;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public AircraftDto mapTo(Aircraft to) {
        AircraftDto aircraftDto = new AircraftDto();
        aircraftDto.setAircraftType(to.getAircraftType());
        aircraftDto.setEngineNumber(String.valueOf(to.getEngineNumber()));
        aircraftDto.setMaxSpeed(String.valueOf(to.getMaxSpeed()));
        aircraftDto.setWorkingHour(String.valueOf(to.getWorkingHour()));
        aircraftDto.setSeatsNumber(String.valueOf(to.getSeatsNumber()));
        aircraftDto.setId(to.getId());
        return aircraftDto;
    }

    @Override
    public Aircraft mapFrom(AircraftDto from) {
        Aircraft aircraft = new Aircraft();
        aircraft.setAircraftType(from.getAircraftType());
        aircraft.setEngineNumber(from.getEngineNumber() != null ? Integer.parseInt(from.getEngineNumber()) : 0);
        aircraft.setMaxSpeed(from.getMaxSpeed() != null ? Float.parseFloat(from.getMaxSpeed()) : 0.0f);
        aircraft.setSeatsNumber(from.getSeatsNumber() != null ? Integer.parseInt(from.getSeatsNumber()) : 0);
        aircraft.setWorkingHour(from.getWorkingHour() != null ? Float.parseFloat(from.getWorkingHour()) : 0.0f);

        return aircraft;
    }

    @Override
    public String toString() {
        return "AircraftDto{" +
                "id=" + id +
                ", aircraftType='" + aircraftType + '\'' +
                ", engineNumber='" + engineNumber + '\'' +
                ", seatsNumber='" + seatsNumber + '\'' +
                ", workingHour='" + workingHour + '\'' +
                ", maxSpeed='" + maxSpeed + '\'' +
                ", numberOfFlights='" + numberOfFlights + '\'' +
                '}';
    }
}
