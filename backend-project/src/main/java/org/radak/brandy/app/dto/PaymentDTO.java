package org.radak.brandy.app.dto;


public class PaymentDTO {
    private Long id;
    private float amount;
    private OrderDTO order;

    public PaymentDTO() {super();
    }

    public PaymentDTO(Long id, float amount, OrderDTO order) {
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

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }
}
