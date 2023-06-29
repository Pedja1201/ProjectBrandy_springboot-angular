package org.radak.brandy.app.controller;


import org.radak.brandy.app.aspect.Logged;
import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.dto.OrderDTO;
import org.radak.brandy.app.model.OrderShop;
import org.radak.brandy.app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Optional;
import java.util.function.Function;

@Controller
@RequestMapping(path = "/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Logged
    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<Page<OrderDTO>> getAll(Pageable pageable) {
        Page<OrderShop> order = orderService.findAll(pageable);
        Page<OrderDTO> orders = order.map(new Function<OrderShop, OrderDTO>() {
            public OrderDTO apply(OrderShop order) {
                OrderDTO porudzbinaDTO = new OrderDTO(order.getId(), order.getQuantity(), order.getDateOfPurchase(),
                        new CustomerDTO(order.getCustomer().getId(), order.getCustomer().getUsername(),null,
                                order.getCustomer().getFirstName(),order.getCustomer().getLastName(),
                                order.getCustomer().getEmail()),
                        new BrandyDTO(order.getBrandy().getId(), order.getBrandy().getName(),
                                order.getBrandy().getType(),order.getBrandy().getPrice(),
                                order.getBrandy().getYear(),order.getBrandy().getStrength())
                );
                // Conversion logic

                return porudzbinaDTO;
            }
        });
        return new ResponseEntity<Page<OrderDTO>>(orders, HttpStatus.OK);
    }

    @RequestMapping(path = "/{orderId}", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> get(@PathVariable("orderId") Long orderId) {
        Optional<OrderShop> order = orderService.findOne(orderId);
        if (order.isPresent()) {
            OrderDTO orderDTO = new OrderDTO(order.get().getId(),order.get().getQuantity(),
                    order.get().getDateOfPurchase(),
                    new CustomerDTO(order.get().getCustomer().getId(), order.get().getCustomer().getUsername(),
                            order.get().getCustomer().getPassword(),order.get().getCustomer().getFirstName(),
                            order.get().getCustomer().getLastName(), order.get().getCustomer().getEmail()),
                    new BrandyDTO(order.get().getBrandy().getId(),order.get().getBrandy().getName(),
                            order.get().getBrandy().getType(), order.get().getBrandy().getPrice(),
                            order.get().getBrandy().getYear(),order.get().getBrandy().getStrength())
                     );
            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> create(@RequestBody OrderShop order) {
        try {
            orderService.save(order);
            BrandyDTO brandyDTO =  new BrandyDTO(order.getBrandy().getId(),
                    order.getBrandy().getName(), order.getBrandy().getType(),
                    order.getBrandy().getPrice(), order.getBrandy().getYear(),
                    order.getBrandy().getStrength());
            CustomerDTO customerDTO =  new CustomerDTO(order.getCustomer().getId(),
                    order.getCustomer().getUsername(),null,
                    order.getCustomer().getFirstName(),order.getCustomer().getLastName(),
                    order.getCustomer().getEmail());

            OrderDTO orderDTO = new OrderDTO(order.getId(), order.getQuantity(),
                    order.getDateOfPurchase(), customerDTO, brandyDTO);

            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{orderId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> update(@PathVariable("orderId") Long orderId,
                                                   @RequestBody OrderShop updatedOrder) {
        OrderShop order = orderService.findOne(orderId).orElse(null);
        if (order != null) {
            updatedOrder.setId(orderId);
            orderService.save(updatedOrder);
            BrandyDTO brandyDTO =  new BrandyDTO(updatedOrder.getBrandy().getId(),
                    updatedOrder.getBrandy().getName(), updatedOrder.getBrandy().getType(),
                    updatedOrder.getBrandy().getPrice(), updatedOrder.getBrandy().getYear(),
                    updatedOrder.getBrandy().getStrength());
            CustomerDTO customerDTO =  new CustomerDTO(updatedOrder.getCustomer().getId(),
                    updatedOrder.getCustomer().getUsername(),null,
                    updatedOrder.getCustomer().getFirstName(),updatedOrder.getCustomer().getLastName(),
                    updatedOrder.getCustomer().getEmail());

            OrderDTO orderDTO = new OrderDTO(updatedOrder.getId(), updatedOrder.getQuantity(),
                    updatedOrder.getDateOfPurchase(),customerDTO, brandyDTO);

            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{orderId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> delete(@PathVariable("orderId") Long orderId) {
        if (orderService.findOne(orderId).isPresent()) {
            orderService.delete(orderId);
            return new ResponseEntity<OrderDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }
}
