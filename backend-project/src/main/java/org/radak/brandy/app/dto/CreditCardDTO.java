package org.radak.brandy.app.dto;

import java.util.Date;

public class CreditCardDTO extends PaymentDTO{
    private String number;
    private String type;
    private Date expireDate;

    public CreditCardDTO() {super();
    }

    public CreditCardDTO(Long id, float amount, OrderDTO order, String number, String type, Date expireDate) {
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
