package org.radak.project.rakija.app.service;

import org.radak.project.rakija.app.model.Kupac;
import org.radak.project.rakija.app.model.Porudzbina;
import org.radak.project.rakija.app.repository.PorudzbinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class PorudzbinaService {
    @Autowired
    private PorudzbinaRepository porudzbinaRepository;

    public Iterable<Porudzbina> findAll() {
        return porudzbinaRepository.findAll();
    }

    public Page<Porudzbina> findAll(Pageable pageable) {
        return porudzbinaRepository.findAll(pageable);
    }

    public Optional<Porudzbina> findOne(Long id) {
        return porudzbinaRepository.findById(id);
    }

    public Porudzbina save(Porudzbina porudzbina) {
        return porudzbinaRepository.save(porudzbina);
    }

    public void delete(Long id) {
        porudzbinaRepository.deleteById(id);
    }

    public void delete(Porudzbina porudzbina) {
        porudzbinaRepository.delete(porudzbina);
    }
}
