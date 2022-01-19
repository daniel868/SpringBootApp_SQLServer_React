package com.example.airport.entities.compositeKeys;

import com.example.airport.entities.Company;
import com.example.airport.entities.Flight;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class CompaniesFlightsId implements Serializable {
    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "company_id")
    private Long companyId;

    public Long getFlightId() {
        return flightId;
    }

    public void setFlightId(Long flightId) {
        this.flightId = flightId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }
}
