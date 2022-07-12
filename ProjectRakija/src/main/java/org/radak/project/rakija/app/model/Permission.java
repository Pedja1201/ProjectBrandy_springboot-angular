package org.radak.project.rakija.app.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "permission")      //Korisnik sadrzi vise userPermission
    private Set<UserPermission> userPermissions = new HashSet<UserPermission>();

    public Permission(Long id, String title) {
        this.id = id;
        this.title = title;
    }
    public Permission(){
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<UserPermission> getUserPermissions() {
        return userPermissions;
    }

    public void setUserPermissions(Set<UserPermission> userPermissions) {
        this.userPermissions = userPermissions;
    }
}
