package org.radak.project.rakija.app.controller;

import org.radak.project.rakija.app.dto.AdminDTO;
import org.radak.project.rakija.app.model.Admin;
import org.radak.project.rakija.app.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api/admini")
public class AdminController {
    @Autowired
    private AdminService adminService;


    @RequestMapping(path = "", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<AdminDTO>> getAll(Pageable pageable) {
        Page<Admin> administrator = adminService.findAll(pageable);
        Page<AdminDTO> administratori = administrator.map(new Function<Admin, AdminDTO>() {
            public AdminDTO apply(Admin administrator) {
                AdminDTO administratorDTO = new AdminDTO(administrator.getId(),administrator.getKorisnickoIme(), administrator.getLozinka(),
                        administrator.getIme(), administrator.getPrezime(), administrator.getEmail(), administrator.getJmbg());
                // Conversion logic
                return administratorDTO;
            }
        });
        return new ResponseEntity<Page<AdminDTO>>(administratori, HttpStatus.OK);
    }

    @RequestMapping(path = "/{administratorId}", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> get(@PathVariable("administratorId") Long administratorId) {
        Optional<Admin> administrator = adminService.findOne(administratorId);
        if (administrator.isPresent()) {
            AdminDTO administratorDTO = new AdminDTO(administrator.get().getId(),administrator.get().getKorisnickoIme(),administrator.get().getLozinka(),
                    administrator.get().getIme(),administrator.get().getPrezime(),administrator.get().getEmail(),administrator.get().getJmbg());
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.OK);
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> create(@RequestBody Admin administrator) {
        try {
            adminService.save(administrator);
            AdminDTO administratorDTO = new AdminDTO(administrator.getId(),administrator.getKorisnickoIme(),administrator.getLozinka(),
                    administrator.getIme(), administrator.getPrezime(), administrator.getEmail(), administrator.getJmbg());
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{administratorId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> update(@PathVariable("administratorId") Long administratorId,
                                                   @RequestBody Admin izmenjenAdministrator) {
        Admin administrator = adminService.findOne(administratorId).orElse(null);
        if (administrator != null) {
            izmenjenAdministrator.setId(administratorId);
            adminService.save(izmenjenAdministrator);
            AdminDTO administratorDTO = new AdminDTO(izmenjenAdministrator.getId(),izmenjenAdministrator.getKorisnickoIme(),
                    izmenjenAdministrator.getLozinka(), izmenjenAdministrator.getIme(), izmenjenAdministrator.getPrezime(),
                    izmenjenAdministrator.getEmail(), izmenjenAdministrator.getJmbg());
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.OK);
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{administratorId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Admin> delete(@PathVariable("administratorId") Long administratorId) {
        if (adminService.findOne(administratorId).isPresent()) {
            adminService.delete(administratorId);
            return new ResponseEntity<Admin>(HttpStatus.OK);
        }
        return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
    }
}
