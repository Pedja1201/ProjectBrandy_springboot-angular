package org.radak.brandy.app.dto;

public class KorisnikDTO {
    private Long id;
    private String korisnickoIme;
    private String lozinka;

    public KorisnikDTO() {
        super();
    }

    public KorisnikDTO(Long id, String korisnickoIme, String lozinka) {
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



}
