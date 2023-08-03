package org.radak.brandy.app.dto;

public class StockDTO {
    private Long id;
    private double quantity;
    private boolean availability;
    private BrandyDTO product;
    private String description;

    public StockDTO() {super();
    }

    public StockDTO(Long id, double quantity, boolean availability, BrandyDTO product, String description) {
        this.id = id;
        this.quantity = quantity;
        this.availability = availability;
        this.product = product;
        this.description = description;
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

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public BrandyDTO getProduct() {
        return product;
    }

    public void setProduct(BrandyDTO product) {
        this.product = product;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
