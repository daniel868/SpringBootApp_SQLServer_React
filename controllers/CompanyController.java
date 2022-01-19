package com.example.airport.controllers;

import com.example.airport.dtos.companies.CompanyDto;
import com.example.airport.dtos.companies.CompanyUtils;
import com.example.airport.entities.Company;
import com.example.airport.entities.Flight;
import com.example.airport.entities.manyToManyMapping.CompaniesFlights;
import com.example.airport.repositories.CompanyRepository;
import com.example.airport.repositories.FlightRepository;
import com.example.airport.repositories.manyToManyMapping.CompaniesFlightsRepository;
import io.reactivex.annotations.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class CompanyController {
    private final CompanyRepository companyRepository;
    private final FlightRepository flightRepository;
    private final CompaniesFlightsRepository companiesFlightsRepository;

    private final CompanyUtils utils;

    public CompanyController(CompanyRepository companyRepository, FlightRepository flightRepository, CompaniesFlightsRepository companiesFlightsRepository, CompanyUtils utils) {
        this.companyRepository = companyRepository;
        this.flightRepository = flightRepository;
        this.companiesFlightsRepository = companiesFlightsRepository;
        this.utils = utils;
    }

    @GetMapping("/companies")
    public List<CompanyDto> getAllCompanies() {
        List<CompanyDto> companyDtoList = new ArrayList<>();
        companyRepository.getAllCompanies().stream()
                .map(this::mapCompanyFlights)
                .forEach(companyDtoList::add);

        return companyDtoList;
    }

    @GetMapping("/companies/{id}")
    public CompanyDto getCompaniesById(@PathVariable Long id) {
        Company currentCompany = companyRepository.getCompanyById(id);
        return mapCompanyFlights(currentCompany);
    }

    @PostMapping("/companies/insert-new-company")
    @CrossOrigin("*")
    public Company insertNewCompany(@RequestBody CompanyDto companyDto) {
        Company insertCompany = companyDto.mapTo(companyDto);
        if (companyDto.getFlightsInformation().size() != 0) {
            //TODO: Insert into the companies-flight table
            companyDto.getFlightsInformation().forEach(flightInfo -> {
                insertIntoCompaniesFlights(flightInfo, insertCompany);
            });
        }
        companyRepository.save(insertCompany);
        return companyDto.mapTo(companyDto);
    }

    //TODO: Update the company details
    @PutMapping("/companies/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody CompanyDto companyDto) {
        Company oldCompany = companyRepository.getCompanyById(id);
        Company newCompany = companyDto.mapTo(companyDto);

        utils.copyData(oldCompany, newCompany);

        companyRepository.save(oldCompany);

        return ResponseEntity.ok(oldCompany);
    }

    @DeleteMapping("/companies/{id}")
    public ResponseEntity<HashMap<String, Boolean>> deleteCompany(@PathVariable Long id) {
        try {
            companiesFlightsRepository.deleteWhereCompanyId(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        try {
            companyRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Not found company with id " + id + " in the companies table");
            throw new RuntimeException("Not found company with id" + id + " in the companies table");
        }

        HashMap<String, Boolean> myMap = new HashMap<>();
        myMap.put("Deleted", true);

        return ResponseEntity.ok(myMap);
    }

    private CompanyDto mapCompanyFlights(@NonNull Company company) {
        CompanyDto companyDto = new CompanyDto();
        List<String> companyFlightInformation = companiesFlightsRepository
                .getAllFlightInformationByCompanyName(company.getCompanyName());

        companyFlightInformation.stream()
                .map(s -> s.replace(",", " -> "))
                .forEach(s -> companyDto.getFlightsInformation().add(s));

        companyDto.setCompanyName(company.getCompanyName());
        companyDto.setEmployeesAmount(company.getEmployeesAmount());
        companyDto.setYear(company.getYear());
        companyDto.setBusinessFiscalValue(company.getBusinessFiscalValue());
        companyDto.setId(company.getId());
        int numberOfEmployee = 0;
        try {
            numberOfEmployee = companyRepository.getEmployeeAmountForCompanyName(company.getCompanyName());
        } catch (Exception e) {
            System.out.println("Not found any employees for company " + company.getCompanyName());
        }

        companyDto.setNumberOfEmployee(numberOfEmployee);

        return companyDto;
    }

    private void insertIntoCompaniesFlights(@NonNull String flightInfo, @NonNull Company company) {
        String[] parts = flightInfo.split("->");
        List<Flight> flights = flightRepository.getFlightIdByLocations(parts[0], parts[1]);
        Flight flight = flights.get(0);

        CompaniesFlights companiesFlights = new CompaniesFlights();
        companiesFlights.setCompany(company);
        companiesFlights.setCompanyName(company.getCompanyName());
        companiesFlights.setFlight(flight);
        companiesFlights.setToLocation(flight.getToLocation());
        companiesFlights.setFromLocation(flight.getFromLocation());

        flight.getCompaniesFlights().add(companiesFlights);
        company.getCompaniesFlights().add(companiesFlights);

    }


}

