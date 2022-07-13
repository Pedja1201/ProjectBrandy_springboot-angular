package org.radak.project.rakija.app.dto;

import java.util.Date;

public class PorudzbinaDTO {
    private Long id;
    private String kolicina;
    private Date datumKupovine;
    private RakijaDTO rakija;
    private KupacDTO kupac;

    public PorudzbinaDTO() {super();
    }

    public PorudzbinaDTO(Long id, String kolicina, Date datumKupovine, RakijaDTO rakija, KupacDTO kupac) {
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

    public RakijaDTO getRakija() {
        return rakija;
    }

    public void setRakija(RakijaDTO rakija) {
        this.rakija = rakija;
    }

    public KupacDTO getKupac() {
        return kupac;
    }

    public void setKupac(KupacDTO kupac) {
        this.kupac = kupac;
    }
}
