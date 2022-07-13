package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Rakija;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RakijaRepository extends PagingAndSortingRepository<Rakija, Long> {
    List<Rakija> findByCenaBetween(double min, double max);

    @Query("SELECT a FROM Rakija a WHERE a.cena > :min AND a.cena < :max")
    List<Rakija> pronadjiPoCeni(double min, double max);
}
