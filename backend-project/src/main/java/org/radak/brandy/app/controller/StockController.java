package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.dto.StockDTO;
import org.radak.brandy.app.model.Stock;
import org.radak.brandy.app.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/stock")
public class StockController {
    @Autowired
    private StockService stockService;


    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public ResponseEntity<Iterable<StockDTO>> getAll() {
        ArrayList<StockDTO> stocks = new ArrayList<StockDTO>();

        for (Stock stock : stockService.findAll()) {
            stocks.add(new StockDTO(stock.getId(),stock.getName(),stock.getPalce(),
                    stock.getQuantity(),stock.isAvailability(),
                    new BrandyDTO(stock.getProduct().getId(),stock.getProduct().getName(),
                            stock.getProduct().getType(), stock.getProduct().getPrice(),
                            stock.getProduct().getYear(), stock.getProduct().getStrength(),
                            stock.getProduct().isQuantity(),null),
                    stock.getDescription()));
        }
        return new ResponseEntity<Iterable<StockDTO>>(stocks, HttpStatus.OK);
    }

    @RequestMapping(path = "/{stockId}", method = RequestMethod.GET)
    public ResponseEntity<StockDTO> getOne(@PathVariable("stockId") Long stockId) {
        Optional<Stock> stock = stockService.findOne(stockId);
        if (stock.isPresent()) {
            StockDTO stockDTO = new StockDTO(stock.get().getId(),stock.get().getName(),stock.get().getPalce(),
                    stock.get().getQuantity(),stock.get().isAvailability(),
                    new BrandyDTO(stock.get().getProduct().getId(),stock.get().getProduct().getName(),
                            stock.get().getProduct().getType(), stock.get().getProduct().getPrice(),
                            stock.get().getProduct().getYear(), stock.get().getProduct().getStrength(),
                            stock.get().getProduct().isQuantity(),null),
                    stock.get().getDescription());
            return new ResponseEntity<StockDTO>(stockDTO, HttpStatus.OK);
        }
        return new ResponseEntity<StockDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<StockDTO> create(@RequestBody Stock stock) {
        try {
            stockService.save(stock);
            StockDTO stockDTO = new StockDTO(stock.getId(), stock.getName(),stock.getPalce(),
                    stock.getQuantity(), stock.isAvailability(),
                    new BrandyDTO(stock.getProduct().getId(),stock.getProduct().getName(),
                            stock.getProduct().getType(), stock.getProduct().getPrice(),
                            stock.getProduct().getYear(), stock.getProduct().getStrength(),
                            stock.getProduct().isQuantity(),null),
                    stock.getDescription());
            return new ResponseEntity<StockDTO>(stockDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<StockDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{stockId}", method = RequestMethod.PUT)
    public ResponseEntity<Stock> update(@PathVariable("stockId") Long stockId,
                                                   @RequestBody Stock updatedStock) {
        Stock kupovina = stockService.findOne(stockId).orElse(null);
        if (kupovina != null) {
            updatedStock.setId(stockId);
            stockService.save(updatedStock);
//            updatedStock = stockService.save(updatedStock);
            return new ResponseEntity<Stock>(updatedStock, HttpStatus.OK);
        }
        return new ResponseEntity<Stock>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{stockId}", method = RequestMethod.DELETE)
    public ResponseEntity<Stock> delete(@PathVariable("stockId") Long stockId) {
        if (stockService.findOne(stockId).isPresent()) {
            stockService.delete(stockId);
            return new ResponseEntity<Stock>(HttpStatus.OK);
        }
        return new ResponseEntity<Stock>(HttpStatus.NOT_FOUND);
    }
}
