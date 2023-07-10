package org.radak.brandy.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "cash")
public class Cash extends Payment{
    @Column(nullable = false)
    private float cashTendered;

    public Cash() {super();
    }

    public Cash(Long id, float amount, OrderShop order, float cashTendered) {
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
