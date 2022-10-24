package org.radak.project.rakija.app.aspect;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


//Interfejs ili anotacija koja nam sluzi da prikazemo ispis i hvatanje metode tamo gde postavimo anotaciju '@Logged'
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Logged {
}
