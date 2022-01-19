package com.example.airport.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aircraft")
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aicraft_type")
    private String aircraftType;

    @Column(name = "engine_number")
    private int engineNumber;

    @Column(name = "seats_number")
    private int seatsNumber;

    @Column(name = "working_hour")
    private float workingHour;

    @Column(name = "max_speed")
    private float maxSpeed;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="aicraft_id",referencedColumnName = "id")
    @JsonBackReference
    private List<Flight> flightList = new ArrayList<>();

    public Aircraft() {
    }

    public Aircraft(String aircraftType, int engineNumber, int seatsNumber, float workingHour, float maxSpeed) {
        this.aircraftType = aircraftType;
        this.engineNumber = engineNumber;
        this.seatsNumber = seatsNumber;
        this.workingHour = workingHour;
        this.maxSpeed = maxSpeed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public int getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(int engineNumber) {
        this.engineNumber = engineNumber;
    }

    public int getSeatsNumber() {
        return seatsNumber;
    }

    public void setSeatsNumber(int seatsNumber) {
        this.seatsNumber = seatsNumber;
    }

    public float getWorkingHour() {
        return workingHour;
    }

    public void setWorkingHour(float workingHour) {
        this.workingHour = workingHour;
    }

    public float getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(float maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public List<Flight> getFlightList() {
        return flightList;
    }

    public void setFlightList(List<Flight> flightList) {
        this.flightList = flightList;
    }

    @Override
    public String toString() {
        return "Aircraft{" +
                "id=" + id +
                ", aircraftType='" + aircraftType + '\'' +
                ", engineNumber=" + engineNumber +
                ", seatsNumber=" + seatsNumber +
                ", workingHour=" + workingHour +
                ", maxSpeed=" + maxSpeed +
                ", flightList=" + flightList +
                '}';
    }
}
