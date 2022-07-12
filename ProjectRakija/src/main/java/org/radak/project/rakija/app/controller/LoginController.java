package org.radak.project.rakija.app.controller;

import org.radak.project.rakija.app.dto.AdminDTO;
import org.radak.project.rakija.app.dto.KorisnikDTO;
import org.radak.project.rakija.app.dto.KupacDTO;
import org.radak.project.rakija.app.dto.TokenDTO;
import org.radak.project.rakija.app.model.Admin;
import org.radak.project.rakija.app.model.Kupac;
import org.radak.project.rakija.app.model.UserPermission;
import org.radak.project.rakija.app.service.AdminService;
import org.radak.project.rakija.app.service.KupacService;
import org.radak.project.rakija.app.service.PermissionService;
import org.radak.project.rakija.app.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashSet;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class LoginController { //TODO:RAspodeliti uloge prilikom register: ROLE_ADMIN, ROLE_KUPAC

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AdminService adminService;
    @Autowired
    private KupacService kupacService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity<TokenDTO> login(@RequestBody KorisnikDTO korisnik) {
        try {
            // Kreiranje tokena za login, token sadrzi korisnicko ime i lozinku.
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    korisnik.getKorisnickoIme(), korisnik.getLozinka());
            // Autentifikacija korisnika na osnovu korisnickog imena i lozinke.
            Authentication authentication = authenticationManager.authenticate(token);
            // Dodavanje uspesne autentifikacije u security context.
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Ucitavanje podatka o korisniku i kreiranje jwt-a.
            UserDetails userDetails = userDetailsService.loadUserByUsername(korisnik.getKorisnickoIme());
            String jwt = tokenUtils.generateToken(userDetails);
            TokenDTO jwtDTO = new TokenDTO(jwt);

            return new ResponseEntity<TokenDTO>(jwtDTO, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<TokenDTO>(HttpStatus.UNAUTHORIZED);
        }
    }

    @RequestMapping(path = "/registerKupac", method = RequestMethod.POST)
    public ResponseEntity<KupacDTO> registerKupac(@RequestBody KupacDTO korisnik) {
        // Novi korisnik se registruje kreiranjem instance korisnika
        // cija je lozinka enkodovana.
        Kupac noviKorisnik = new Kupac(null, korisnik.getKorisnickoIme(),
                passwordEncoder.encode(korisnik.getLozinka()), korisnik.getIme(), korisnik.getPrezime(), korisnik.getEmail());
        noviKorisnik = kupacService.save(noviKorisnik);
        // Dodavanje prava pristupa.
        noviKorisnik.setUserPermissions(new HashSet<UserPermission>());
        noviKorisnik.getUserPermissions()                                   //Trazimo id=2 zato sto je Kupac Korisnik (ROLE_KUPAC)
                .add(new UserPermission(null, noviKorisnik, permissionService.findOne(2l).get()));
        kupacService.save(noviKorisnik);

        return new ResponseEntity<KupacDTO>(
                new KupacDTO(noviKorisnik.getId(), noviKorisnik.getKorisnickoIme(), null,
                        noviKorisnik.getIme(), noviKorisnik.getPrezime(), noviKorisnik.getEmail()), HttpStatus.OK);
    }


    @RequestMapping(path = "/registerAdmin", method = RequestMethod.POST)
    public ResponseEntity<AdminDTO> registerAdmin(@RequestBody AdminDTO korisnik) {
        // Novi korisnik se registruje kreiranjem instance korisnika
        // cija je lozinka enkodovana.
        Admin noviKorisnik = new Admin(null, korisnik.getKorisnickoIme(),
                passwordEncoder.encode(korisnik.getLozinka()), korisnik.getIme(), korisnik.getPrezime(),
                korisnik.getEmail(), korisnik.getJmbg());
        noviKorisnik = adminService.save(noviKorisnik);
        // Dodavanje prava pristupa.
        noviKorisnik.setUserPermissions(new HashSet<UserPermission>());
        noviKorisnik.getUserPermissions()                                //Trazimo id=1 zato sto je Admin Administrator (ROLE_ADMIN)
                .add(new UserPermission(null, noviKorisnik, permissionService.findOne(1l).get()));
        adminService.save(noviKorisnik);

        return new ResponseEntity<AdminDTO>(
                new AdminDTO(noviKorisnik.getId(), noviKorisnik.getKorisnickoIme(), null,
                        noviKorisnik.getIme(), noviKorisnik.getPrezime(),
                        noviKorisnik.getEmail(), noviKorisnik.getJmbg() ), HttpStatus.OK);
    }
}
