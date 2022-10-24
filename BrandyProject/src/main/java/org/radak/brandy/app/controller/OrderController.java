package org.radak.brandy.app.controller;

import org.radak.project.rakija.app.aspect.Logged;
import org.radak.project.rakija.app.dto.KupacDTO;
import org.radak.project.rakija.app.dto.PorudzbinaDTO;
import org.radak.project.rakija.app.dto.RakijaDTO;
import org.radak.project.rakija.app.model.Porudzbina;
import org.radak.project.rakija.app.service.PorudzbinaService;
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
@RequestMapping(path = "/api/porudzbine")
public class PorudzbinaController {
    @Autowired
    private PorudzbinaService porudzbinaService;

    @Logged
    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<Page<PorudzbinaDTO>> getAll(Pageable pageable) {
        Page<Porudzbina> porudzbina = porudzbinaService.findAll(pageable);
        Page<PorudzbinaDTO> porudzbine = porudzbina.map(new Function<Porudzbina, PorudzbinaDTO>() {
            public PorudzbinaDTO apply(Porudzbina porudzbina) {
                PorudzbinaDTO porudzbinaDTO = new PorudzbinaDTO(porudzbina.getId(), porudzbina.getKolicina(), porudzbina.getDatumKupovine(),
                        new RakijaDTO(porudzbina.getRakija().getId(), porudzbina.getRakija().getNaziv(),
                                porudzbina.getRakija().getSorta(),porudzbina.getRakija().getCena(),porudzbina.getRakija().getGodina(),porudzbina.getRakija().getJacina()),
                        new KupacDTO(porudzbina.getKupac().getId(), porudzbina.getKupac().getKorisnickoIme(),null,
                                porudzbina.getKupac().getIme(),porudzbina.getKupac().getPrezime(),porudzbina.getKupac().getEmail())
                );
                // Conversion logic

                return porudzbinaDTO;
            }
        });
        return new ResponseEntity<Page<PorudzbinaDTO>>(porudzbine, HttpStatus.OK);
    }

    @RequestMapping(path = "/{porudzbinaId}", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<PorudzbinaDTO> get(@PathVariable("porudzbinaId") Long porudzbinaId) {
        Optional<Porudzbina> porudzbina = porudzbinaService.findOne(porudzbinaId);
        if (porudzbina.isPresent()) {
            PorudzbinaDTO porudzbinaDTO = new PorudzbinaDTO(porudzbina.get().getId(),porudzbina.get().getKolicina(),
                    porudzbina.get().getDatumKupovine(),
                    new RakijaDTO(porudzbina.get().getRakija().getId(),porudzbina.get().getRakija().getNaziv(),
                            porudzbina.get().getRakija().getSorta(), porudzbina.get().getRakija().getCena(), porudzbina.get().getRakija().getGodina(),porudzbina.get().getRakija().getJacina()),
                    new KupacDTO(porudzbina.get().getKupac().getId(), porudzbina.get().getKupac().getKorisnickoIme(),
                            porudzbina.get().getKupac().getLozinka(),porudzbina.get().getKupac().getIme(),
                            porudzbina.get().getKupac().getPrezime(), porudzbina.get().getKupac().getEmail()) );
            return new ResponseEntity<PorudzbinaDTO>(porudzbinaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<PorudzbinaDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<PorudzbinaDTO> create(@RequestBody Porudzbina porudzbina) {
        try {
            porudzbinaService.save(porudzbina);
            RakijaDTO rakijaDTO =  new RakijaDTO(porudzbina.getRakija().getId(), porudzbina.getRakija().getNaziv(), porudzbina.getRakija().getSorta(),
                    porudzbina.getRakija().getCena(), porudzbina.getRakija().getGodina(),  porudzbina.getRakija().getJacina());
            KupacDTO kupacDTO =  new KupacDTO(porudzbina.getKupac().getId(), porudzbina.getKupac().getKorisnickoIme(),null,
                    porudzbina.getKupac().getIme(),porudzbina.getKupac().getPrezime(),porudzbina.getKupac().getEmail());

            PorudzbinaDTO porudzbinaDTO = new PorudzbinaDTO(porudzbina.getId(), porudzbina.getKolicina(),porudzbina.getDatumKupovine(),rakijaDTO, kupacDTO);

            return new ResponseEntity<PorudzbinaDTO>(porudzbinaDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<PorudzbinaDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{porudzbinaId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<PorudzbinaDTO> update(@PathVariable("porudzbinaId") Long porudzbinaId,
                                                   @RequestBody Porudzbina izmenjenaPorudzbina) {
        Porudzbina porudzbina = porudzbinaService.findOne(porudzbinaId).orElse(null);
        if (porudzbina != null) {
            izmenjenaPorudzbina.setId(porudzbinaId);
            porudzbinaService.save(izmenjenaPorudzbina);
            RakijaDTO rakijaDTO =  new RakijaDTO(izmenjenaPorudzbina.getRakija().getId(), izmenjenaPorudzbina.getRakija().getNaziv(), izmenjenaPorudzbina.getRakija().getSorta(),
                    izmenjenaPorudzbina.getRakija().getCena(), izmenjenaPorudzbina.getRakija().getGodina(), izmenjenaPorudzbina.getRakija().getJacina());
            KupacDTO kupacDTO =  new KupacDTO(izmenjenaPorudzbina.getKupac().getId(), izmenjenaPorudzbina.getKupac().getKorisnickoIme(),null,
                    izmenjenaPorudzbina.getKupac().getIme(),izmenjenaPorudzbina.getKupac().getPrezime(),izmenjenaPorudzbina.getKupac().getEmail());

            PorudzbinaDTO porudzbinaDTO = new PorudzbinaDTO(izmenjenaPorudzbina.getId(), izmenjenaPorudzbina.getKolicina(),izmenjenaPorudzbina.getDatumKupovine(),rakijaDTO, kupacDTO);

            return new ResponseEntity<PorudzbinaDTO>(porudzbinaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<PorudzbinaDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{porudzbinaId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN", "ROLE_KUPAC"})
    public ResponseEntity<PorudzbinaDTO> delete(@PathVariable("porudzbinaId") Long porudzbinaId) {
        if (porudzbinaService.findOne(porudzbinaId).isPresent()) {
            porudzbinaService.delete(porudzbinaId);
            return new ResponseEntity<PorudzbinaDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<PorudzbinaDTO>(HttpStatus.NOT_FOUND);
    }
}
