package org.radak.project.rakija.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Admin extends Korisnik{
    @Column(nullable = false)
    private String ime;
    @Column(nullable = false)
    private String prezime;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = true, unique = true)
    private String jmbg;

    public Admin() {super();
    }

    public Admin(Long id, String korisnickoIme, String lozinka, String ime, String prezime, String email, String jmbg) {
        super(id, korisnickoIme, lozinka);
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.jmbg = jmbg;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJmbg() {
        return jmbg;
    }

    public void setJmbg(String jmbg) {
        this.jmbg = jmbg;
    }
}
