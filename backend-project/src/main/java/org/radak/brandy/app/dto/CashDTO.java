package org.radak.brandy.app.dto;



public class CashDTO extends PaymentDTO {
    private float cashTendered;

    public CashDTO() {super();
    }

    public CashDTO(Long id, float amount, OrderDTO order, float cashTendered) {
        super(id, amount, order);
        this.cashTendered = cashTendered;
    }

    public float getCashTendered() {
        return cashTendered;
    }

    public void setCashTendered(float cashTendered) {
        this.cashTendered = cashTendered;
    }
}
