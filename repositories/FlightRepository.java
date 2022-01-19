package com.example.airport.repositories;

import com.example.airport.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query(value = "select * from flights", nativeQuery = true)
    public List<Flight> getAllFlights();

    @Query(value = "select * from flights where aicraft_id =?1", nativeQuery = true)
    public List<Flight> getAllFlightsWithAircraft(Long aircraftId);

    @Query(value = "select * from flights where id = ?1", nativeQuery = true)
    public Flight getFlightById(Long id);

    @Query(value = "select aicraft_id from flights where id = ?1", nativeQuery = true)
    public Long getFlightAircraftId(Long flightId);

    @Query(value = "select id from flights where from_location = ?1 AND to_location = ?2 ", nativeQuery = true)
    public Long getFlightId(String fromLocation, String toLocation);

    @Query(value = "select * from flights where from_location = ?1 AND to_location = ?2 ", nativeQuery = true)
    public List<Flight> getFlightIdByLocations(String fromLocation, String toLocation);

    @Query(value = "SELECT AVG(A.max_speed) as AvgSpeed\n" +
            "from flights F\n" +
            "INNER JOIN aircraft A ON F.aicraft_id = A.id\n" +
            "WHERE F.from_location = ?1\n" +
            "  AND F.to_location = ?2\n" +
            "GROUP BY F.from_location, F.to_location\n" +
            "\n",nativeQuery = true)
    public float averageFlightSpeed(String fromLocation, String toLocation);

}
