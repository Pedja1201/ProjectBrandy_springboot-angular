package org.radak.brandy.app.dto;

import java.util.ArrayList;

public class BrandyDTO {
    private Long id;
    private String name;
    private String type;
    private double price;
    private int year;
    private String strength;
    private boolean quantity;

    private ArrayList<OrderDTO> orders = new ArrayList<OrderDTO>();

    public BrandyDTO() {super();
    }

    public BrandyDTO(Long id, String name, String type, double price, int year, String strength, boolean quantity, ArrayList<OrderDTO> orders) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.year = year;
        this.strength = strength;
        this.quantity = quantity;
        this.orders = orders;
    }

    public BrandyDTO(Long id, String name, String type, double price, int year, String strength, boolean quantity) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.year = year;
        this.strength = strength;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getStrength() {
        return strength;
    }

    public void setStrength(String strength) {
        this.strength = strength;
    }

    public boolean isQuantity() {
        return quantity;
    }

    public void setQuantity(boolean quantity) {
        this.quantity = quantity;
    }

    public ArrayList<OrderDTO> getOrders() {
        return orders;
    }

    public void setOrders(ArrayList<OrderDTO> orders) {
        this.orders = orders;
    }
}
