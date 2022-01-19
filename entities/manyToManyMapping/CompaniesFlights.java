package com.example.airport.entities.manyToManyMapping;

import com.example.airport.entities.Company;
import com.example.airport.entities.Flight;
import com.example.airport.entities.compositeKeys.CompaniesFlightsId;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "companies_flight")
public class CompaniesFlights {

    @EmbeddedId
    private CompaniesFlightsId id = new CompaniesFlightsId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("companyId")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("flightId")
    private Flight flight;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "from_location")
    private String fromLocation;

    @Column(name = "to_location")
    private String toLocation;

    public CompaniesFlights() {
    }

    public CompaniesFlights(String companyName, String fromLocation, String toLocation) {
        this.companyName = companyName;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
    }

    public CompaniesFlightsId getId() {
        return id;
    }

    public void setId(CompaniesFlightsId id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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
}
