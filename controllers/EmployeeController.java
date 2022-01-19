package com.example.airport.controllers;

import com.example.airport.dtos.employees.EmployeeDto;
import com.example.airport.dtos.employees.EmployeeUtils;
import com.example.airport.entities.Company;
import com.example.airport.entities.Employee;
import com.example.airport.entities.manyToManyMapping.EmployeesCompanies;
import com.example.airport.repositories.CompanyRepository;
import com.example.airport.repositories.EmployeeRepository;
import com.example.airport.repositories.manyToManyMapping.EmployeeCompaniesRepository;
import io.reactivex.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class EmployeeController {
    private final EmployeeCompaniesRepository employeeCompaniesRepository;
    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;

    private final EmployeeUtils utils;

    @Autowired
    public EmployeeController(EmployeeCompaniesRepository employeeCompaniesRepository, EmployeeRepository employeeRepository, CompanyRepository companyRepository, EmployeeUtils utils) {
        this.employeeCompaniesRepository = employeeCompaniesRepository;
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.utils = utils;
    }

    @GetMapping("/employees")
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.getAllEmployees()
                .stream().map(this::mapEmployee)
                .collect(Collectors.toList());
    }

    @GetMapping("/employees/{id}")
    public EmployeeDto getEmployeeById(@PathVariable Long id) {
        return mapEmployee(employeeRepository.getEmployeeById(id));
    }

    @PostMapping("/employees/insert-new-employee")
    public ResponseEntity<Employee> insertNewEmployee(@RequestBody EmployeeDto employeeDto) {
        //employee with no companies
        //just insert the employee
        Employee newEmployee = employeeDto.mapTo(employeeDto);
        employeeRepository.save(newEmployee);
        if (employeeDto.getEmployeeCompaniesInfo().size() != 0) {
            insertIntoEmployeeCompanyTable(newEmployee, employeeDto);
        }
        return ResponseEntity.ok(newEmployee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto employeeDto) {
        Employee newEmployee = employeeDto.mapTo(employeeDto);

        Employee oldEmployee = employeeRepository.getEmployeeById(id);

        utils.copyData(oldEmployee, newEmployee);

        employeeRepository.save(oldEmployee);

        return ResponseEntity.ok(oldEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<HashMap<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.getById(id);
        try {
            employeeCompaniesRepository.deleteEmployeesById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            employeeRepository.delete(employee);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        HashMap<String, Boolean> response = new HashMap<>();
        response.put("Deleted", true);
        return ResponseEntity.ok(response);
    }

    private EmployeeDto mapEmployee(@NonNull Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setEmailAddress(employee.getEmailAddress());
        employeeDto.setBirthDate(employee.getBirthDate());
        employeeDto.setName(employee.getName());
        employeeDto.setSurname(employee.getSurname());
        employeeDto.setJobName(employee.getJobName());
        employeeDto.setPhoneNumber(employee.getPhoneNumber());
        employeeDto.setId(employee.getId());
        employeeDto.setJobCount(employeeRepository.getCompanyCount(employee.getName()));

        employeeCompaniesRepository.getEmployeeCompaniesByEmployeeId(employee.getId())
                .forEach(companyInfo -> employeeDto.getEmployeeCompaniesInfo().add(companyInfo));

        return employeeDto;
    }

    private void insertIntoEmployeeCompanyTable(@NonNull Employee employee, @NonNull EmployeeDto employeeDto) {
        employeeDto.getEmployeeCompaniesInfo().forEach(companyName -> {
            Company company = companyRepository.getCompanyByName(companyName.trim());
            EmployeesCompanies employeesCompanies = new EmployeesCompanies();

            employeesCompanies.setCompanyName(company.getCompanyName());
            employeesCompanies.setEmployeeName(employee.getName());
            employeesCompanies.setEmployeeSurname(employee.getSurname());
            employeesCompanies.setEmployee(employee);
            employeesCompanies.setCompany(company);

            employeeCompaniesRepository.save(employeesCompanies);
        });
    }

}
