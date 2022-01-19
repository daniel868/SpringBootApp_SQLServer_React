package com.example.airport.dtos.login;

import com.example.airport.dtos.UtilsInterface;
import com.example.airport.entities.login.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginUtils implements UtilsInterface<User> {
    @Autowired
    public LoginUtils() {
    }

    @Override
    public void copyData(User oldValue, User newValue) {
        oldValue.setUserName(newValue.getUserName()!=null ? newValue.getUserName() : oldValue.getUserName());
        oldValue.setUserPassword(newValue.getUserPassword()!=null ? newValue.getUserPassword() : oldValue.getUserPassword());
        oldValue.setUserEmail(newValue.getUserEmail()!=null ? newValue.getUserEmail() : oldValue.getUserEmail());
        oldValue.setUseRole(newValue.getUseRole()!=null ? newValue.getUseRole() : oldValue.getUseRole());
    }
}
