package org.radak.project.rakija.app.service;

import org.radak.project.rakija.app.model.Kupac;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.w3c.dom.Document;
import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;


@Service
public class PdfService {
    private static final String PDF_RESOURCES = "/pdf-resources/";

    private SpringTemplateEngine springTemplateEngine;
    private KupacService kupacService;

    @Autowired
    public PdfService(SpringTemplateEngine springTemplateEngine, KupacService kupacService) {
        this.springTemplateEngine = springTemplateEngine;
        this.kupacService = kupacService;
    }
    public File generateKupciPdf() throws Exception{
        Context context = getContextKupacListPdf();
        String html = loadAndFillTemplate(context);
        String xhtml = convertToXhtml(html);
        return renderKupacListPdf(xhtml);
    }
    private String convertToXhtml(String html) throws UnsupportedEncodingException {
        Tidy tidy = new Tidy();
        tidy.setXHTML(true);
        tidy.setIndentContent(true);
        tidy.setPrintBodyOnly(true);
        tidy.setInputEncoding("UTF-8");
        tidy.setOutputEncoding("UTF-8");
        tidy.setSmartIndent(true);
        tidy.setShowWarnings(false);
        tidy.setQuiet(true);
        tidy.setTidyMark(false);

        Document htmlDOM = tidy.parseDOM(new ByteArrayInputStream(html.getBytes()), null);

        OutputStream out = new ByteArrayOutputStream();
        tidy.pprint(htmlDOM, out);
        return out.toString();
    }
    private File renderKupacListPdf(String html) throws Exception {
        File file = File.createTempFile("kupci", ".pdf");
        OutputStream outputStream = new FileOutputStream(file);
        ITextRenderer renderer = new ITextRenderer(20f * 4f / 3f, 20);
        renderer.setDocumentFromString(html, new ClassPathResource(PDF_RESOURCES).getURL().toExternalForm());
        renderer.layout();
        renderer.createPDF(outputStream);
        outputStream.close();
        file.deleteOnExit();
        return file;
    }
    private Context getContextKupacListPdf() {
        Iterable<Kupac> kupacList = this.kupacService.findAll();
        Context context = new Context();
        context.setVariable("kupci", kupacList);
        return context;
    }
    private String loadAndFillTemplate(Context context) {
        return springTemplateEngine.process("kupciPDF", context);
    }
}
