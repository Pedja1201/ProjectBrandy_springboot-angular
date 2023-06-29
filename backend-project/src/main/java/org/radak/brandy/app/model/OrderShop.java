package org.radak.brandy.app.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class OrderShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quantity;

    @Temporal(TemporalType.DATE)
    private Date dateOfPurchase;

    @ManyToOne(optional = false)
    private Customer customer;

    @ManyToOne(optional = false)
    private Brandy brandy;

    public OrderShop() {super();
    }

    public OrderShop(Long id, String quantity, Date dateOfPurchase, Customer customer, Brandy brandy) {
        this.id = id;
        this.quantity = quantity;
        this.dateOfPurchase = dateOfPurchase;
        this.customer = customer;
        this.brandy = brandy;
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

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Brandy getBrandy() {
        return brandy;
    }

    public void setBrandy(Brandy brandy) {
        this.brandy = brandy;
    }

}
