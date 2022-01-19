package com.example.airport.controllers;

import com.example.airport.AirportApplication;
import com.example.airport.dtos.aircrafts.AircraftDto;
import com.example.airport.dtos.aircrafts.AircraftUtils;
import com.example.airport.entities.Aircraft;
import com.example.airport.entities.Flight;
import com.example.airport.repositories.AircraftRepository;
import com.example.airport.repositories.FlightRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class AircraftController {
    private final AircraftRepository aircraftRepository;
    private final FlightRepository flightRepository;
    private final AircraftUtils utils;

    public AircraftController(AircraftRepository aircraftRepository, FlightRepository flightRepository, AircraftUtils utils) {
        this.aircraftRepository = aircraftRepository;
        this.flightRepository = flightRepository;
        this.utils = utils;
    }

    @GetMapping("/aircrafts")
    public List<AircraftDto> getAllAircraft() {
        AircraftDto utilDto = new AircraftDto();
        return aircraftRepository.findAll()
                .stream()
                .map(aircraft -> {
                    int flightNumber = aircraftRepository.numberOfFlights(aircraft.getAircraftType());
                    AircraftDto aircraftDto = utilDto.mapTo(aircraft);
                    aircraftDto.setNumberOfFlights(String.valueOf(flightNumber));

                    return aircraftDto;
                }).
                collect(Collectors.toList());
    }

    @GetMapping("/aircraftsFlights")
    public int getAircraftFlights(@RequestParam String aircraftType) {
        return aircraftRepository.numberOfFlights(aircraftType);
    }

    @CrossOrigin("*")
    @PostMapping("/aircrafts/insert-new-aircraft")
    public Aircraft insertNewAircraft(@RequestBody AircraftDto aircraftDto) {
        Aircraft aircraft = aircraftDto.mapFrom(aircraftDto);

        AirportApplication.myLogger.info(aircraft.toString());

        aircraftRepository.save(aircraft);

        return aircraft;
    }

    @CrossOrigin("*")
    @PutMapping("/aircrafts/{id}")
    public ResponseEntity<Aircraft> updateAircraft(@PathVariable Long id, @RequestBody AircraftDto aircraftDto) {
        Aircraft oldAircraft = aircraftRepository.findAircraftById(id);

        Aircraft newAircraft = aircraftDto.mapFrom(aircraftDto);

        utils.copyData(oldAircraft, newAircraft);

        aircraftRepository.save(oldAircraft);

        return ResponseEntity.ok(oldAircraft);
    }

    @CrossOrigin("*")
    @DeleteMapping("/aircrafts/{id}")
    public ResponseEntity<HashMap<String, Boolean>> deleteAircraft(@PathVariable Long id) {
        Aircraft aircraft = aircraftRepository.findAircraftById(id);

        List<Flight> flightList = flightRepository.getAllFlightsWithAircraft(aircraft.getId());


        List<Aircraft> aircraftList = aircraftRepository.getAllAircraftExcept(aircraft.getId());

        Random random = new Random();

        flightList.forEach(currentFlight -> {
            aircraftList.get(random.nextInt(aircraftList.size() - 1)).getFlightList().add(currentFlight);
        });

        aircraftRepository.delete(aircraft);

        aircraftRepository.saveAll(aircraftList);

        HashMap<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/aircrafts/{id}")
    public ResponseEntity<Aircraft> getAircraftById(@PathVariable Long id) {
        Aircraft aircraft = aircraftRepository.findAircraftById(id);

        if (aircraft == null) {
            throw new RuntimeException("Aircraft with id: " + id + " not found");
        }

        return ResponseEntity.ok(aircraft);
    }
}
