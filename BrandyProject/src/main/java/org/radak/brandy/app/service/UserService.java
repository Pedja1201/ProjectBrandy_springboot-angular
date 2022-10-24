package org.radak.brandy.app.service;


import org.radak.project.rakija.app.model.Korisnik;
import org.radak.project.rakija.app.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KorisnikService {
    @Autowired
    private KorisnikRepository korisnikRepository;

    public Iterable<Korisnik> findAll() {
        return korisnikRepository.findAll();
    }

    public Page<Korisnik> findAll(Pageable pageable) {
        return korisnikRepository.findAll(pageable);
    }

    public Optional<Korisnik> findOne(Long id) {
        return korisnikRepository.findById(id);
    }

    //Metoda za dobavljanje korisnickog imena [Vezbe 8-security]
    public Optional<Korisnik> findByKorisnickoIme(String korisnickoIme) {
        return korisnikRepository.findByKorisnickoIme(korisnickoIme);
    }

    public Korisnik save(Korisnik korisnik) {
        return korisnikRepository.save(korisnik);
    }

    public void delete(Long id) {
        korisnikRepository.deleteById(id);
    }

    public void delete(Korisnik korisnik) {
        korisnikRepository.delete(korisnik);
    }
}