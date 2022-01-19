package com.example.airport.dtos.companies;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.Company;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

public class CompanyDto implements DtoInterface<CompanyDto, Company> {

    private Long id;
    private String companyName;
    private float businessFiscalValue;
    private String year;
    private int employeesAmount;
    private List<String> flightsInformation = new ArrayList<>();

    private int numberOfEmployee;

    @Override
    public Company mapTo(CompanyDto to) {
        Company company = new Company();
        company.setCompanyName(to.getCompanyName());
        company.setYear(to.getYear());
        company.setEmployeesAmount(to.getEmployeesAmount());
        company.setBusinessFiscalValue(to.getBusinessFiscalValue());
        company.setId(to.getId());
        return company;
    }

    @Override
    public CompanyDto mapFrom(Company from) {
        return null;
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

    public List<String> getFlightsInformation() {
        return flightsInformation;
    }

    public void setFlightsInformation(List<String> flightsInformation) {
        this.flightsInformation = flightsInformation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfEmployee() {
        return numberOfEmployee;
    }

    public void setNumberOfEmployee(int numberOfEmployee) {
        this.numberOfEmployee = numberOfEmployee;
    }

    @Override
    public String toString() {
        return "CompanyDto{" +
                "companyName='" + companyName + '\'' +
                ", businessFiscalValue=" + businessFiscalValue +
                ", year='" + year + '\'' +
                ", employeesAmount=" + employeesAmount +
                ", flightsInformation=" + flightsInformation +
                '}';
    }
}
