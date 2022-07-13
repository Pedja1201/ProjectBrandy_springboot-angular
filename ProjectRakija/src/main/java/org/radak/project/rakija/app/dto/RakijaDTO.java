package org.radak.project.rakija.app.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

public class RakijaDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String naziv;
    private String sorta;
    private double cena;
    private int godina;

    private ArrayList<PorudzbinaDTO> porudzbine = new ArrayList<PorudzbinaDTO>();

    public RakijaDTO() {super();
    }

    public RakijaDTO(Long id, String naziv, String sorta, double cena, int godina, ArrayList<PorudzbinaDTO> porudzbine) {
        this.id = id;
        this.naziv = naziv;
        this.sorta = sorta;
        this.cena = cena;
        this.godina = godina;
        this.porudzbine = porudzbine;
    }

    public RakijaDTO(Long id, String naziv, String sorta, double cena, int godina) {
        this.id = id;
        this.naziv = naziv;
        this.sorta = sorta;
        this.cena = cena;
        this.godina = godina;
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

    public ArrayList<PorudzbinaDTO> getPorudzbine() {
        return porudzbine;
    }

    public void setPorudzbine(ArrayList<PorudzbinaDTO> porudzbine) {
        this.porudzbine = porudzbine;
    }
}
