package com.example.airport.dtos.clients;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ClientUtils implements UtilsInterface<Client> {

    @Autowired
    public ClientUtils() {
    }

    @Override
    public void copyData(Client oldValue, Client newValue) {
        oldValue.setName(newValue.getName() != null ? newValue.getName() : oldValue.getName());
        oldValue.setSurname(newValue.getSurname() != null ? newValue.getSurname() : oldValue.getSurname());
        oldValue.setEmailAddress(newValue.getEmailAddress() != null ? newValue.getEmailAddress() : oldValue.getEmailAddress());
        oldValue.setPhoneNumber(newValue.getPhoneNumber() != null ? newValue.getPhoneNumber() : oldValue.getPhoneNumber());
    }
}
