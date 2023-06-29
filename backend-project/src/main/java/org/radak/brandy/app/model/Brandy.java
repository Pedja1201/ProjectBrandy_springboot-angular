package org.radak.brandy.app.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Brandy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private String strength;

    @OneToMany(mappedBy = "brandy")
    private Set<OrderShop> orders = new HashSet<OrderShop>();

    public Brandy() {super();
    }

    public Brandy(Long id, String name, String type, double price, int year, String strength) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.year = year;
        this.strength = strength;
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

    public Set<OrderShop> getOrders() {
        return orders;
    }

    public void setOrders(Set<OrderShop> orders) {
        this.orders = orders;
    }
}
