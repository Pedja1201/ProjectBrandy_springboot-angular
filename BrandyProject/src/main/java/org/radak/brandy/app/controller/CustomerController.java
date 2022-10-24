package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.model.Customer;
import org.radak.brandy.app.service.CustomerService;
import org.radak.brandy.app.service.PdfService;
import org.radak.project.rakija.app.dto.KupacDTO;
import org.radak.project.rakija.app.model.Kupac;
import org.radak.project.rakija.app.service.KupacService;
import org.radak.project.rakija.app.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/customers")
public class KupacController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private PdfService pdfService;

    @RequestMapping(path = "", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<CustomerDTO>> getAll(Pageable pageable) {
        Page<Customer> customer = customerService.findAll(pageable);
        Page<CustomerDTO> customers = customer.map(new Function<Customer, CustomerDTO>() {
            public CustomerDTO apply(Customer customer) {
                CustomerDTO customerDTO = new CustomerDTO(customer.getId(), customer.getUsername(),
                        customer.getPassword(), customer.getFirstName(), customer.getLastName(), customer.getEmail());
                // Conversion logic
                return customerDTO;
            }
        });
        return new ResponseEntity<Page<CustomerDTO>>(customers, HttpStatus.OK);
    }

    @RequestMapping(path = "/{kupacId}", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<KupacDTO> get(@PathVariable("kupacId") Long kupacId) {
        Optional<Kupac> kupac = kupacService.findOne(kupacId);
        if (kupac.isPresent()) {
            KupacDTO kupacDTO = new KupacDTO(kupac.get().getId(),
                    kupac.get().getKorisnickoIme(), kupac.get().getLozinka(), kupac.get().getIme(), kupac.get().getPrezime(),
                    kupac.get().getEmail());
            return new ResponseEntity<KupacDTO>(kupacDTO, HttpStatus.OK);
        }
        return new ResponseEntity<KupacDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<KupacDTO> create(@RequestBody Kupac kupac) {
        try {
            kupacService.save(kupac);
            KupacDTO kupacDTO = new KupacDTO(kupac.getId(),
                    kupac.getKorisnickoIme(), kupac.getLozinka(), kupac.getIme(), kupac.getPrezime(), kupac.getEmail());
            return new ResponseEntity<KupacDTO>(kupacDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<KupacDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{kupacId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<KupacDTO> update(@PathVariable("kupacId") Long kupacId,
                                              @RequestBody Kupac izmenjenKupac) {
        Kupac kupac = kupacService.findOne(kupacId).orElse(null);
        if (kupac != null) {
            izmenjenKupac.setId(kupacId);
            kupacService.save(izmenjenKupac);  //DONE:Sa ovim radi bez BUG-a (Beskonacna rekurzija!)-Roditelj
            KupacDTO kupacDTO = new KupacDTO(izmenjenKupac.getId(),
                    izmenjenKupac.getKorisnickoIme(), izmenjenKupac.getLozinka(),
                    izmenjenKupac.getIme(), izmenjenKupac.getPrezime(), izmenjenKupac.getEmail());
            return new ResponseEntity<KupacDTO>(kupacDTO, HttpStatus.OK);
        }
        return new ResponseEntity<KupacDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{kupacId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Kupac> delete(@PathVariable("kupacId") Long kupacId) {
        if (kupacService.findOne(kupacId).isPresent()) {
            kupacService.delete(kupacId);
            return new ResponseEntity<Kupac>(HttpStatus.OK);
        }
        return new ResponseEntity<Kupac>(HttpStatus.NOT_FOUND);
    }

    //Metoda za preuzimanje PDF dokumenta - Potrebno (PdfService, pom.xml, resources)
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
