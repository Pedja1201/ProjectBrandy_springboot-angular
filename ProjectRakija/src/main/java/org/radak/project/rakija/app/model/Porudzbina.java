package org.radak.project.rakija.app.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Porudzbina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String kolicina;

    @Temporal(TemporalType.DATE)
    private Date datumKupovine;

    @ManyToOne(optional = false)
    private Rakija rakija;

    @ManyToOne(optional = false)
    private Kupac kupac;

    public Porudzbina() {super();
    }

    public Porudzbina(Long id, String kolicina, Date datumKupovine, Rakija rakija, Kupac kupac) {
        this.id = id;
        this.kolicina = kolicina;
        this.datumKupovine = datumKupovine;
        this.rakija = rakija;
        this.kupac = kupac;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKolicina() {
        return kolicina;
    }

    public void setKolicina(String kolicina) {
        this.kolicina = kolicina;
    }

    public Date getDatumKupovine() {
        return datumKupovine;
    }

    public void setDatumKupovine(Date datumKupovine) {
        this.datumKupovine = datumKupovine;
    }

    public Rakija getRakija() {
        return rakija;
    }

    public void setRakija(Rakija rakija) {
        this.rakija = rakija;
    }

    public Kupac getKupac() {
        return kupac;
    }

    public void setKupac(Kupac kupac) {
        this.kupac = kupac;
    }
}
