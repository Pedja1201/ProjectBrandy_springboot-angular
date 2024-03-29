package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.Admin;
import org.radak.brandy.app.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends PagingAndSortingRepository<Admin, Long> {

    @Query(value = "SELECT user.* FROM user WHERE user.username = :username", nativeQuery = true)
    Optional<Admin> findByUsernameAdmin(@Param("username") String username);

    @Query(value = "SELECT CASE WHEN COUNT(*) >= 1 THEN 'true' ELSE 'false' END FROM user WHERE user.username = :username", nativeQuery = true)
    Boolean existsByUsername(@Param("username") String username);

    @Query(value = "SELECT CASE WHEN COUNT(*) >= 1 THEN 'true' ELSE 'false' END FROM user WHERE user.email = :email", nativeQuery = true)
    Boolean existsByEmail(@Param("email") String email);

    @Query(value = "SELECT CASE WHEN COUNT(*) >= 1 THEN 'true' ELSE 'false' END FROM user WHERE user.upin = :upin", nativeQuery = true)
    Boolean existsByUpin(@Param("upin") String upin);
}
