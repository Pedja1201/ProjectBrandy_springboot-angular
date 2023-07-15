package org.radak.brandy.app.dto;

import java.util.Date;

public class OrderDTO {
    private Long id;
    private double quantity;
    private Date dateOfPurchase;
    private boolean confirm;
    private CustomerDTO customer;
    private BrandyDTO brandy;

    public OrderDTO() {super();
    }

    public OrderDTO(Long id, double quantity, Date dateOfPurchase, boolean confirm, CustomerDTO customer, BrandyDTO brandy) {
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

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public BrandyDTO getBrandy() {
        return brandy;
    }

    public void setBrandy(BrandyDTO brandy) {
        this.brandy = brandy;
    }

}
