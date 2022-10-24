package org.radak.brandy.app.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.radak.brandy.app.model.AdministratorLog;
import org.radak.brandy.app.service.AdministratorLogsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class AdministratorLogger {
//potrebno je jos ubaciti anotacije na metode koje treba da se loguju
    //potrebno je i pronaci administratora koji poziva metodu

    @Autowired
    private AdministratorLogsService administratorLogService;

    @After("@annotation(LoggedAdministrator)")
    public void logujAkcijeAdministratora(JoinPoint jp){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        administratorLogService.save(new AdministratorLog(null, username, jp.getSignature().toLongString(), "Administrators action", LocalDateTime.now()));
    }

}

