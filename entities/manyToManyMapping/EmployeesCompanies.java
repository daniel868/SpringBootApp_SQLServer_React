package com.example.airport.entities.manyToManyMapping;

import com.example.airport.entities.Company;
import com.example.airport.entities.Employee;
import com.example.airport.entities.compositeKeys.EmployeesCompaniesId;
import org.springframework.web.bind.annotation.Mapping;

import javax.persistence.*;

@Entity
@Table(name = "employees_companies")
public class EmployeesCompanies {

    @EmbeddedId
    private EmployeesCompaniesId id = new EmployeesCompaniesId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("employeeId")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("companyId")
    private Company company;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "employee_surname")
    private String employeeSurname;

    public EmployeesCompanies() {
    }

    public EmployeesCompanies(String companyName, String employeeName, String employeeSurname) {
        this.companyName = companyName;
        this.employeeName = employeeName;
        this.employeeSurname = employeeSurname;
    }

    public EmployeesCompaniesId getId() {
        return id;
    }

    public void setId(EmployeesCompaniesId id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeSurname() {
        return employeeSurname;
    }

    public void setEmployeeSurname(String employeeSurname) {
        this.employeeSurname = employeeSurname;
    }
}