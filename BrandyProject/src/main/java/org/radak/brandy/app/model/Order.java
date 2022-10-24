package org.radak.brandy.app.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quantity;

    @Temporal(TemporalType.DATE)
    private Date dateOfPurchase;

    @ManyToOne(optional = false)
    private Brandy brandy;

    @ManyToOne(optional = false)
    private Customer customer;

    public Order() {super();
    }

    public Order(Long id, String quantity, Date dateOfPurchase, Brandy brandy, Customer customer) {
        this.id = id;
        this.quantity = quantity;
        this.dateOfPurchase = dateOfPurchase;
        this.brandy = brandy;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Brandy getBrandy() {
        return brandy;
    }

    public void setBrandy(Brandy brandy) {
        this.brandy = brandy;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
