package org.radak.brandy.app.service;

import org.radak.project.rakija.app.model.Kupac;
import org.radak.project.rakija.app.repository.KupacRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class KupacService {
    @Autowired
    private KupacRepository kupacRepository;

    public Iterable<Kupac> findAll() {
        return kupacRepository.findAll();
    }

    public Page<Kupac> findAll(Pageable pageable) {
        return kupacRepository.findAll(pageable);
    }


    public Optional<Kupac> findOne(Long id) {
        return kupacRepository.findById(id);
    }

    public Kupac save(Kupac kupac) {
        return kupacRepository.save(kupac);
    }

    public void delete(Long id) {
        kupacRepository.deleteById(id);
    }

    public void delete(Kupac kupac) {
        kupacRepository.delete(kupac);
    }
}
