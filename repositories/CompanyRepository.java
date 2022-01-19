package com.example.airport.repositories;

import com.example.airport.entities.Company;
import com.example.airport.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query(value = "select * from companies where id =?1", nativeQuery = true)
    public Company getCompanyById(Long companyId);

    @Query(value = "select * from companies", nativeQuery = true)
    public List<Company> getAllCompanies();

    @Query(value = "select * from companies where company_name=?1", nativeQuery = true)
    public Company getCompanyByName(String companyName);

    @Query(value = "SELECT COUNT(*) as NumberOfEmployees from companies C\n" +
            "INNER JOIN employees_companies EC On EC.company_id = C.id\n" +
            "WHERE C.company_name = ?1\n" +
            "GROUP BY C.company_name",nativeQuery = true)
    public int getEmployeeAmountForCompanyName(String companyName);


}
