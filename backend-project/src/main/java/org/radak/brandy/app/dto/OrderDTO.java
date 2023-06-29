package org.radak.brandy.app.dto;

import java.util.Date;

public class OrderDTO {
    private Long id;
    private String quantity;
    private Date dateOfPurchase;
    private CustomerDTO customer;
    private BrandyDTO brandy;

    public OrderDTO() {super();
    }

    public OrderDTO(Long id, String quantity, Date dateOfPurchase,CustomerDTO customer, BrandyDTO brandy) {
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
