package org.radak.project.rakija.app.dto;

import java.util.ArrayList;

public class KupacDTO extends KorisnikDTO{
    private String ime;
    private String prezime;
    private String email;

    private ArrayList<PorudzbinaDTO> porudzbine = new ArrayList<PorudzbinaDTO>();

    public KupacDTO() {super();

    }

    public KupacDTO(Long id, String korisnickoIme, String lozinka, String ime, String prezime, String email,  ArrayList<PorudzbinaDTO> porudzbine) {
        super(id, korisnickoIme, lozinka);
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.porudzbine = porudzbine;
    }

    //Register controller
    public KupacDTO(Long id, String korisnickoIme, String lozinka, String ime, String prezime, String email) {
        super(id, korisnickoIme, lozinka);
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
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

    public ArrayList<PorudzbinaDTO> getPorudzbine() {
        return porudzbine;
    }

    public void setPorudzbine(ArrayList<PorudzbinaDTO> porudzbine) {
        this.porudzbine = porudzbine;
    }
}
