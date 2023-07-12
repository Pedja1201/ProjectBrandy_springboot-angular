package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.MailDTO;
import org.radak.brandy.app.dto.UserDTO;
import org.radak.brandy.app.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/sendMail")
public class MailController {
    @Autowired
    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    public ResponseEntity<MailDTO> sendEmail(@RequestBody MailDTO request) {
        try {
            emailService.sendEmail(request.getRecipientEmail(), request.getSubject(), request.getContent());
            MailDTO mailDTO = new MailDTO(request.getRecipientEmail(),
                    request.getSubject(), request.getContent());
            return new ResponseEntity<MailDTO>(mailDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<MailDTO>(HttpStatus.BAD_REQUEST);
    }
}
