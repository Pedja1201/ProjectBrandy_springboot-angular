package org.radak.brandy.app;

import org.radak.brandy.app.model.Admin;
import org.radak.brandy.app.model.UserPermission;
import org.radak.brandy.app.service.AdminService;
import org.radak.brandy.app.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Optional;

@SpringBootApplication
public class BrandyApp implements CommandLineRunner {

    @Autowired
    private AdminService adminService;
    @Autowired
    private PermissionService permissionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args){
        SpringApplication.run(BrandyApp.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        //Added default administrator every time database has no default admin so we can access advanced features of application.
        Optional<Admin> administrator = adminService.findByUsername("admin");
        if(administrator.isPresent()){
            System.out.println("Default administrator already exists.");
        }else{
            Admin newAdmin = new Admin(null, "admin",
                    passwordEncoder.encode("123"), true,"Admin",
                    "Admin", "admin@gmail.com", "5698");
            newAdmin = adminService.save(newAdmin);
            // Dodavanje prava pristupa.
            newAdmin.setUserPermissions(new HashSet<UserPermission>());
            newAdmin.getUserPermissions()                                //Trazimo id=1 zato sto je Admin Administrator (ROLE_ADMIN)
                    .add(new UserPermission(null, newAdmin, permissionService.findOne(1l).get()));
            adminService.save(newAdmin);
            System.out.println("Default administrator added.");
        }
    }
}
