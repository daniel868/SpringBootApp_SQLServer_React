package com.example.airport.controllers;

import com.example.airport.AirportApplication;
import com.example.airport.dtos.flights.ArrivalDepartureFlightDto;
import com.example.airport.dtos.flights.FlightDto;
import com.example.airport.dtos.flights.FlightUtils;
import com.example.airport.entities.Aircraft;
import com.example.airport.entities.Flight;
import com.example.airport.repositories.AircraftRepository;
import com.example.airport.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class FlightController {
    private final FlightRepository flightRepository;
    private final AircraftRepository aircraftRepository;
    private final FlightUtils utils;

    @Autowired
    public FlightController(FlightRepository flightRepository, AircraftRepository aircraftRepository, FlightUtils utils) {
        this.flightRepository = flightRepository;
        this.aircraftRepository = aircraftRepository;
        this.utils = utils;
    }

    @GetMapping("/flights/departure-flight")
    public List<ArrivalDepartureFlightDto> getAllDepartureFlights() {
        return getDepartureArrivalFlights(true);
    }

    @GetMapping("/flights/arrival-flight")
    public List<ArrivalDepartureFlightDto> getAllArrivalFlights() {
        return getDepartureArrivalFlights(false);
    }

    @GetMapping("/flights/{id}")
    public ResponseEntity<ArrivalDepartureFlightDto> getFlightById(@PathVariable Long id) {
        Flight flight = flightRepository.getFlightById(id);
        if (flight == null) {
            throw new RuntimeException("Flight wit id: " + id + "not found");
        }

        Long aircraftId = flightRepository.getFlightAircraftId(flight.getId());

        ArrivalDepartureFlightDto dto = new ArrivalDepartureFlightDto();

        dto.setFlight(flight);
        if (aircraftId != null) {
            Aircraft aircraft = aircraftRepository.getById(aircraftId);
            dto.setAircraftName(aircraft.getAircraftType());
        } else {
            dto.setAircraftName("Unknown");
        }

        return ResponseEntity.ok(dto);
    }

    @PostMapping("/flights/insert-new-flight")
    @CrossOrigin("*")
    public Flight insertNewFlight(@RequestBody FlightDto flightDto) {
        Flight flight = flightDto.mapTo(flightDto);

        Aircraft aircraft = aircraftRepository.findAircraftByName(flightDto.getAircraftName());
        aircraft.getFlightList().add(flight);
        aircraftRepository.save(aircraft);

        AirportApplication.myLogger.info(flightDto.toString());
        AirportApplication.myLogger.info(aircraft.toString());

        return flight;
    }

    @CrossOrigin("*")
    @PutMapping("/flights/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody FlightDto flightDto) {

        Flight oldFlight = flightRepository.getFlightById(id);
        if (oldFlight == null) {
            throw new RuntimeException("Flight with id: " + id + " not found");
        }

        Long oldAircraftId = flightRepository.getFlightAircraftId(oldFlight.getId());

        Aircraft oldAircraft = aircraftRepository.getById(oldAircraftId);

        Flight newFlight = flightDto.mapTo(flightDto);

        Aircraft newAircraft = aircraftRepository.findAircraftByName(flightDto.getAircraftName());

        utils.copyData(oldFlight, newFlight);

        if (oldAircraft != newAircraft) {
            oldAircraft.getFlightList().remove(oldFlight);

            aircraftRepository.save(oldAircraft);
        }

        newAircraft.getFlightList().add(oldFlight);

        aircraftRepository.save(newAircraft);

        return ResponseEntity.ok(oldFlight);
    }


    @CrossOrigin("*")
    @DeleteMapping("/flights/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteFlight(@PathVariable Long id) {
        Flight flight = flightRepository.getFlightById(id);
        if (flight == null) {
            throw new RuntimeException("Flight with id " + id + "not found");
        }
        Long aircraftId = flightRepository.getFlightAircraftId(id);
        if (aircraftId != null) {
            Aircraft aircraft = aircraftRepository.getById(aircraftId);
            aircraft.getFlightList().remove(flight);
            aircraftRepository.save(aircraft);
        }
        flightRepository.delete(flight);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", true);
        return ResponseEntity.ok(response);

    }

    private List<ArrivalDepartureFlightDto> getDepartureArrivalFlights(boolean isDeparture) {
        return flightRepository.findAll().stream()
                .filter(flight -> {
                    LocalDateTime dateTime = LocalDateTime.parse(flight.getDepartureDateTime().split("\\.")[0]);
                    return isDeparture ? LocalDateTime.now().compareTo(dateTime) < 0 : LocalDateTime.now().compareTo(dateTime) > 0;
                }).map(flight -> {
                    Long aircraftId = flightRepository.getFlightAircraftId(flight.getId());
                    float averageFlightSpeed = 0;

                    try {
                        averageFlightSpeed = flightRepository.averageFlightSpeed(flight.getFromLocation(), flight.getToLocation());
                    } catch (Exception e) {
                        System.out.println("Cannot obtain flight average speed for flight with id: " + flight.getId());
                    }
                    if (aircraftId != null) {
                        Aircraft aircraft = aircraftRepository.getById(aircraftId);
                        return new ArrivalDepartureFlightDto(aircraft.getAircraftType(), flight, averageFlightSpeed);
                    } else {
                        return new ArrivalDepartureFlightDto("Unknown", flight, 0);
                    }
                }).collect(Collectors.toList());
    }


}
