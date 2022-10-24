package org.radak.brandy.app.service;

import org.radak.brandy.app.model.Customer;
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
    private CustomerService customerService;

    @Autowired
    public PdfService(SpringTemplateEngine springTemplateEngine, CustomerService customerService) {
        this.springTemplateEngine = springTemplateEngine;
        this.customerService = customerService;
    }
    public File generateKupciPdf() throws Exception{
        Context context = getContextCustomerListPdf();
        String html = loadAndFillTemplate(context);
        String xhtml = convertToXhtml(html);
        return renderCustomerListPdf(xhtml);
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
    private File renderCustomerListPdf(String html) throws Exception {
        File file = File.createTempFile("customers", ".pdf");
        OutputStream outputStream = new FileOutputStream(file);
        ITextRenderer renderer = new ITextRenderer(20f * 4f / 3f, 20);
        renderer.setDocumentFromString(html, new ClassPathResource(PDF_RESOURCES).getURL().toExternalForm());
        renderer.layout();
        renderer.createPDF(outputStream);
        outputStream.close();
        file.deleteOnExit();
        return file;
    }
    private Context getContextCustomerListPdf() {
        Iterable<Customer> customerList = this.customerService.findAll();
        Context context = new Context();
        context.setVariable("customers", customerList);
        return context;
    }
    private String loadAndFillTemplate(Context context) {
        return springTemplateEngine.process("customersPDF", context);
    }
}
