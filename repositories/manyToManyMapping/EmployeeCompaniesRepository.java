package com.example.airport.repositories.manyToManyMapping;

import com.example.airport.entities.manyToManyMapping.EmployeesCompanies;
import com.example.airport.entities.compositeKeys.EmployeesCompaniesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeCompaniesRepository extends JpaRepository<EmployeesCompanies, EmployeesCompaniesId> {

    @Query(value = "select C.company_name\n" +
            "from employees_companies EC, companies C\n" +
            "where EC.company_id = C.id AND EC.employee_name =?1", nativeQuery = true)
    public List<String> getEmployeeCompaniesByName(String employeeName);

    @Query(value = "SELECT C.company_name from companies C\n" +
            "INNER JOIN employees_companies EC ON EC.company_id = C.id\n" +
            "INNER JOIN employee E ON E.id = EC.employee_id\n" +
            "WHERE employee_id = ?1", nativeQuery = true)
    public List<String> getEmployeeCompaniesByEmployeeId(Long id);

    @Query(value = "DELETE FROM employees_companies where employee_id=?1", nativeQuery = true)
    public void deleteEmployeesById(Long id);

    @Query(value = "SELECT TOP 2 EC.company_name FROM employees_companies EC\n" +
            "GROUP BY EC.company_id, EC.company_name\n" +
            "ORDER BY COUNT(*) DESC\n", nativeQuery = true)
    public List<String> getCompaniesWithMaxNumberOfEmployees();

    //TODO: add join queries
    @Query(value = "SELECT F.from_location+' -> '+F.to_location as FlightDetails,F.cost, CF.company_name as CompanyName from flights F\n" +
            "INNER JOIN companies_flight CF ON Cf.flight_id = F.id\n" +
            "WHERE F.id in (SELECT C.flight_id FROM clients C)\n", nativeQuery = true)
    public List<String> getBestSellerFlights();


}
