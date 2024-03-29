package org.radak.brandy.app.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import org.radak.brandy.app.aspect.LoggedOrder;
import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.dto.OrderDTO;
import org.radak.brandy.app.model.Brandy;
import org.radak.brandy.app.model.Customer;
import org.radak.brandy.app.model.OrderShop;
import org.radak.brandy.app.service.EmailService;
import org.radak.brandy.app.service.OrderService;
import org.radak.brandy.app.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private PdfService pdfService;
    @Autowired
    private EmailService emailService;


    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<Page<OrderDTO>> getAll(@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                                 @RequestParam(name = "pageSize", required = false, defaultValue = "100") Integer pageSize,
                                                 Pageable pageable) {

        pageable = PageRequest.of(pageNumber, pageSize);
        Page<OrderShop> order = orderService.findAll(pageable);
        Page<OrderDTO> orders = order.map(new Function<OrderShop, OrderDTO>() {
            public OrderDTO apply(OrderShop order) {
                OrderDTO porudzbinaDTO = new OrderDTO(order.getId(), order.getQuantity(), order.getDateOfPurchase(),order.isConfirm(),
                        new CustomerDTO(order.getCustomer().getId(), order.getCustomer().getUsername(),null,order.getCustomer().isActive(),
                                order.getCustomer().getFirstName(),order.getCustomer().getLastName(),
                                order.getCustomer().getEmail()),
                        new BrandyDTO(order.getBrandy().getId(), order.getBrandy().getName(),
                                order.getBrandy().getType(),order.getBrandy().getPrice(),
                                order.getBrandy().getYear(),order.getBrandy().getStrength(),
                                order.getBrandy().isQuantity(), order.getBrandy().getUrl())
                );
                // Conversion logic

                return porudzbinaDTO;
            }
        });
        return new ResponseEntity<Page<OrderDTO>>(orders, HttpStatus.OK);
    }

    @RequestMapping(path = "/{orderId}/getOne", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> get(@PathVariable("orderId") Long orderId) {
        Optional<OrderShop> order = orderService.findOne(orderId);
        if (order.isPresent()) {
            OrderDTO orderDTO = new OrderDTO(order.get().getId(),order.get().getQuantity(),
                    order.get().getDateOfPurchase(),order.get().isConfirm(),
                    new CustomerDTO(order.get().getCustomer().getId(), order.get().getCustomer().getUsername(),
                            order.get().getCustomer().getPassword(), order.get().getCustomer().isActive(),order.get().getCustomer().getFirstName(),
                            order.get().getCustomer().getLastName(), order.get().getCustomer().getEmail()),
                    new BrandyDTO(order.get().getBrandy().getId(),order.get().getBrandy().getName(),
                            order.get().getBrandy().getType(), order.get().getBrandy().getPrice(),
                            order.get().getBrandy().getYear(),order.get().getBrandy().getStrength(),
                            order.get().getBrandy().isQuantity(), order.get().getBrandy().getUrl())
                     );
            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }

    @LoggedOrder
    @RequestMapping(path = "", method = RequestMethod.POST)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> create(@RequestBody OrderShop order) {
        try {
            orderService.save(order);
            BrandyDTO brandyDTO =  new BrandyDTO(order.getBrandy().getId(),
                    order.getBrandy().getName(), order.getBrandy().getType(),
                    order.getBrandy().getPrice(), order.getBrandy().getYear(),
                    order.getBrandy().getStrength(), order.getBrandy().isQuantity(), null);
            CustomerDTO customerDTO =  new CustomerDTO(order.getCustomer().getId(),
                    order.getCustomer().getUsername(),null,order.getCustomer().isActive(),
                    order.getCustomer().getFirstName(),order.getCustomer().getLastName(),
                    order.getCustomer().getEmail());

            OrderDTO orderDTO = new OrderDTO(order.getId(), order.getQuantity(),
                    order.getDateOfPurchase(),true, customerDTO, brandyDTO);
            // Kreirajte sadržaj emaila sa vrijednostima iz orderDTO objekta
            String recipientEmail = "stan6d1a@email.com";
            String subject = "Novi order kreiran!!!";
            String emailContent = "Detalji novog ordera:\n" +
                    "Order ID: " + orderDTO.getId() + "\n" +
                    "Količina: " + orderDTO.getQuantity() + "L" + "\n" +
                    "Datum kupovine: " + orderDTO.getDateOfPurchase() + "\n" +
//                    "Kupac: " + orderDTO.getCustomer().getUsername() + orderDTO.getCustomer().getEmail() + "\n" +
                    "Proizvod: " + orderDTO.getBrandy().getName() + ", " + orderDTO.getBrandy().getType() + ", " + orderDTO.getBrandy().getPrice() + "\n" +
                    "Ukupno za naplatu: " + orderDTO.getQuantity() * orderDTO.getBrandy().getPrice();

            // Pošalji email s kreiranim sadržajem
            emailService.sendEmail(recipientEmail, subject, emailContent);
            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{orderId}", method = RequestMethod.PUT)
    //@Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> update(@PathVariable("orderId") Long orderId,
                                                   @RequestBody OrderShop updatedOrder) {
        OrderShop order = orderService.findOne(orderId).orElse(null);
        if (order != null) {
            updatedOrder.setId(orderId);
            orderService.save(updatedOrder);
            BrandyDTO brandyDTO =  new BrandyDTO(updatedOrder.getBrandy().getId(),
                    updatedOrder.getBrandy().getName(), updatedOrder.getBrandy().getType(),
                    updatedOrder.getBrandy().getPrice(), updatedOrder.getBrandy().getYear(),
                    updatedOrder.getBrandy().getStrength(), updatedOrder.getBrandy().isQuantity(), null);
            CustomerDTO customerDTO =  new CustomerDTO(updatedOrder.getCustomer().getId(),
                    updatedOrder.getCustomer().getUsername(),null,updatedOrder.getCustomer().isActive(),
                    updatedOrder.getCustomer().getFirstName(),updatedOrder.getCustomer().getLastName(),
                    updatedOrder.getCustomer().getEmail());

            OrderDTO orderDTO = new OrderDTO(updatedOrder.getId(), updatedOrder.getQuantity(),
                    updatedOrder.getDateOfPurchase(), updatedOrder.isConfirm(), customerDTO, brandyDTO);

            return new ResponseEntity<OrderDTO>(orderDTO, HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{orderId}", method = RequestMethod.DELETE)
    //@Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<OrderDTO> delete(@PathVariable("orderId") Long orderId) {
        if (orderService.findOne(orderId).isPresent()) {
            orderService.delete(orderId);
            return new ResponseEntity<OrderDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<OrderDTO>(HttpStatus.NOT_FOUND);
    }

    //PDF Download Method - Required (PdfService, pom.xml, resources)
    @RequestMapping(path = "/export", method = RequestMethod.GET)
    public void downloadPdfOrder(HttpServletResponse response){
        try{
            Path file = Paths.get(pdfService.generateOrdersPdf().getAbsolutePath());
            if (Files.exists(file)){
                response.setContentType("application/pdf");
                response.addHeader("Content-Disposition", "attachment; filename"+ file.getFileName());
                Files.copy(file, response.getOutputStream());
                response.getOutputStream().flush();
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @GetMapping("/ordersOfUser")
    public ResponseEntity<Page<OrderDTO>> getOrdersByUserId(@RequestParam(name = "id") Long id,
                                                            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                                            @RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize) {
        Page<OrderShop> order = orderService.findOrderByUserId(id, pageNumber, pageSize);

        Page<OrderDTO> orders = order.map(orderShop -> {
            CustomerDTO customerDTO = new CustomerDTO(
                    orderShop.getCustomer().getId(),
                    orderShop.getCustomer().getUsername(),
                    orderShop.getCustomer().getPassword(),
                    orderShop.getCustomer().isActive(),
                    orderShop.getCustomer().getFirstName(),
                    orderShop.getCustomer().getLastName(),
                    orderShop.getCustomer().getEmail()
            );

            BrandyDTO brandyDTO = new BrandyDTO(
                    orderShop.getBrandy().getId(),
                    orderShop.getBrandy().getName(),
                    orderShop.getBrandy().getType(),
                    orderShop.getBrandy().getPrice(),
                    orderShop.getBrandy().getYear(),
                    orderShop.getBrandy().getStrength(),
                    orderShop.getBrandy().isQuantity(),
                    orderShop.getBrandy().getUrl()
            );

            return new OrderDTO(
                    orderShop.getId(),
                    orderShop.getQuantity(),
                    orderShop.getDateOfPurchase(),
                    orderShop.isConfirm(),
                    customerDTO,
                    brandyDTO
            );
        });

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}/AllpricesByUserId", method = RequestMethod.GET)
    public ResponseEntity<?> getPricesByUserId(@PathVariable("id") Long id) {
        List<OrderShop> orders = orderService.getPricesByUserId(id);
        if(!orders.isEmpty()){
            Integer totalOrders = orders.size();
            Double total = 0.0;
            for(OrderShop o : orders){
                if(o.isConfirm()) {
                    Double temp = 0.0;
                    temp = o.getQuantity() * o.getBrandy().getPrice();
                    total += temp;
                }
            }
            Map<String, Number> keys = new HashMap<>();
            keys.put("totalOrder", totalOrders);
            keys.put("total", total);
            return new ResponseEntity<>(keys, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{id}/orders/brandyId", method = RequestMethod.GET)
    public ResponseEntity<List<OrderDTO>> getOrderByBrandyId(@PathVariable("id") Long id) {
        List<OrderShop> orders = orderService.getOrderByBrandyId(id);
        if (!orders.isEmpty()) {
            List<OrderDTO> orderDTOs = new ArrayList<>();
            for (OrderShop order : orders) {
                OrderDTO orderDTO = new OrderDTO(
                        order.getId(),
                        order.getQuantity(),
                        order.getDateOfPurchase(),
                        order.isConfirm(),
                        new CustomerDTO(
                                order.getCustomer().getId(),
                                order.getCustomer().getUsername(),
                                order.getCustomer().getPassword(),
                                order.getCustomer().isActive(),
                                order.getCustomer().getFirstName(),
                                order.getCustomer().getLastName(),
                                order.getCustomer().getEmail()

                        ),
                        new BrandyDTO(
                                order.getBrandy().getId(),
                                order.getBrandy().getName(),
                                order.getBrandy().getType(),
                                order.getBrandy().getPrice(),
                                order.getBrandy().getYear(),
                                order.getBrandy().getStrength(),
                                order.getBrandy().isQuantity(),
                                order.getBrandy().getUrl()
                        )
                );
                orderDTOs.add(orderDTO);
            }
            System.out.println("Orders founded by brandy ID!");
            return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
        }
        System.out.println("User has no orders by brandy ID!");
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
