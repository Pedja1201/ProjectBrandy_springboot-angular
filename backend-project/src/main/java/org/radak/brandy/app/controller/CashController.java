package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.*;
import org.radak.brandy.app.model.Cash;
import org.radak.brandy.app.service.CashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/cashPayment")
public class CashController {
    @Autowired
    private CashService service;


    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Iterable<CashDTO>> getAll() {
        ArrayList<CashDTO> cashed = new ArrayList<CashDTO>();
        for (Cash cash : service.findAll()) {
            cashed.add(new CashDTO(cash.getId(),cash.getAmount(),
                    new OrderDTO(cash.getOrder().getId(), cash.getOrder().getQuantity(),
                            cash.getOrder().getDateOfPurchase(),
                            new CustomerDTO(cash.getOrder().getCustomer().getId(),
                                    cash.getOrder().getCustomer().getUsername(),null,
                                    cash.getOrder().getCustomer().getFirstName(),cash.getOrder().getCustomer().getLastName(),
                                    cash.getOrder().getCustomer().getEmail()),
                            new BrandyDTO(cash.getOrder().getBrandy().getId(),cash.getOrder().getBrandy().getName(),
                                    cash.getOrder().getBrandy().getType(),cash.getOrder().getBrandy().getPrice(),
                                    cash.getOrder().getBrandy().getYear(), cash.getOrder().getBrandy().getStrength(),
                                    cash.getOrder().getBrandy().isQuantity(), null)),
                    cash.getCashTendered()));
        }
        return new ResponseEntity<Iterable<CashDTO>>(cashed, HttpStatus.OK);
    }

    @RequestMapping(path = "/{cashId}", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CashDTO> get(@PathVariable("cashId") Long cashId) {
        Optional<Cash> cash = service.findOne(cashId);
        if (cash.isPresent()) {
            CashDTO cashDTO = new CashDTO(cash.get().getId(),cash.get().getAmount(),
                    new OrderDTO(cash.get().getOrder().getId(),cash.get().getOrder().getQuantity(),
                            cash.get().getOrder().getDateOfPurchase(),
                            new CustomerDTO(cash.get().getOrder().getCustomer().getId(),
                                    cash.get().getOrder().getCustomer().getUsername(),null,
                                    cash.get().getOrder().getCustomer().getFirstName(),cash.get().getOrder().getCustomer().getLastName(),
                                    cash.get().getOrder().getCustomer().getEmail()),
                            new BrandyDTO(cash.get().getOrder().getBrandy().getId(),cash.get().getOrder().getBrandy().getName(),
                                    cash.get().getOrder().getBrandy().getType(),cash.get().getOrder().getBrandy().getPrice(),
                                    cash.get().getOrder().getBrandy().getYear(), cash.get().getOrder().getBrandy().getStrength(),
                                    cash.get().getOrder().getBrandy().isQuantity(), null)),
                    cash.get().getCashTendered());
            return new ResponseEntity<CashDTO>(cashDTO, HttpStatus.OK);
        }
        return new ResponseEntity<CashDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CashDTO> create(@RequestBody Cash cash) {
        try {
            service.save(cash);
            CashDTO cashDTO = new CashDTO(cash.getId(),
                    cash.getAmount(), new OrderDTO(cash.getOrder().getId(),
                    0,null,null,null),
                    cash.getCashTendered());
            return new ResponseEntity<CashDTO>(cashDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<CashDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{cashId}", method = RequestMethod.PUT)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Cash> update(@PathVariable("cashId") Long cashId,
                                             @RequestBody Cash updateCash) {
        Cash cash = service.findOne(cashId).orElse(null);
        if (cash != null) {
            updateCash.setId(cashId);
            service.save(updateCash); //DONE:Sa ovim radi bez BUG-a (Beskonacna rekurzija!)-Roditelj
            return new ResponseEntity<Cash>(updateCash, HttpStatus.OK);
        }
        return new ResponseEntity<Cash>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{cashId}", method = RequestMethod.DELETE)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Cash> delete(@PathVariable("cardId") Long cashId) {
        if (service.findOne(cashId).isPresent()) {
            service.delete(cashId);
            return new ResponseEntity<Cash>(HttpStatus.OK);
        }
        return new ResponseEntity<Cash>(HttpStatus.NOT_FOUND);
    }
}
