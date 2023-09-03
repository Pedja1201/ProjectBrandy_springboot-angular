package org.radak.brandy.app;

import org.radak.brandy.app.service.AdminService;
import org.radak.brandy.app.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;



@SpringBootApplication
public class BrandyApp{

    @Autowired
    private AdminService adminService;
    @Autowired
    private PermissionService permissionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args){
        SpringApplication.run(BrandyApp.class, args);
    }

}
