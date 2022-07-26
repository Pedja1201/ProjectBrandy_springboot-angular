package org.radak.project.rakija.app.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Rakija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String naziv;
    @Column(nullable = false)
    private String sorta;
    @Column(nullable = false)
    private double cena;
    @Column(nullable = false)
    private int godina;
    @Column(nullable = false)
    private String jacina;

    @OneToMany(mappedBy = "rakija")
    private Set<Porudzbina> porudzbine = new HashSet<Porudzbina>();

    public Rakija() {super();
    }

    public Rakija(Long id, String naziv, String sorta, double cena, int godina, String jacina) {
        this.id = id;
        this.naziv = naziv;
        this.sorta = sorta;
        this.cena = cena;
        this.godina = godina;
        this.jacina = jacina;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getSorta() {
        return sorta;
    }

    public void setSorta(String sorta) {
        this.sorta = sorta;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public int getGodina() {
        return godina;
    }

    public void setGodina(int godina) {
        this.godina = godina;
    }

    public String getJacina() {
        return jacina;
    }

    public void setJacina(String jacina) {
        this.jacina = jacina;
    }

    public Set<Porudzbina> getPorudzbine() {
        return porudzbine;
    }

    public void setPorudzbine(Set<Porudzbina> porudzbine) {
        this.porudzbine = porudzbine;
    }
}
