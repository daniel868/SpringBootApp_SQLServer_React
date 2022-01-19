package com.example.airport.controllers;

import com.example.airport.dtos.dashboard.AircraftDashboard;
import com.example.airport.dtos.dashboard.CompaniesDashboard;
import com.example.airport.dtos.dashboard.FlightDashboard;
import com.example.airport.dtos.dashboard.mapper.DashboardMapper;
import com.example.airport.repositories.manyToManyMapping.CompaniesFlightsRepository;
import com.example.airport.repositories.manyToManyMapping.EmployeeCompaniesRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class MainDashboardController {
    private final CompaniesFlightsRepository companiesFlightsRepository;
    private final EmployeeCompaniesRepository employeeCompaniesRepository;
    private final DashboardMapper mapper;

    public MainDashboardController(CompaniesFlightsRepository companiesFlightsRepository, EmployeeCompaniesRepository employeeCompaniesRepository, DashboardMapper mapper) {
        this.companiesFlightsRepository = companiesFlightsRepository;
        this.employeeCompaniesRepository = employeeCompaniesRepository;
        this.mapper = mapper;
    }

    @GetMapping("/home/most-used-planes")
    List<AircraftDashboard> getMostUsedPlanes() {
        return companiesFlightsRepository.getAircraftUtilization()
                .stream()
                .map(aircraftDashboard -> {
                    mapper.setInputAircraftDashboard(aircraftDashboard);
                    return mapper.getAircraftDashboard();
                }).sorted((o1, o2) -> Float.compare(o2.getPercentage(), o1.getPercentage()))
                .collect(Collectors.toList());
    }

    @GetMapping("/home/companies-employees")
    List<CompaniesDashboard> getCompaniesEmployees() {
        return employeeCompaniesRepository.getCompaniesWithMaxNumberOfEmployees()
                .stream()
                .map(companyName -> {
                    mapper.setInputCompaniesDashboard(companiesFlightsRepository.getCompanyFlightsAndEmployee(companyName));
                    return mapper.getCompaniesDashboard();
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/home/best-seller-flights")
    List<FlightDashboard> getBestSellerFlights() {
        return employeeCompaniesRepository.getBestSellerFlights()
                .stream()
                .map(flightDashboard -> {
                    mapper.setInputFlightDashboard(flightDashboard);
                    return mapper.getFlightDashboard();
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/home/expensive-flight")
    FlightDashboard getExpensiveFlight() {
        mapper.setInputExpensiveFlight(companiesFlightsRepository.getHighPriceCompany());
        return mapper.getExpensiveFlightDashboard();
    }

    @GetMapping("/home/cheep-flight")
    FlightDashboard getCheepFlight() {
        mapper.setInputCheepFlight(companiesFlightsRepository.getLowPriceCompany());
        return mapper.getCheepFlightDashboard();
    }

}
