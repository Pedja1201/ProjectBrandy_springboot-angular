package org.radak.project.rakija.app.model;

import javax.persistence.*;

@Entity
public class UserPermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Korisnik user;
    @ManyToOne
    private Permission permission;

    public UserPermission(Long id, Korisnik user, Permission permission) {
        this.id = id;
        this.user = user;
        this.permission = permission;
    }

    public UserPermission() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Korisnik getUser() {
        return user;
    }

    public void setUser(Korisnik user) {
        this.user = user;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }
}
