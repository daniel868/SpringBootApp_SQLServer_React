package com.example.airport.entities;

import com.example.airport.entities.manyToManyMapping.CompaniesFlights;
import com.example.airport.entities.manyToManyMapping.EmployeesCompanies;
import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "companies")
@NaturalIdCache
@org.hibernate.annotations.Cache(
        usage = CacheConcurrencyStrategy.READ_WRITE
)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "business_fiscal_value")
    private float businessFiscalValue;

    @Column(name = "year")
    private String year;

    @Column(name = "employees_amount")
    private int employeesAmount;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonBackReference
    private List<EmployeesCompanies> employeesCompanies = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonBackReference
    private List<CompaniesFlights> companiesFlights = new ArrayList<>();


    public Company() {

    }

    public Company(String companyName, float businessFiscalValue, String year, int employeesAmount) {
        this.companyName = companyName;
        this.businessFiscalValue = businessFiscalValue;
        this.year = year;
        this.employeesAmount = employeesAmount;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", businessFiscalValue=" + businessFiscalValue +
                ", year='" + year + '\'' +
                ", employeesAmount=" + employeesAmount +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public float getBusinessFiscalValue() {
        return businessFiscalValue;
    }

    public void setBusinessFiscalValue(float businessFiscalValue) {
        this.businessFiscalValue = businessFiscalValue;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public int getEmployeesAmount() {
        return employeesAmount;
    }

    public void setEmployeesAmount(int employeesAmount) {
        this.employeesAmount = employeesAmount;
    }

    public List<EmployeesCompanies> getEmployeesCompanies() {
        return employeesCompanies;
    }

    public void setEmployeesCompanies(List<EmployeesCompanies> employeesCompanies) {
        this.employeesCompanies = employeesCompanies;
    }

    public List<CompaniesFlights> getCompaniesFlights() {
        return companiesFlights;
    }

    public void setCompaniesFlights(List<CompaniesFlights> companiesFlights) {
        this.companiesFlights = companiesFlights;
    }
}
