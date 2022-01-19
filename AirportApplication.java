package com.example.airport;

import com.example.airport.entities.Company;
import com.example.airport.entities.Flight;
import com.example.airport.entities.manyToManyMapping.CompaniesFlights;
import com.example.airport.repositories.CompanyRepository;
import com.example.airport.repositories.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RequestMapping("")
@RestController
@EnableAsync
public class AirportApplication implements CommandLineRunner {
    public static Logger myLogger = LoggerFactory.getLogger(AirportApplication.class);

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private FlightRepository flightRepository;

    public static void main(String[] args) {
        SpringApplication.run(AirportApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        Company company = new Company();
//        company.setCompanyName("Test");
//        company.setYear("2000");
//        company.setBusinessFiscalValue(1000);
//
//        Company insertedCompany = companyRepository.save(company);
//
//        Flight flight = flightRepository.getFlightById(25L);
//
//        CompaniesFlights companiesFlights = new CompaniesFlights();
//        companiesFlights.setCompany(insertedCompany);
//        companiesFlights.setFlight(flight);
//        companiesFlights.setFromLocation(flight.getFromLocation());
//        companiesFlights.setToLocation(flight.getToLocation());
//        companiesFlights.setCompanyName(insertedCompany.getCompanyName());
//
//        Flight flight2 = flightRepository.getFlightById(26L);
//
//        CompaniesFlights companiesFlights2 = new CompaniesFlights();
//        companiesFlights2.setCompany(insertedCompany);
//        companiesFlights2.setFlight(flight2);
//        companiesFlights2.setFromLocation(flight2.getFromLocation());
//        companiesFlights2.setToLocation(flight2.getToLocation());
//        companiesFlights2.setCompanyName(insertedCompany.getCompanyName());
//
//        flight.getCompaniesFlights().add(companiesFlights);
//        company.getCompaniesFlights().add(companiesFlights);
//
//        flight2.getCompaniesFlights().add(companiesFlights2);
//        company.getCompaniesFlights().add(companiesFlights2);
//
//        companyRepository.save(insertedCompany);


    }
}
