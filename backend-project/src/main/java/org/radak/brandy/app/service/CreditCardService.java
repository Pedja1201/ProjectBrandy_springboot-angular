package org.radak.brandy.app.service;

import org.radak.brandy.app.model.CreditCard;
import org.radak.brandy.app.model.Permission;
import org.radak.brandy.app.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CreditCardService {
    @Autowired
    private CreditCardRepository creditCardRepository;

    public Iterable<CreditCard> findAll() {
        return creditCardRepository.findAll();
    }

    public Optional<CreditCard> findOne(Long id) {
        return creditCardRepository.findById(id);
    }

    public CreditCard save(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }

    public void delete(Long id) {
        creditCardRepository.deleteById(id);
    }

    public void delete(CreditCard creditCard) {
        creditCardRepository.delete(creditCard);
    }
}
