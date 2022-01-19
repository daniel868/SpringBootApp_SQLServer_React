package com.example.airport.repositories;

import com.example.airport.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query(value = "select flight_id from clients WHERE id = ?1", nativeQuery = true)
    Long getClientFlightId(Long clientId);

    @Query(value = "select * from clients where id=?1", nativeQuery = true)
    Client getClientById(Long clientId);

}
