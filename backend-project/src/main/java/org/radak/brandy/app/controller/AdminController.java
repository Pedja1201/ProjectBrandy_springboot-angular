package org.radak.brandy.app.controller;


import org.radak.brandy.app.dto.AdminDTO;
import org.radak.brandy.app.excepetion.MessageResponse;
import org.radak.brandy.app.model.Admin;
import org.radak.brandy.app.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api/admins")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder encoder;

    @RequestMapping(path = "", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<AdminDTO>> getAll(Pageable pageable) {
        Page<Admin> administrator = adminService.findAll(pageable);
        Page<AdminDTO> administratori = administrator.map(new Function<Admin, AdminDTO>() {
            public AdminDTO apply(Admin administrator) {
                AdminDTO administratorDTO = new AdminDTO(administrator.getId(),administrator.getUsername(), administrator.getPassword(),
                        administrator.getFirstName(), administrator.getLastName(), administrator.getEmail(), administrator.getUpin());
                // Conversion logic
                return administratorDTO;
            }
        });
        return new ResponseEntity<Page<AdminDTO>>(administratori, HttpStatus.OK);
    }

    @RequestMapping(path = "/{username}", method = RequestMethod.GET)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> getByUsername(@PathVariable("username") String username) {
        Optional<Admin> administrator = adminService.findByUsername(username);
        if (administrator.isPresent()) {
            AdminDTO administratorDTO = new AdminDTO(administrator.get().getId(),administrator.get().getUsername(),administrator.get().getPassword(),
                    administrator.get().getFirstName(),administrator.get().getLastName(),administrator.get().getEmail(),administrator.get().getUpin());
            System.out.println("Admin founded");
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.OK);
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> create(@RequestBody Admin administrator) {
        try {
            adminService.save(administrator);
            AdminDTO administratorDTO = new AdminDTO(administrator.getId(),administrator.getUsername(),administrator.getPassword(),
                    administrator.getFirstName(), administrator.getLastName(), administrator.getEmail(), administrator.getUpin());
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{administratorId}", method = RequestMethod.PUT)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> update(@PathVariable("administratorId") Long administratorId,
                                                   @RequestBody Admin updatedAdministrator) {
        Admin administrator = adminService.findOne(administratorId).orElse(null);
        if (administrator != null) {
            updatedAdministrator.setId(administratorId);
//            adminService.save(updatedAdministrator);
            if(updatedAdministrator.getPassword().isEmpty()){
                updatedAdministrator.setPassword(administrator.getPassword());
                adminService.save(updatedAdministrator);
            } else if (updatedAdministrator.getPassword().equals(administrator.getPassword()) == true) {
                adminService.save(updatedAdministrator);
            }else{
                updatedAdministrator.setPassword(encoder.encode(updatedAdministrator.getPassword()));
                adminService.save(updatedAdministrator); //DONE:Sa ovim radi bez BUG-a (Beskonacna rekurzija!)-Roditelj
            }
            AdminDTO administratorDTO = new AdminDTO(updatedAdministrator.getId(),updatedAdministrator.getUsername(),
                    updatedAdministrator.getPassword()
                    , updatedAdministrator.getFirstName(), updatedAdministrator.getLastName(),
                    updatedAdministrator.getEmail(), updatedAdministrator.getUpin());
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

    @GetMapping("/checkEmail/{userId}/{mail}")
    //@PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<?> checkEmail(@PathVariable("userId") String userId, @PathVariable("mail") String mail) {
        if (adminService.existsByEmail(mail) == true) {
            if(!userId.equals("null")) {
                Optional<Admin> admin = adminService.findOne(Long.parseLong((userId)));
                if(!mail.equals(admin.get().getEmail())) { return ResponseEntity.badRequest().body(new MessageResponse("E-Mail is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("E-Mail is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("E-Mail is free!"));
    }

    @GetMapping("/checkUsername/{userId}/{username}")
    //@PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<?> checkUsername(@PathVariable("userId") String userId, @PathVariable("username") String username) {
        if (adminService.existsByUsername(username) == true) {
            if(!userId.equals("null")) {
                Optional<Admin> admin = adminService.findOne(Long.parseLong(userId));
                if(!username.equals(admin.get().getUsername())) { return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("Username is free!"));
    }

}
