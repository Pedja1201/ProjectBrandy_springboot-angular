package org.radak.brandy.app.service;

import org.hibernate.criterion.Order;
import org.radak.brandy.app.model.OrderShop;
import org.radak.brandy.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Iterable<OrderShop> findAll() {
        return orderRepository.findAll();
    }

    public Page<OrderShop> findAll(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    public Optional<OrderShop> findOne(Long id) {
        return orderRepository.findById(id);
    }

    public OrderShop save(OrderShop order) {
        return orderRepository.save(order);
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }

    public void delete(OrderShop order) {
        orderRepository.delete(order);
    }

    public Page<OrderShop> findOrderByUserId(Long customer_id, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.getOrderByUserId(customer_id, pageable); }

    public List<OrderShop> getOrderByBrandyId(Long brandy_id) { return orderRepository.getOrderByBrandyId(brandy_id); }

    public List<OrderShop> getPricesByUserId(Long customer_id) { return orderRepository.getPricesByUserId(customer_id); }

}
