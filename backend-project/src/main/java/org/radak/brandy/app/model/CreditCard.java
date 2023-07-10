package org.radak.brandy.app.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "credit_card")
public class CreditCard extends Payment{
    @Column(nullable = false)
    private String number;
    @Column(nullable = false)
    private String type;
    @Temporal(TemporalType.DATE)
    private Date expireDate;

    public CreditCard() {super();
    }

    public CreditCard(Long id, float amount, OrderShop order, String number, String type, Date expireDate) {
        super(id, amount, order);
        this.number = number;
        this.type = type;
        this.expireDate = expireDate;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }
}
