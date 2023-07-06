package org.radak.brandy.app.service;

import org.radak.brandy.app.model.OrderLog;
import org.radak.brandy.app.repository.OrderLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderLogService {
    @Autowired
    private OrderLogRepository orderLogRepository;

    public List<OrderLog> getAll(){
        return this.orderLogRepository.findAll();
    }

    public OrderLog save(OrderLog orderLog) {
        return this.orderLogRepository.insert(orderLog);
    }
}
