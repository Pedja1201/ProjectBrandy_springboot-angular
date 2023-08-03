package org.radak.brandy.app.service;

import org.radak.brandy.app.model.Stock;
import org.radak.brandy.app.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public Iterable<Stock> findAll() {
        return stockRepository.findAll();
    }

    public Optional<Stock> findOne(Long id) {
        return stockRepository.findById(id);
    }

    public Stock save(Stock stock) {
        return stockRepository.save(stock);
    }

    public void delete(Long id) {
        stockRepository.deleteById(id);
    }

    public void delete(Stock stock) {
        stockRepository.delete(stock);
    }
}
