package com.example.airport.repositories;

import com.example.airport.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query(value = "SELECT * from employee where id= ?1", nativeQuery = true)
    public Employee getEmployeeById(Long id);

    @Query(value = "SELECT * from employee", nativeQuery = true)
    public List<Employee> getAllEmployees();

    @Query(value = "SELECT COUNT(*) as JobNumbers from employee E\n" +
            "INNER JOIN employees_companies EC ON E.id = EC.employee_id\n" +
            "WHERE E.employee_name = ?1\n" +
            "GROUP BY E.id",nativeQuery = true)
    public int getCompanyCount(String employeeName);

}
