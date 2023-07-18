package org.radak.brandy.app.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.radak.brandy.app.dto.OrderDTO;
import org.radak.brandy.app.model.OrderLog;
import org.radak.brandy.app.service.EmailService;
import org.radak.brandy.app.service.OrderLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


import javax.mail.MessagingException;
import java.time.LocalDateTime;

@Aspect
@Component
public class OrderLogger {
    @Autowired
    private OrderLogService orderLogService;
    @Autowired
    private EmailService emailService;

    @After("@annotation(LoggedOrder)")
    public void logActionOrder(JoinPoint jp) throws MessagingException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        orderLogService.save(new OrderLog(null, username, jp.getSignature().toLongString(), "Orders action", LocalDateTime.now()));
    }
}
