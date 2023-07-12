package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.UserDTO;
import org.radak.brandy.app.excepetion.MessageResponse;
import org.radak.brandy.app.model.User;
import org.radak.brandy.app.service.AdminService;
import org.radak.brandy.app.service.CustomerService;
import org.radak.brandy.app.service.UserService;
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
@RequestMapping(path = "/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminService adminService;

    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<Page<UserDTO>> getAll(Pageable pageable) {
        Page<User> user = userService.findAll(pageable);
        Page<UserDTO> users = user.map(new Function<User, UserDTO>() {
            public UserDTO apply(User user) {
                UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(),
                        user.getPassword()
                );
                // Conversion logic
                return userDTO;
            }
        });
        return new ResponseEntity<Page<UserDTO>>(users, HttpStatus.OK);
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<UserDTO> get(@PathVariable("userId") Long userId) {
        Optional<User> user = userService.findOne(userId);
        if (user.isPresent()) {
            UserDTO userDTO = new UserDTO(user.get().getId(),
                    user.get().getUsername(), user.get().getPassword());
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
        }
        return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<UserDTO> create(@RequestBody User user) {
        try {
            userService.save(user);
            UserDTO userDTO = new UserDTO(user.getId(),
                    user.getUsername(), user.getPassword());
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<UserDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<UserDTO> update(@PathVariable("userId") Long userId,
                                              @RequestBody User updatedUser) {
        User user = userService.findOne(userId).orElse(null);
        if (user != null) {
            updatedUser.setId(userId);
            userService.save(updatedUser);
            UserDTO korisnikDTO = new UserDTO(updatedUser.getId(),
                    updatedUser.getUsername(), updatedUser.getPassword());
            return new ResponseEntity<UserDTO>(korisnikDTO, HttpStatus.OK);
        }
        return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<User> delete(@PathVariable("userId") Long userId) {
        if (userService.findOne(userId).isPresent()) {
            userService.delete(userId);
            return new ResponseEntity<User>(HttpStatus.OK);
        }
        return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{username}/details")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable("username") String username) {
        Optional<User> user = userService.findByUsername(username);
        if (user.isPresent()) {
            UserDTO userDTO = new UserDTO(user.get().getId(), user.get().getUsername(), user.get().getPassword());
            System.out.println("User founded by username");
            return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);
        }
        System.out.println("User not founded");
        return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/checkUsername/{userId}/{username}")
    //@PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<?> checkUsername(@PathVariable("userId") String userId, @PathVariable("username") String username) {
        if (userService.existsByUsername(username) == true) {
            if(!userId.equals("null")) {
                Optional<User> user = userService.findOne(Long.parseLong(userId));
                if(!username.equals(user.get().getUsername())) { return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!")); }
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
            }
        }
        return ResponseEntity.ok(new MessageResponse("Username is free!"));
    }


}