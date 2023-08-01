package org.radak.brandy.app.controller;


import org.radak.brandy.app.dto.AdminDTO;
import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.excepetion.MessageResponse;
import org.radak.brandy.app.model.Admin;
import org.radak.brandy.app.model.Customer;
import org.radak.brandy.app.model.UserPermission;
import org.radak.brandy.app.service.AdminService;
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

import java.util.ArrayList;
import java.util.HashSet;
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

    @Autowired
    private PermissionService permissionService;

    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<AdminDTO>> getAll(@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                                 @RequestParam(name = "pageSize", required = false, defaultValue = "5") Integer pageSize,
                                                 Pageable pageable) {
        pageable = PageRequest.of(pageNumber, pageSize);
        Page<Admin> administrator = adminService.findAll(pageable);
        Page<AdminDTO> administratori = administrator.map(new Function<Admin, AdminDTO>() {
            public AdminDTO apply(Admin administrator) {
                AdminDTO administratorDTO = new AdminDTO(administrator.getId(),administrator.getUsername(), administrator.getPassword(),
                        administrator.isActive(), administrator.getFirstName(), administrator.getLastName(), administrator.getEmail(), administrator.getUpin());
                // Conversion logic
                return administratorDTO;
            }
        });
        return new ResponseEntity<Page<AdminDTO>>(administratori, HttpStatus.OK);
    }

    //gets all admins but without pagination
    @RequestMapping(path = "/allAdmins", method = RequestMethod.GET)
    // @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Iterable<AdminDTO>> getAllAdmins() {
        Iterable<Admin> admins = adminService.findAll();
        Iterable<AdminDTO> adminDTOS = new ArrayList<>();
        for (Admin admin : admins) {
            AdminDTO administratorDTO = new AdminDTO(admin.getId(),admin.getUsername(), admin.getPassword(),
                    admin.isActive(), admin.getFirstName(), admin.getLastName(), admin.getEmail(), admin.getUpin());
            ((ArrayList<AdminDTO>) adminDTOS).add(administratorDTO);
        }
        System.out.println("Admins found");
        return new ResponseEntity<>(adminDTOS, HttpStatus.OK);

    }

    @RequestMapping(path = "/{username}", method = RequestMethod.GET)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> getByUsername(@PathVariable("username") String username) {
        Optional<Admin> administrator = adminService.findByUsername(username);
        if (administrator.isPresent()) {
            AdminDTO administratorDTO = new AdminDTO(administrator.get().getId(),administrator.get().getUsername(),administrator.get().getPassword(),
                    administrator.get().isActive(), administrator.get().getFirstName(),administrator.get().getLastName(),administrator.get().getEmail(),administrator.get().getUpin());
            System.out.println("Admin founded");
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.OK);
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.NOT_FOUND);
    }

    //modified for password encoder and roles
    @RequestMapping(path = "", method = RequestMethod.POST)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<AdminDTO> create(@RequestBody Admin administrator) {
        try {
            administrator.setPassword(encoder.encode(administrator.getPassword()));
            adminService.save(administrator);
            administrator.setUserPermissions(new HashSet<UserPermission>());
            administrator.getUserPermissions()
                    .add(new UserPermission(null, administrator, permissionService.findOne(1l).get()));
            adminService.save(administrator);
            AdminDTO administratorDTO = new AdminDTO(administrator.getId(),
                    administrator.getUsername(), administrator.getPassword(),true,
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
                    updatedAdministrator.getPassword(),updatedAdministrator.isActive(),
                    updatedAdministrator.getFirstName(), updatedAdministrator.getLastName(),
                    updatedAdministrator.getEmail(), updatedAdministrator.getUpin());
            return new ResponseEntity<AdminDTO>(administratorDTO, HttpStatus.OK);
        }
        return new ResponseEntity<AdminDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{administratorId}", method = RequestMethod.DELETE)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<Admin> delete(@PathVariable("administratorId") Long administratorId) {
        if (adminService.findOne(administratorId).isPresent()) {
            adminService.delete(administratorId);
            return new ResponseEntity<Admin>(HttpStatus.OK);
        }
        return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/checkEmail/{userId}/{mail}")
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

    //checks if parsed upin of administator already exists in database(used by another admin)
    @GetMapping("/checkupin/{userId}/{upin}")
    public ResponseEntity<?> checkUpin(@PathVariable("userId") String userId, @PathVariable("upin") String upin) {
        if (adminService.existsByUpin(upin) == true) {
            if(!userId.equals("null")) {
                Optional<Admin> admin = adminService.findOne(Long.parseLong(userId));
                if(!upin.equals(admin.get().getUsername())) { return ResponseEntity.badRequest().body(new MessageResponse("Upin is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Upin is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("Upin is free!"));
    }

}
