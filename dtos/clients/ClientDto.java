package com.example.airport.dtos.clients;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.Client;

public class ClientDto implements DtoInterface<Client, ClientDto> {

    private String name;
    private String surname;
    private String emailAddress;
    private String phoneNumber;
    private String fromLocation;
    private String toLocation;

    @Override
    public ClientDto mapTo(Client to) {
        ClientDto clientDto = new ClientDto();
        clientDto.setEmailAddress(to.getEmailAddress());
        clientDto.setName(to.getName());
        clientDto.setSurname(to.getSurname());
        clientDto.setPhoneNumber(to.getPhoneNumber());
        return clientDto;
    }

    @Override
    public Client mapFrom(ClientDto from) {
        Client client = new Client();
        client.setEmailAddress(from.getEmailAddress());
        client.setName(from.getName());
        client.setSurname(from.getSurname());
        client.setPhoneNumber(from.getPhoneNumber());

        return client;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }

    public String getToLocation() {
        return toLocation;
    }

    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }
}

