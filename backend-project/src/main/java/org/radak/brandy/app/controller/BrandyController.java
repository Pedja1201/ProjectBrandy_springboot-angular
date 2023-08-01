package org.radak.brandy.app.controller;

import org.radak.brandy.app.dto.BrandyDTO;
import org.radak.brandy.app.dto.CustomerDTO;
import org.radak.brandy.app.excepetion.MessageResponse;
import org.radak.brandy.app.model.Brandy;
import org.radak.brandy.app.service.BrandyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/brandies")
public class BrandyController {
    @Autowired
    private BrandyService brandyService;

    @RequestMapping(path = "", method = RequestMethod.GET)
//    @Secured({"ROLE_ADMIN", "ROLE_CUSTOMER"})
    public ResponseEntity<Page<BrandyDTO>> getAll(@RequestParam(name = "min", required = false) Double min,
                                                  @RequestParam(name = "max", required = false) Double max,
                                                  @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                                  @RequestParam(name = "pageSize", required = false, defaultValue = "100") Integer pageSize,
                                                  Pageable pageable
    ) {
        if (min == null) {
            min = -Double.MAX_VALUE;
        }

        if (max == null) {
            max = Double.MAX_VALUE;
        }
        pageable = PageRequest.of(pageNumber, pageSize);
        Page<Brandy> brandy = brandyService.findAll(pageable);
        Page<BrandyDTO> brandies = brandy.map(new Function<Brandy, BrandyDTO>() {
            public BrandyDTO apply(Brandy brandy) {
                BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                        brandy.getPrice(), brandy.getYear(),brandy.getStrength(), brandy.isQuantity(),
                        brandy.getUrl());
                // Conversion logic
                return brandyDTO;
            }
        });
        return new ResponseEntity<Page<BrandyDTO>>(brandies, HttpStatus.OK);
    }

    @GetMapping("/{brandyId}")
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> get(@PathVariable("brandyId") Long brandyId) {
        Optional<Brandy> brandy = brandyService.findOne(brandyId);
        if (brandy.isPresent()) {
            BrandyDTO brandyDTO = new BrandyDTO(brandy.get().getId(),brandy.get().getName(),brandy.get().getType(),
                    brandy.get().getPrice(),brandy.get().getYear(), brandy.get().getStrength(),
                    brandy.get().isQuantity(), brandy.get().getUrl());
            return new ResponseEntity<BrandyDTO>(brandyDTO, HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "", method = RequestMethod.POST)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> create(@RequestBody Brandy brandy) {
        try {
            brandyService.save(brandy);
            BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                    brandy.getPrice(), brandy.getYear(), brandy.getStrength(),
                    brandy.isQuantity(), brandy.getUrl());

            System.out.println("Brandy added");
        return new ResponseEntity<BrandyDTO>(brandyDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("No brandy");
        return new ResponseEntity<BrandyDTO>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(path = "/{brandyId}", method = RequestMethod.PUT)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> update(@PathVariable("brandyId") Long brandyId,
                                                  @RequestBody Brandy updatedBrandy) {
        Brandy brandy = brandyService.findOne(brandyId).orElse(null);
        if (brandy != null) {
            updatedBrandy.setId(brandyId);
            updatedBrandy = brandyService.save(updatedBrandy);
            BrandyDTO rakijaDTO = new BrandyDTO(updatedBrandy.getId(), updatedBrandy.getName(),updatedBrandy.getType(),
                    updatedBrandy.getPrice(), updatedBrandy.getYear(), updatedBrandy.getStrength(),
                    updatedBrandy.isQuantity(), updatedBrandy.getUrl());
            return new ResponseEntity<BrandyDTO>(rakijaDTO, HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(path = "/{brandyId}", method = RequestMethod.DELETE)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> delete(@PathVariable("brandyId") Long brandyId) {
        if (brandyService.findOne(brandyId).isPresent()) {
            brandyService.delete(brandyId);
            return new ResponseEntity<BrandyDTO>(HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{name}/brandy")
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<BrandyDTO> getBrandyByName(@PathVariable("name") String name) {
        Optional<Brandy> brandy = brandyService.findBrandyName(name);
        if (brandy.isPresent()) {
            BrandyDTO brandyDTO = new BrandyDTO(brandy.get().getId(),brandy.get().getName(),brandy.get().getType(),
                    brandy.get().getPrice(),brandy.get().getYear(), brandy.get().getStrength(),
                    brandy.get().isQuantity(), brandy.get().getUrl());
            return new ResponseEntity<BrandyDTO>(brandyDTO, HttpStatus.OK);
        }
        return new ResponseEntity<BrandyDTO>(HttpStatus.NOT_FOUND);
    }

    //search brandy by name
    @GetMapping("/brandySearch")
//    @RequestMapping(path = "/{name}/brandySearch", method = RequestMethod.GET)
    //@Secured({"ROLE_ADMIN"})
    public ResponseEntity<?> search(@RequestParam(name = "name", required = false) String name,
                                    @RequestParam(name = "minPrice", required = false) Integer minPrice,
                                    @RequestParam(name = "maxPrice", required = false) Integer maxPrice,
                                    @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                    @RequestParam(name = "pageSize", required = false, defaultValue = "5") Integer pageSize) {

        if(minPrice == null || maxPrice == null){
            Iterable<Brandy> b = brandyService.findAll();
            List<Brandy> brandyList = new ArrayList<>();
            Iterator<Brandy> iterator = b.iterator();
            while (iterator.hasNext()){
                brandyList.add(iterator.next());
            }
            Double max = 0.0;
            Double min = brandyList.get(0).getPrice();
            for(Brandy r : brandyList){
                if (r.getPrice() > max){
                    max = r.getPrice();
                }
                if (r.getPrice() < min){
                    min = r.getPrice();
                }
            }

            if (pageSize == null){
                Integer totalBrandy = brandyList.size();
                Page<Brandy> brandy = brandyService.search(name, min.intValue(), max.intValue(), pageNumber, totalBrandy);
                Page<BrandyDTO> brandies = brandy.map(new Function<Brandy, BrandyDTO>() {
                    public BrandyDTO apply(Brandy brandy) {
                        BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                                brandy.getPrice(), brandy.getYear(),brandy.getStrength(), brandy.isQuantity(),
                                brandy.getUrl());
                        // Conversion logic
                        return brandyDTO;
                    }
                });
                return new ResponseEntity<Page<BrandyDTO>>(brandies, HttpStatus.OK);
            }else {


                Page<Brandy> brandy = brandyService.search(name, min.intValue(), max.intValue(), pageNumber, pageSize);
                Page<BrandyDTO> brandies = brandy.map(new Function<Brandy, BrandyDTO>() {
                    public BrandyDTO apply(Brandy brandy) {
                        BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                                brandy.getPrice(), brandy.getYear(), brandy.getStrength(), brandy.isQuantity(),
                                brandy.getUrl());
                        // Conversion logic
                        return brandyDTO;
                    }
                });
                return new ResponseEntity<Page<BrandyDTO>>(brandies, HttpStatus.OK);
            }
        }else{
            Page<Brandy> brandy = brandyService.search(name, minPrice, maxPrice, pageNumber, pageSize);
            Page<BrandyDTO> brandies = brandy.map(new Function<Brandy, BrandyDTO>() {
                public BrandyDTO apply(Brandy brandy) {
                    BrandyDTO brandyDTO = new BrandyDTO(brandy.getId(), brandy.getName(), brandy.getType(),
                            brandy.getPrice(), brandy.getYear(),brandy.getStrength(), brandy.isQuantity(),
                            brandy.getUrl());
                    // Conversion logic
                    return brandyDTO;
                }
            });
            return new ResponseEntity<Page<BrandyDTO>>(brandies, HttpStatus.OK);
        }
    }


}
