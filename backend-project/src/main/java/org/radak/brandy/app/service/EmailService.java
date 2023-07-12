package org.radak.brandy.app.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String recipientEmail, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("OnlineStore9716@gmail.com");
        message.setTo(recipientEmail);
        message.setSubject(subject);
        message.setText(content);
        javaMailSender.send(message);
        System.out.println("Successfully send the mail!");
    }

    public void sendEmailOrder(String recipientEmail1, String subject1, Object content1) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipientEmail1);
        helper.setSubject(subject1);
        helper.setText(content1.toString(), true); // Convert object to string representation
        javaMailSender.send(message);
        System.out.println("Successfully send the mail order!");
    }

}


