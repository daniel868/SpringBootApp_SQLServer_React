package com.example.airport.controllers;

import com.example.airport.dtos.login.LoginDto;
import com.example.airport.dtos.login.LoginUtils;
import com.example.airport.dtos.login.UserDto;
import com.example.airport.entities.login.User;
import com.example.airport.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class LoginController {
    private final UserRepository userRepository;
    private final UserDto userDto;
    private final LoginUtils utils;

    public LoginController(UserRepository userRepository, LoginUtils utils) {
        this.userRepository = userRepository;
        this.utils = utils;
        userDto = new UserDto();
    }

    @GetMapping("/login/users")
    public List<UserDto> getAllUsers() {
        return userRepository.getAllUsers()
                .stream()
                .map(userDto::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping("/login/users/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userDto.mapTo(userRepository.getById(id));
    }

    @PostMapping("/login/insert-new-user")
    public ResponseEntity<User> insertNewUser(@RequestBody UserDto userDto) {

        User insertedUser = userDto.mapFrom(userDto);
        try {
            userRepository.save(insertedUser);
        } catch (Exception e) {
            System.out.println("Cannot inserted user");
            System.out.println(e.getMessage());
        }

        return ResponseEntity.ok(insertedUser);
    }

    @PutMapping("/login/update-user/{id}")
    public ResponseEntity<HashMap<String, Boolean>> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        User oldUser = userRepository.getById(id);
        User newUser = userDto.mapFrom(userDto);

        utils.copyData(oldUser, newUser);

        HashMap<String, Boolean> response = new HashMap<>();
        try {
            userRepository.save(oldUser);
            response.put("Inserted", true);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return ResponseEntity.ok(response);
    }


    @PutMapping("/login/checkUserCredentials")
    public boolean checkUserCredentials(@RequestBody LoginDto loginDto) {
        User requestedUser = null;
        try {
            requestedUser = userRepository.checkForUserCredentials(loginDto.getInsertedUsername(), loginDto.getInsertedPassword());
        } catch (Exception e) {
            System.out.println("Cannot find the user with the inserted credentials");
        }
        return requestedUser != null;
    }

}
