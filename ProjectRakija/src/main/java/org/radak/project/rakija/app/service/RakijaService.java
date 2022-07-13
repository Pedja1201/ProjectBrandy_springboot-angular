package org.radak.project.rakija.app.service;

import org.radak.project.rakija.app.model.Rakija;
import org.radak.project.rakija.app.repository.RakijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RakijaService {
    @Autowired
    private RakijaRepository rakijaRepository;

    public RakijaService() {
        super();
    }

    public RakijaService(RakijaRepository rakijaRepository) {
        super();
        this.rakijaRepository = rakijaRepository;
    }

    public RakijaRepository getRakijaRepository() {
        return rakijaRepository;
    }

    public void setRakijaRepository(RakijaRepository rakijaRepository) {
        this.rakijaRepository = rakijaRepository;
    }

    public Iterable<Rakija> findAll() {
        return rakijaRepository.findAll();
    }

    public Page<Rakija> findAll(Pageable pageable) {
        return rakijaRepository.findAll(pageable);
    }

    public Optional<Rakija> findOne(Long id) {
        return rakijaRepository.findById(id);
    }

    public List<Rakija> findByPriceBetween(double min, double max) {
        return rakijaRepository.pronadjiPoCeni(min, max);
    }

    public Rakija save(Rakija rakija) {
        return rakijaRepository.save(rakija);
    }

    public void delete(Long id) {
        rakijaRepository.deleteById(id);
    }

    public void delete(Rakija rakija) {
        rakijaRepository.delete(rakija);
    }

    public boolean postaviPopust(Long id, double popust) {
        Optional<Rakija> rakija = rakijaRepository.findById(id);
        if(rakija.isPresent()) {
            rakija.get().setCena(rakija.get().getCena() - rakija.get().getCena()*popust);
            rakijaRepository.save(rakija.get());
            return true;
        }

        return false;
    }
}
