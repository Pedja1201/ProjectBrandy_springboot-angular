package org.radak.brandy.app.dto;

public class MailDTO {
    private String recipientEmail;
    private String subject;
    private String content;

    public MailDTO() {super();
    }

    public MailDTO(String recipientEmail, String subject, String content) {
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.content = content;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
