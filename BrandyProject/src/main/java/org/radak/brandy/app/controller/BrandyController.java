package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.model.Brandy;
import org.radak.brandy.app.service.BrandyService;
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
@RequestMapping(path = "/api/brandies")
public class BrandyController {
    @Autowired
    private BrandyService brandyService;

    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<Page<BrandyDTO>> getAll(@RequestParam(name = "min", required = false) Double min,
                                                  @RequestParam(name = "max", required = false) Double max,
                                                  Pageable pageable) {
        if (min == null) {
            min = -Double.MAX_VALUE;
        }

        if (max == null) {
            max = Double.MAX_VALUE;
        }
        Page<Brandy> brandy = brandyService.findAll(pageable);
        Page<BrandyDTO> brandies = brandy.map(new Function<Brandy, BrandyDTO>() {
            public BrandyDTO apply(Brandy brandy) {
                BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                        brandy.getPrice(), brandy.getYear(),brandy.getStrength()
                );
                // Conversion logic
                return brandyDTO;
            }
        });
        return new ResponseEntity<Page<BrandyDTO>>(brandies, HttpStatus.OK);
    }

    @RequestMapping(path = "/{brandyId}", method = RequestMethod.GET)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> get(@PathVariable("brandyId") Long brandyId) {
        Optional<Brandy> brandy = brandyService.findOne(brandyId);
        if (brandy.isPresent()) {
            BrandyDTO brandyDTO = new BrandyDTO(brandy.get().getId(),brandy.get().getName(),brandy.get().getType(),
                    brandy.get().getPrice(),brandy.get().getYear(), brandy.get().getStrength());
            return new ResponseEntity<BrandyDTO>(brandyDTO, HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> create(@RequestBody Brandy brandy) {
        try {
            brandyService.save(brandy);
            BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                    brandy.getPrice(), brandy.getYear(), brandy.getStrength());

            return new ResponseEntity<BrandyDTO>(brandyDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{brandyId}", method = RequestMethod.PUT)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> update(@PathVariable("brandyId") Long brandyId,
                                                  @RequestBody Brandy updatedBrandy) {
        Brandy brandy = brandyService.findOne(brandyId).orElse(null);
        if (brandy != null) {
            updatedBrandy.setId(brandyId);
            updatedBrandy = brandyService.save(updatedBrandy);
            BrandyDTO rakijaDTO = new BrandyDTO(updatedBrandy.getId(), updatedBrandy.getName(),updatedBrandy.getType(),
                    updatedBrandy.getPrice(), updatedBrandy.getYear(), updatedBrandy.getStrength());
            return new ResponseEntity<BrandyDTO>(rakijaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{brandyId}", method = RequestMethod.DELETE)
    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> delete(@PathVariable("brandyId") Long brandyId) {
        if (brandyService.findOne(brandyId).isPresent()) {
            brandyService.delete(brandyId);
            return new ResponseEntity<BrandyDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }
}
