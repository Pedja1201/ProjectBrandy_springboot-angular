package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.excepetion.MessageResponse;
import org.radak.brandy.app.model.Customer;
import org.radak.brandy.app.model.UserPermission;
import org.radak.brandy.app.service.CustomerService;
import org.radak.brandy.app.service.PdfService;
import org.radak.brandy.app.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private PdfService pdfService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private PermissionService permissionService;

    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<CustomerDTO>> getAll(@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                                    @RequestParam(name = "pageSize", required = false, defaultValue = "100") Integer pageSize,
                                                    Pageable pageable) {
        pageable = PageRequest.of(pageNumber, pageSize);
        Page<Customer> customer = customerService.findAll(pageable);
        Page<CustomerDTO> customers = customer.map(new Function<Customer, CustomerDTO>() {
            public CustomerDTO apply(Customer customer) {
                CustomerDTO customerDTO = new CustomerDTO(customer.getId(), customer.getUsername(),
                        customer.getPassword(), customer.isActive(), customer.getFirstName(), customer.getLastName(), customer.getEmail());
                // Conversion logic
                return customerDTO;
            }
        });
        return new ResponseEntity<Page<CustomerDTO>>(customers, HttpStatus.OK);
    }

    @RequestMapping(path = "/{username}", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<CustomerDTO> get(@PathVariable("username") String username) {
        Optional<Customer> customer = customerService.findOneCustomer(username);
        if (customer.isPresent()) {
            CustomerDTO customerDTO = new CustomerDTO(customer.get().getId(),
                    customer.get().getUsername(), customer.get().getPassword(),customer.get().isActive(),
                    customer.get().getFirstName(), customer.get().getLastName(),
                    customer.get().getEmail());
            System.out.println("Customer founded");
            return new ResponseEntity<CustomerDTO>(customerDTO, HttpStatus.OK);
        }
        return new ResponseEntity<CustomerDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<CustomerDTO> create(@RequestBody Customer customer) {
        try {
            customer.setPassword(encoder.encode(customer.getPassword()));
            customerService.save(customer);
            customer.setUserPermissions(new HashSet<UserPermission>());
            customer.getUserPermissions()
                    .add(new UserPermission(null, customer, permissionService.findOne(2l).get()));
            customerService.save(customer);
            CustomerDTO customerDTO = new CustomerDTO(customer.getId(),
                    customer.getUsername(), customer.getPassword(),true,
                    customer.getFirstName(), customer.getLastName(), customer.getEmail());
            return new ResponseEntity<CustomerDTO>(customerDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<CustomerDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{customerId}", method = RequestMethod.PUT)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<CustomerDTO> update(@PathVariable("customerId") Long customerId,
                                              @RequestBody Customer updatedCustomer) {
        Customer customer = customerService.findOne(customerId).orElse(null);
        if (customer != null) {
            updatedCustomer.setId(customerId);
            if(updatedCustomer.getPassword().isEmpty()){
                updatedCustomer.setPassword(customer.getPassword());
                customerService.save(updatedCustomer);
            } else if (updatedCustomer.getPassword().equals(customer.getPassword()) == true) {
                customerService.save(updatedCustomer);
            }else{
                updatedCustomer.setPassword(encoder.encode(updatedCustomer.getPassword()));
                customerService.save(updatedCustomer); //DONE:Sa ovim radi bez BUG-a (Beskonacna rekurzija!)-Roditelj
            }
            CustomerDTO customerDTO = new CustomerDTO(updatedCustomer.getId(),
                    updatedCustomer.getUsername(), updatedCustomer.getPassword(),updatedCustomer.isActive(),
                    updatedCustomer.getFirstName(), updatedCustomer.getLastName(),
                    updatedCustomer.getEmail());
            return new ResponseEntity<CustomerDTO>(customerDTO, HttpStatus.OK);
        }
        return new ResponseEntity<CustomerDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{customerId}", method = RequestMethod.DELETE)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<Customer> delete(@PathVariable("customerId") Long customerId) {
        if (customerService.findOne(customerId).isPresent()) {
            customerService.delete(customerId);
            return new ResponseEntity<Customer>(HttpStatus.OK);
        }
        return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/checkEmail/{userId}/{mail}")
    public ResponseEntity<?> checkEmail(@PathVariable("userId") String userId, @PathVariable("mail") String mail) {
        if (customerService.existsByEmail(mail) == true) {
            if(!userId.equals("null")) {
                Optional<Customer> customer = customerService.findOne(Long.parseLong((userId)));
                if(!mail.equals(customer.get().getEmail())) { return ResponseEntity.badRequest().body(new MessageResponse("E-Mail is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("E-Mail is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("E-Mail is free!"));
    }

    @GetMapping("/checkUsername/{userId}/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable("userId") String userId, @PathVariable("username") String username) {
        if (customerService.existsByUsername(username) == true) {
            if(!userId.equals("null")) {
                Optional<Customer> customer = customerService.findOne(Long.parseLong(userId));
                if(!username.equals(customer.get().getUsername())) { return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("Username is free!"));
    }

    //PDF Download Method - Required (PdfService, pom.xml, resources)
    @RequestMapping(path = "/export", method = RequestMethod.GET)
    public void downloadPdf(HttpServletResponse response){
        try{
            Path file = Paths.get(pdfService.generateKupciPdf().getAbsolutePath());
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
}
