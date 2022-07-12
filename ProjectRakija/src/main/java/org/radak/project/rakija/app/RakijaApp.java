package org.radak.project.rakija.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class RakijaApp {
    public static void main(String[] args){
        SpringApplication.run(RakijaApp.class, args);
    }
}
