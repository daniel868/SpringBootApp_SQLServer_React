package com.example.airport.dtos.login;

public class LoginDto {
    private String insertedUsername;
    private String insertedPassword;


    public String getInsertedUsername() {
        return insertedUsername;
    }

    public void setInsertedUsername(String insertedUsername) {
        this.insertedUsername = insertedUsername;
    }

    public String getInsertedPassword() {
        return insertedPassword;
    }

    public void setInsertedPassword(String insertedPassword) {
        this.insertedPassword = insertedPassword;
    }
}
