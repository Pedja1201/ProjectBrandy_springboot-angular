package org.radak.brandy.app.model;

import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.Date;

@Entity
public class OrderShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double quantity;

    @Temporal(TemporalType.DATE)
    private Date dateOfPurchase;

    @Column(nullable = true)
    private boolean confirm;//Type used for logical deletion of Brandy in orders

    @ManyToOne(optional = false)
    private Customer customer;

    @ManyToOne(optional = false)
    private Brandy brandy;

    public OrderShop() {super();
    }

    public OrderShop(Long id, double quantity, Date dateOfPurchase, boolean confirm, Customer customer, Brandy brandy) {
        this.id = id;
        this.quantity = quantity;
        this.dateOfPurchase = dateOfPurchase;
        this.confirm = confirm;
        this.customer = customer;
        this.brandy = brandy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public boolean isConfirm() {
        return confirm;
    }

    public void setConfirm(boolean confirm) {
        this.confirm = confirm;
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
