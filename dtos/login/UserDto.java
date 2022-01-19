package com.example.airport.dtos.login;

import com.example.airport.dtos.DtoInterface;
import com.example.airport.entities.login.User;

public class UserDto implements DtoInterface<User, UserDto> {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public UserDto mapTo(User to) {
        UserDto userDto = new UserDto();
        userDto.setUsername(to.getUserName());
        userDto.setPassword(to.getUserPassword());
        userDto.setEmail(to.getUserEmail());
        userDto.setRole(to.getUseRole());
        userDto.setId(to.getId());
        return userDto;
    }

    @Override
    public User mapFrom(UserDto from) {
        User user = new User();
        user.setUserName(from.getUsername());
        user.setUserPassword(from.getPassword());
        user.setUserEmail(from.getEmail());
        user.setUseRole(from.getRole());
        return user;
    }
}
