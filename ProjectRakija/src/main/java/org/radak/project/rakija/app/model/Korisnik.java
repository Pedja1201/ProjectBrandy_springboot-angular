package org.radak.project.rakija.app.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Korisnik")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Korisnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String korisnickoIme;
    @Column(nullable = false)
    private String lozinka;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserPermission> userPermissions = new HashSet<UserPermission>();

    public Korisnik() {
        super();
    }

    public Korisnik(Long id, String korisnickoIme, String lozinka) {
        super();
        this.id = id;
        this.korisnickoIme = korisnickoIme;
        this.lozinka = lozinka;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }


    public Set<UserPermission> getUserPermissions() {
        return userPermissions;
    }

    public void setUserPermissions(Set<UserPermission> userPermissions) {
        this.userPermissions = userPermissions;
    }

}

