package com.example.airport.dtos.companies;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyUtils implements UtilsInterface<Company> {
    @Autowired
    public CompanyUtils() {
    }

    @Override
    public void copyData(Company oldValue, Company newValue) {
        oldValue.setCompanyName(newValue.getCompanyName() != null ? newValue.getCompanyName() : oldValue.getCompanyName());
        oldValue.setYear(newValue.getYear() != null ? newValue.getYear() : oldValue.getYear());
        oldValue.setEmployeesAmount(newValue.getEmployeesAmount() != 0 ? newValue.getEmployeesAmount() : oldValue.getEmployeesAmount());
        oldValue.setBusinessFiscalValue(newValue.getBusinessFiscalValue() != 0.0 ? newValue.getBusinessFiscalValue() : oldValue.getBusinessFiscalValue());
    }
}
