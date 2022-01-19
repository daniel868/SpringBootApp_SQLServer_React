package com.example.airport.dtos.employees;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmployeeUtils implements UtilsInterface<Employee> {

    @Autowired
    public EmployeeUtils() {
    }

    @Override
    public void copyData(Employee oldValue, Employee newValue) {
        oldValue.setName(newValue.getName() != null ? newValue.getName() : oldValue.getName());
        oldValue.setSurname(newValue.getSurname() != null ? newValue.getSurname() : oldValue.getSurname());
        oldValue.setPhoneNumber(newValue.getPhoneNumber() != null ? newValue.getPhoneNumber() : oldValue.getPhoneNumber());
        oldValue.setJobName(newValue.getJobName() != null ? newValue.getJobName() : oldValue.getJobName());
        oldValue.setEmailAddress(newValue.getEmailAddress() != null ? newValue.getEmailAddress() : oldValue.getEmailAddress());
        oldValue.setBirthDate(newValue.getBirthDate() != null ? newValue.getBirthDate() : oldValue.getBirthDate());
    }
}
