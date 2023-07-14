package org.radak.brandy.app.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "administratorLogs")
public class AdministratorLog {
    private String id;
    private String name;
    private String signature;
    private String message;
    private LocalDateTime dateTime;

    public AdministratorLog() {
        super();
    }

    public AdministratorLog(String id, String name, String signature, String message, LocalDateTime dateTime) {
        this.id = id;
        this.name = name;
        this.signature = signature;
        this.message = message;
        this.dateTime = dateTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
