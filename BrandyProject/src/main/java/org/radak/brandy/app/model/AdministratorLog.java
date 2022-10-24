package org.radak.project.rakija.app.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "administratorLogs")
public class AdministratorLog {
    private String id;
    private String ime;
    private String signature;
    private String poruka;
    private LocalDateTime dateTime;

    public AdministratorLog() {
        super();
    }

    public AdministratorLog(String id, String ime, String signature, String poruka, LocalDateTime dateTime) {
        this.id = id;
        this.ime = ime;
        this.signature = signature;
        this.poruka = poruka;
        this.dateTime = dateTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getPoruka() {
        return poruka;
    }

    public void setPoruka(String poruka) {
        this.poruka = poruka;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
