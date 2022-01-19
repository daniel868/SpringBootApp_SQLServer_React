package com.example.airport.repositories;

import com.example.airport.entities.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {

    @Query(value = "select * from aircraft", nativeQuery = true)
    public List<Aircraft> getAllAircrafts();

    @Query(value = "select * from aircraft where aicraft_type=?1 ", nativeQuery = true)
    public Aircraft findAircraftByName(String name);

    @Query(value = "select * from aircraft where id = ?1", nativeQuery = true)
    public Aircraft findAircraftById(Long id);

    @Query(value = "select * from aircraft where id!=?1", nativeQuery = true)
    public List<Aircraft> getAllAircraftExcept(Long id);

    @Query(value = "SELECT COUNT(*) as NumberOfFlights from aircraft AR\n" +
            "INNER JOIN flights ON flights.aicraft_id = AR.id\n" +
            "WHERE AR.aicraft_type = ?1\n" +
            "GROUP BY AR.id", nativeQuery = true)
    public int numberOfFlights(String aircraftType);


    @Query(value = " update aircraft set aicraft_type=?1, engine_number=?2, max_speed=?3, seats_number=?4, working_hour=?5 where id=?6", nativeQuery = true)
    public void updateAicraft(String aircraftType, String engineNumber, String maxSpeed, String seatsNumber, String workingHour, Long id);

    @Query(value = "insert into aicrafts values(?1,?2,?3,?4,?5)", nativeQuery = true)
    public void insertAircraft(String aircraftType, String engineNumber, String maxSpeed, String seatsNumber, String workingHour);

    @Query(value = "delete * from aircrafts",nativeQuery = true)
    public void deleteAll();
}
