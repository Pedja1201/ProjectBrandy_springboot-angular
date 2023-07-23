package org.radak.brandy.app.service;

import org.radak.brandy.app.model.Brandy;
import org.radak.brandy.app.repository.BrandyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandyService {
    @Autowired
    private BrandyRepository brandyRepository;

    public BrandyService() {
        super();
    }

    public BrandyService(BrandyRepository brandyRepository) {
        super();
        this.brandyRepository = brandyRepository;
    }

    public BrandyRepository getBrandyRepository() {
        return brandyRepository;
    }

    public void setBrandyRepository(BrandyRepository brandyRepository) {
        this.brandyRepository = brandyRepository;
    }

    public Iterable<Brandy> findAll() {
        return brandyRepository.findAll();
    }

    public Page<Brandy> findAll(Pageable pageable) {
        return brandyRepository.findAll(pageable);
    }

    public Optional<Brandy> findOne(Long id) {
        return brandyRepository.findById(id);
    }

    public List<Brandy> findByPriceBetween(double min, double max) {
        return brandyRepository.findByPrice(min, max);
    }

    public Iterable<Brandy> search(String name) {
        return brandyRepository.searcByName(name);
    }

    public Brandy save(Brandy brandy) {
        return brandyRepository.save(brandy);
    }

    public void delete(Long id) {
        brandyRepository.deleteById(id);
    }

    public void delete(Brandy brandy) {
        brandyRepository.delete(brandy);
    }

    public Optional<Brandy> findBrandyName(String name) {
        return brandyRepository.findBrandyName(name);
    }



    public boolean postaviPopust(Long id, double sale) {
        Optional<Brandy> brandy = brandyRepository.findById(id);
        if(brandy.isPresent()) {
            brandy.get().setPrice(brandy.get().getPrice() - brandy.get().getPrice()*sale);
            brandyRepository.save(brandy.get());
            return true;
        }

        return false;
    }
}
