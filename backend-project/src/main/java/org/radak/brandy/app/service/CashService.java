package org.radak.brandy.app.service;

import org.radak.brandy.app.model.Cash;
import org.radak.brandy.app.repository.CashRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CashService {
    @Autowired
    private CashRepository cashRepository;

    public Iterable<Cash> findAll() {
        return cashRepository.findAll();
    }

    public Optional<Cash> findOne(Long id) {
        return cashRepository.findById(id);
    }

    public Cash save(Cash cash) {
        return cashRepository.save(cash);
    }

    public void delete(Long id) {
        cashRepository.deleteById(id);
    }

    public void delete(Cash cash) {
        cashRepository.delete(cash);
    }
}
