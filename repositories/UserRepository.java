package com.example.airport.repositories;

import com.example.airport.entities.login.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT TOP 1 * FROM users U \n" +
            "WHERE U.user_name =?1 AND U.user_password=?2", nativeQuery = true)
    public User checkForUserCredentials(String userName, String password);

    @Query(value = "SELECT * FROM users", nativeQuery = true)
    public List<User> getAllUsers();

    @Query(value = "SELECT * FROM users where id = ?1", nativeQuery = true)
    public User getById(Long id);

    @Query(value = "insert into users values (?1,?2,?3,?4)", nativeQuery = true)
    public void insertIntoTable(String name, String username, String password, String role);

    @Query(value = "update users set user_role=?4, user_email=?5, user_name=?1, user_password=?2 where id=?", nativeQuery = true)
    public void updateTable(String name, String username, String password, String role, String email, Long id);

    @Query(value = "DELETE * from users", nativeQuery = true)
    public void deleteAll();

}
