package com.example.airport.repositories.manyToManyMapping;

import com.example.airport.dtos.dashboard.AircraftDashboard;
import com.example.airport.entities.Flight;
import com.example.airport.entities.manyToManyMapping.CompaniesFlights;
import com.example.airport.entities.compositeKeys.CompaniesFlightsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompaniesFlightsRepository extends JpaRepository<CompaniesFlights, CompaniesFlightsId> {

    @Query(value = "SELECT flight_id  from companies_flight where company_name =?1", nativeQuery = true)
    List<Long> getFlightsIdForCompanyName(String companyName);

    @Query(value = "SELECT F.from_location,F.to_location\n" +
            "FROM companies_flight CF, flights F\n" +
            "where CF.flight_id = F.id AND CF.company_name =?1", nativeQuery = true)
    List<String> getAllFlightInformationByCompanyName(String companyName);

    @Query(value = "DELETE from companies_flight where company_id=?1", nativeQuery = true)
    void deleteWhereCompanyId(Long companyId);

    //TODO: insert queries
    @Query(value = "SELECT OUTPUT_TABLE2.TotalSum, COUNT(A1.id) as Flights,A1.aicraft_type as AircraftName FROM (\n" +
            "SELECT SUM(OUTPUT_TABLE.TotalFlightsNumber) as TotalSum FROM (\n" +
            "SELECT A.id, COUNT(*) as TotalFlightsNumber FROM aircraft A\n" +
            "INNER JOIN flights F on F.aicraft_id = A.id\n" +
            "GROUP BY A.id\n" +
            ") as OUTPUT_TABLE\n" +
            ") as OUTPUT_TABLE2, flights F \n" +
            "INNER JOIN aircraft A1 ON A1.id = F.aicraft_id\n" +
            "GROUP BY A1.id,OUTPUT_TABLE2.TotalSum,A1.aicraft_type", nativeQuery = true)
    List<String> getAircraftUtilization();

    @Query(value = "SELECT COUNT(*) as FlightsNumber, Fl.NrAngajati, C.company_name from (\n" +
            "SELECT COUNT(*) as NrAngajati FROM employees_companies EC1\n" +
            "INNER JOIN employee E1 ON EC1.employee_id = E1.id\n" +
            "INNER JOIN companies C1 ON EC1.company_id =C1.id\n" +
            "WHERE C1.company_name = ?1\n" +
            "GROUP BY C1.id\n" +
            ") as Fl, flights F\n" +
            "INNER JOIN companies_flight CF ON F.id = CF.flight_id\n" +
            "INNER JOIN companies C ON CF.company_id = C.id\n" +
            "Where C.company_name =?1\n" +
            "GROUP BY C.id, C.company_name, Fl.NrAngajati\n", nativeQuery = true)
    String getCompanyFlightsAndEmployee(String companyName);

    @Query(value = "SELECT TOP 1 CF2.company_name,CF2.from_location+' -> '+CF2.to_location as FlightDetail, F3.cost FROM companies_flight CF2, flights F3\n" +
            "WHERE CF2.flight_id = (\n" +
            "SELECT TOP 1 F1.id FROM flights F1\n" +
            "INNER JOIN companies_flight CF1 ON F1.id = CF1.flight_id\n" +
            "GROUP BY F1.id\n" +
            "ORDER by MAX(F1.cost) ASC\n" +
            ") AND F3.id = CF2.flight_id", nativeQuery = true)
    String getLowPriceCompany();

    @Query(value = "SELECT TOP 1 CF2.company_name, CF2.from_location+' -> '+CF2.to_location as FlightDetail, F3.cost FROM companies_flight CF2, flights F3 \n" +
            "WHERE CF2.flight_id = (\n" +
            "SELECT TOP 1 F1.id FROM flights F1\n" +
            "INNER JOIN companies_flight CF1 ON F1.id = CF1.flight_id\n" +
            "GROUP BY F1.cost, F1.id\n" +
            ") AND F3.cost = (SELECT MAX(cost) FROM flights)", nativeQuery = true)
    String getHighPriceCompany();
}
