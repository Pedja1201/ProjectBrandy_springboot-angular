package org.radak.brandy.app.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Customer extends User {
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "customer")
    private Set<OrderShop> orders = new HashSet<OrderShop>();



    public Customer() {super();
    }

    public Customer(Long id, String username, String password, boolean active, String firstName,
                    String lastName, String email) {
        super(id, username, password, active);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
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

    public Set<OrderShop> getOrders() {
        return orders;
    }

    public void setOrders(Set<OrderShop> orders) {
        this.orders = orders;
    }
}
