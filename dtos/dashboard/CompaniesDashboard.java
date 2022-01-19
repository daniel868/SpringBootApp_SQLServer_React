package com.example.airport.dtos.dashboard;

public class CompaniesDashboard {
    private String companyName;
    private int employeeAmount;
    private int flightsAmount;

    public int getFlightsAmount() {
        return flightsAmount;
    }

    public void setFlightsAmount(int flightsAmount) {
        this.flightsAmount = flightsAmount;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getEmployeeAmount() {
        return employeeAmount;
    }

    public void setEmployeeAmount(int employeeAmount) {
        this.employeeAmount = employeeAmount;
    }
}
