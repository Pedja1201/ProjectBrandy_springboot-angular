package org.radak.brandy.app.dto;

public class AdminDTO extends UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String upin;  //Unique Personal Identification Number

    public AdminDTO() {super();
    }

    public AdminDTO(Long id, String username, String password, boolean active, String firstName, String lastName, String email, String upin) {
        super(id, username, password, active);
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.upin = upin;
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

    public String getUpin() {
        return upin;
    }

    public void setUpin(String upin) {
        this.upin = upin;
    }
}
