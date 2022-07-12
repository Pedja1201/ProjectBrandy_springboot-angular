package org.radak.project.rakija.app.repository;

import org.radak.project.rakija.app.model.Korisnik;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KorisnikRepository extends PagingAndSortingRepository<Korisnik, Long> {
    ///Metoda koja dobovalja Korisnika iz baze podataka.
    Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);
}

