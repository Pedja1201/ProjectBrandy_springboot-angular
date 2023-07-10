package org.radak.brandy.app.model;

import javax.persistence.*;

@MappedSuperclass
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private float amount;

    @ManyToOne(optional = false)
    private OrderShop order;

    public Payment() {super();
    }

    public Payment(Long id, float amount, OrderShop order) {
        this.id = id;
        this.amount = amount;
        this.order = order;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public OrderShop getOrder() {
        return order;
    }

    public void setOrder(OrderShop order) {
        this.order = order;
    }
}
