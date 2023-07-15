package org.radak.brandy.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Admin extends User {
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = true, unique = true)
    private String upin;  //Unique Personal Identification Number

    public Admin() {super();
    }

    public Admin(Long id, String username, String password, boolean active, String firstName, String lastName, String email, String upin) {
        super(id, username, password, active);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.upin = upin;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUpin() {
        return upin;
    }

    public void setUpin(String upin) {
        this.upin = upin;
    }
}
