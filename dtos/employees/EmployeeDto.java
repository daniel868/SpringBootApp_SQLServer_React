package com.example.airport.dtos.employees;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.Employee;

import java.util.ArrayList;
import java.util.List;

public class EmployeeDto implements DtoInterface<EmployeeDto, Employee> {
    private Long id;

    private String name;

    private String surname;

    private String birthDate;

    private String jobName;

    private String phoneNumber;

    private String emailAddress;

    private int jobCount;

    private List<String> employeeCompaniesInfo = new ArrayList<>();

    @Override
    public Employee mapTo(EmployeeDto to) {
        Employee employee = new Employee();
        employee.setEmailAddress(to.getEmailAddress());
        employee.setSurname(to.getSurname());
        employee.setName(to.getName());
        employee.setBirthDate(to.getBirthDate());
        employee.setJobName(to.getJobName());
        employee.setPhoneNumber(to.getPhoneNumber());

        return employee;
    }

    @Override
    public EmployeeDto mapFrom(Employee from) {
        return null;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public List<String> getEmployeeCompaniesInfo() {
        return employeeCompaniesInfo;
    }

    public void setEmployeeCompaniesInfo(List<String> employeeCompaniesInfo) {
        this.employeeCompaniesInfo = employeeCompaniesInfo;
    }

    public int getJobCount() {
        return jobCount;
    }

    public void setJobCount(int jobCount) {
        this.jobCount = jobCount;
    }

    @Override
    public String toString() {
        return "EmployeeDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", jobName='" + jobName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", jobCount=" + jobCount +
                ", employeeCompaniesInfo=" + employeeCompaniesInfo +
                '}';
    }
}
