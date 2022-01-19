package com.example.airport.entities;

import com.example.airport.entities.manyToManyMapping.CompaniesFlights;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "flights")
@NaturalIdCache
@org.hibernate.annotations.Cache(
        usage = CacheConcurrencyStrategy.READ_WRITE
)
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_location")
    private String fromLocation;

    @Column(name = "to_location")
    private String toLocation;

    @Column(name = "cost")
    private float cost;

    @Column(name = "departure_date_time")
    private String departureDateTime;

    @Column(name = "landing_date_time")
    private String landingDateTime;


    @OneToMany(cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "flight_id", referencedColumnName = "id")
    private List<Client> clientList = new ArrayList<>();

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<CompaniesFlights> companiesFlights = new ArrayList<>();

    public Flight() {
    }

    public Flight(String from, String to, float cost, String departureDateTime, String landingDateTime) {
        this.fromLocation = from;
        this.toLocation = to;
        this.cost = cost;
        this.departureDateTime = departureDateTime;
        this.landingDateTime = landingDateTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
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

    public List<Client> getClientList() {
        return clientList;
    }

    public void setClientList(List<Client> clientList) {
        this.clientList = clientList;
    }

    public List<CompaniesFlights> getCompaniesFlights() {
        return companiesFlights;
    }

    public void setCompaniesFlights(List<CompaniesFlights> companiesFlights) {
        this.companiesFlights = companiesFlights;
    }

    @Override
    public String toString() {
        return "Flight{" +
                "id=" + id +
                ", fromLocation='" + fromLocation + '\'' +
                ", toLocation='" + toLocation + '\'' +
                ", cost=" + cost +
                ", departureDateTime='" + departureDateTime + '\'' +
                ", landingDateTime='" + landingDateTime + '\'' +
                ", clientList=" + clientList +
                '}';
    }
}
