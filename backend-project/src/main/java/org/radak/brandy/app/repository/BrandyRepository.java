package org.radak.brandy.app.repository;

import org.radak.brandy.app.model.Brandy;
import org.radak.brandy.app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandyRepository extends PagingAndSortingRepository<Brandy, Long> {
    List<Brandy> findByPriceBetween(double min, double max);

    @Query("SELECT a FROM Brandy a WHERE a.price > :min AND a.price < :max")
    List<Brandy> findByPrice(double min, double max);

    @Query(value = "SELECT brandy.* FROM brandy WHERE brandy.name = :name", nativeQuery = true)
    Optional<Brandy> findBrandyName(@Param("name") String name);

    @Query(value = "SELECT * FROM brandy "
            + "WHERE (:name IS NULL OR UPPER(brandy.name) LIKE CONCAT('%', UPPER(:name), '%')) "
            + "AND (:minPrice IS NULL OR brandy.price >= :minPrice) "
            + "AND (:maxPrice IS NULL OR brandy.price <= :maxPrice)",
            nativeQuery = true)
    Page<Brandy> searchByName(@Param("name") String name, @Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, Pageable pageable);

}
