package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.dto.CreditCardDTO;
import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.dto.OrderDTO;
import org.radak.brandy.app.model.CreditCard;
import org.radak.brandy.app.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/cardsPayment")
public class CreditCardController {
    @Autowired
    private CreditCardService service;


    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Iterable<CreditCardDTO>> getAll() {
        ArrayList<CreditCardDTO> cards = new ArrayList<CreditCardDTO>();
        for (CreditCard card : service.findAll()) {
            cards.add(new CreditCardDTO(card.getId(),card.getAmount(),
                    new OrderDTO(card.getOrder().getId(), card.getOrder().getQuantity(),
                            card.getOrder().getDateOfPurchase(),
                            new CustomerDTO(card.getOrder().getCustomer().getId(),
                                    card.getOrder().getCustomer().getUsername(),null,
                                    card.getOrder().getCustomer().getFirstName(),card.getOrder().getCustomer().getLastName(),
                                    card.getOrder().getCustomer().getEmail()),
                            new BrandyDTO(card.getOrder().getBrandy().getId(),card.getOrder().getBrandy().getName(),
                                    card.getOrder().getBrandy().getType(),card.getOrder().getBrandy().getPrice(),
                                    card.getOrder().getBrandy().getYear(), card.getOrder().getBrandy().getStrength(),
                                    card.getOrder().getBrandy().isQuantity(), null)),
                    card.getNumber(), card.getType(), card.getExpireDate()));
        }
        return new ResponseEntity<Iterable<CreditCardDTO>>(cards, HttpStatus.OK);
    }

    @RequestMapping(path = "/{cardId}", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CreditCardDTO> get(@PathVariable("cardId") Long cardId) {
        Optional<CreditCard> card = service.findOne(cardId);
        if (card.isPresent()) {
            CreditCardDTO creditCardDTO = new CreditCardDTO(card.get().getId(),
                    card.get().getAmount(),
                    new OrderDTO(card.get().getOrder().getId(),card.get().getOrder().getQuantity(),
                            card.get().getOrder().getDateOfPurchase(),
                            new CustomerDTO(card.get().getOrder().getCustomer().getId(),
                                    card.get().getOrder().getCustomer().getUsername(),null,
                                    card.get().getOrder().getCustomer().getFirstName(),card.get().getOrder().getCustomer().getLastName(),
                                    card.get().getOrder().getCustomer().getEmail()),
                            new BrandyDTO(card.get().getOrder().getBrandy().getId(),card.get().getOrder().getBrandy().getName(),
                                    card.get().getOrder().getBrandy().getType(),card.get().getOrder().getBrandy().getPrice(),
                                    card.get().getOrder().getBrandy().getYear(), card.get().getOrder().getBrandy().getStrength(),
                                    card.get().getOrder().getBrandy().isQuantity(), null)),
                    card.get().getNumber(), card.get().getType(),
                    card.get().getExpireDate());
            return new ResponseEntity<CreditCardDTO>(creditCardDTO, HttpStatus.OK);
        }
        return new ResponseEntity<CreditCardDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CreditCardDTO> create(@RequestBody CreditCard card) {
        try {
            service.save(card);
            CreditCardDTO creditCardDTO = new CreditCardDTO(card.getId(),
                    card.getAmount(), new OrderDTO(card.getOrder().getId(),
                    null,null,null,null),
                    card.getNumber(), card.getType(),
                    card.getExpireDate());
            return new ResponseEntity<CreditCardDTO>(creditCardDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<CreditCardDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{cardId}", method = RequestMethod.PUT)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CreditCard> update(@PathVariable("cardId") Long cardId,
                                        @RequestBody CreditCard updateCard) {
        CreditCard card = service.findOne(cardId).orElse(null);
        if (card != null) {
            updateCard.setId(cardId);
            service.save(updateCard); //DONE:Sa ovim radi bez BUG-a (Beskonacna rekurzija!)-Roditelj
            return new ResponseEntity<CreditCard>(updateCard, HttpStatus.OK);
        }
        return new ResponseEntity<CreditCard>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{cardId}", method = RequestMethod.DELETE)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CreditCard> delete(@PathVariable("cardId") Long cardId) {
        if (service.findOne(cardId).isPresent()) {
            service.delete(cardId);
            return new ResponseEntity<CreditCard>(HttpStatus.OK);
        }
        return new ResponseEntity<CreditCard>(HttpStatus.NOT_FOUND);
    }

}
