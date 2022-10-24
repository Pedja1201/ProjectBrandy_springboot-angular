package org.radak.brandy.app.controller;

import org.radak.project.rakija.app.dto.RakijaDTO;
import org.radak.project.rakija.app.model.Rakija;
import org.radak.project.rakija.app.service.RakijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/rakije")
public class RakijaController {
    @Autowired
    private RakijaService rakijaService;

    @RequestMapping(path = "", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<Page<RakijaDTO>> getAllRakija(@RequestParam(name = "min", required = false) Double min,
                                                        @RequestParam(name = "max", required = false) Double max,
                                                        Pageable pageable) {
        if (min == null) {
            min = -Double.MAX_VALUE;
        }

        if (max == null) {
            max = Double.MAX_VALUE;
        }
        Page<Rakija> rakija = rakijaService.findAll(pageable);
        Page<RakijaDTO> rakije = rakija.map(new Function<Rakija, RakijaDTO>() {
            public RakijaDTO apply(Rakija rakija) {
                RakijaDTO rakijaDTO = new RakijaDTO(rakija.getId(), rakija.getNaziv(), rakija.getSorta(),
                        rakija.getCena(), rakija.getGodina(),rakija.getJacina()
                );
                // Conversion logic

                return rakijaDTO;
            }
        });
        return new ResponseEntity<Page<RakijaDTO>>(rakije, HttpStatus.OK);
    }

    @RequestMapping(path = "/{rakijaId}", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<RakijaDTO> getRakija(@PathVariable("rakijaId") Long rakijaId) {
        Optional<Rakija> rakija = rakijaService.findOne(rakijaId);
        if (rakija.isPresent()) {
            RakijaDTO rakijaDTO = new RakijaDTO(rakija.get().getId(),rakija.get().getNaziv(),rakija.get().getSorta(),
                    rakija.get().getCena(),rakija.get().getGodina(), rakija.get().getJacina());
            return new ResponseEntity<RakijaDTO>(rakijaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<RakijaDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<RakijaDTO> create(@RequestBody Rakija rakija) {
        try {
            rakijaService.save(rakija);
            RakijaDTO rakijaDTO = new RakijaDTO(rakija.getId(), rakija.getNaziv(), rakija.getSorta(),
                    rakija.getCena(), rakija.getGodina(), rakija.getJacina());

            return new ResponseEntity<RakijaDTO>(rakijaDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<RakijaDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{rakijaId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<RakijaDTO> updateRakija(@PathVariable("rakijaId") Long rakijaId,
                                                  @RequestBody Rakija izmenjenaRakija) {
        Rakija rakija = rakijaService.findOne(rakijaId).orElse(null);
        if (rakija != null) {
            izmenjenaRakija.setId(rakijaId);
            izmenjenaRakija = rakijaService.save(izmenjenaRakija);
            RakijaDTO rakijaDTO = new RakijaDTO(izmenjenaRakija.getId(), izmenjenaRakija.getNaziv(),izmenjenaRakija.getSorta(),
                    izmenjenaRakija.getCena(), izmenjenaRakija.getGodina(), izmenjenaRakija.getJacina());
            return new ResponseEntity<RakijaDTO>(rakijaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<RakijaDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{rakijaId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<RakijaDTO> deleteRakija(@PathVariable("rakijaId") Long rakijaId) {
        if (rakijaService.findOne(rakijaId).isPresent()) {
            rakijaService.delete(rakijaId);
            return new ResponseEntity<RakijaDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<RakijaDTO>(HttpStatus.NOT_FOUND);
    }
}
