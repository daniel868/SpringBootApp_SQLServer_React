package com.example.airport.controllers;

import com.example.airport.dtos.clients.ClientDto;
import com.example.airport.dtos.clients.ClientFlightDto;
import com.example.airport.dtos.clients.ClientUtils;
import com.example.airport.entities.Client;
import com.example.airport.entities.Flight;
import com.example.airport.repositories.ClientRepository;
import com.example.airport.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class ClientController {
    private final ClientRepository clientRepository;
    private final FlightRepository flightRepository;
    private final ClientUtils utils;

    @Autowired

    public ClientController(ClientRepository clientRepository, FlightRepository flightRepository, ClientUtils utils) {
        this.clientRepository = clientRepository;
        this.flightRepository = flightRepository;
        this.utils = utils;
    }


    @PostMapping("/clients/insert-new-client")
    @CrossOrigin("*")
    public Client insertNewClient(@RequestBody ClientDto clientDto) {
        Client client = clientDto.mapFrom(clientDto);
        Long clientFlightId = flightRepository.getFlightId(clientDto.getFromLocation(), clientDto.getToLocation());
        Flight clientFlight = flightRepository.getFlightById(clientFlightId);
        clientFlight.getClientList().add(client);

        flightRepository.save(clientFlight);

        return client;
    }

    @PutMapping("/clients/{id}")
    @CrossOrigin("*")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody ClientDto clientDto) {
        Client oldClient = clientRepository.getClientById(id);
        Client newClient = clientDto.mapFrom(clientDto);

        utils.copyData(oldClient, newClient);

        Long newFlightId = flightRepository.getFlightId(clientDto.getFromLocation(), clientDto.getToLocation());
        Flight newFlight = flightRepository.getFlightById(newFlightId);

        newFlight.getClientList().add(oldClient);

        flightRepository.save(newFlight);

        return ResponseEntity.ok(oldClient);
    }


    @GetMapping("/clients")
    public List<ClientFlightDto> getClients() {
        List<ClientFlightDto> clientList = new ArrayList<>();

        clientRepository.findAll().forEach(client -> {
            Long clientFlightId = clientRepository.getClientFlightId(client.getId());
            Flight clientFlight = flightRepository.getFlightById(clientFlightId);
            String infoClientFlight = clientFlight.getFromLocation() + "->" + clientFlight.getToLocation();

            ClientFlightDto clientFlightDto = new ClientFlightDto(client, infoClientFlight);
            clientList.add(clientFlightDto);
        });
        return clientList;
    }

    @GetMapping("/clients/{id}")
    public ClientFlightDto getClientById(@PathVariable Long id) {
        Client client = clientRepository.getClientById(id);
        Long clientFlightId = clientRepository.getClientFlightId(client.getId());
        Flight clientFlight = flightRepository.getFlightById(clientFlightId);
        String infoClientFlight = clientFlight.getFromLocation() + "->" + clientFlight.getToLocation()
                + "->" + clientFlight.getDepartureDateTime();

        return new ClientFlightDto(client, infoClientFlight);
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<HashMap<String, Boolean>> deleteClient(@PathVariable Long id) {
        Client deleteClient = clientRepository.getClientById(id);
        Long clientFlightId = clientRepository.getClientFlightId(id);
        Flight flight = flightRepository.getFlightById(clientFlightId);

        flight.getClientList().remove(deleteClient);

        clientRepository.delete(deleteClient);
        flightRepository.save(flight);

        HashMap<String, Boolean> response = new HashMap<>();
        response.put("Deleted", true);

        return ResponseEntity.ok(response);
    }


}
