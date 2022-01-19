package com.example.airport.dtos.clients;

import com.example.airport.entities.Client;

public class ClientFlightDto {
    private Client client;
    private String flightInfo;

    public ClientFlightDto(Client client, String flightInfo) {
        this.client = client;
        this.flightInfo = flightInfo;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getFlightInfo() {
        return flightInfo;
    }

    public void setFlightInfo(String flightInfo) {
        this.flightInfo = flightInfo;
    }
}
