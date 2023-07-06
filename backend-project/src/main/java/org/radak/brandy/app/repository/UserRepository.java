package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    ///Metoda koja dobovalja Korisnika iz baze podataka.
    //Optional<User> findByUsername(String username);

    @Query(value = "SELECT user.* FROM user WHERE user.username = :username", nativeQuery = true)
    Optional<User> findByUsername(@Param("username") String username);

}

