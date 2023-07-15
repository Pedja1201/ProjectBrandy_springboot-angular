package org.radak.brandy.app.dto;

import java.util.ArrayList;

public class CustomerDTO extends UserDTO {
    private String firstName;
    private String lastName;
    private String email;

    private ArrayList<OrderDTO> orders = new ArrayList<OrderDTO>();

    public CustomerDTO() {super();

    }

    public CustomerDTO(Long id, String username, String password, boolean active, String firstName, String lastName, String email) {
        super(id, username, password, active);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public CustomerDTO(Long id, String username, String password, boolean active, String firstName, String lastName, String email, ArrayList<OrderDTO> orders) {
        super(id, username, password, active);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.orders = orders;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ArrayList<OrderDTO> getOrders() {
        return orders;
    }

    public void setOrders(ArrayList<OrderDTO> orders) {
        this.orders = orders;
    }
}
