package org.radak.brandy.app.service;

import org.radak.brandy.app.model.User;
import org.radak.brandy.app.model.UserPermission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Dobavljanje korisnika po korisnickom imenu.
        Optional<User> user = userService.findByUsername(username);

        if(user.isPresent()) {
            // Formiranje liste dodeljenih prava pristupa.
            ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
            for(UserPermission userPermission : user.get().getUserPermissions()) {
                grantedAuthorities.add(new SimpleGrantedAuthority(userPermission.getPermission().getTitle()));
            }
                ///Ispis Usera u konzoli.
            System.out.println(grantedAuthorities.size());
            for (GrantedAuthority ga : grantedAuthorities) {
                System.out.println(ga.getAuthority());
            }

            // Kreiranje korisnika na osnovu korisnickog imena, lozinke i dodeljenih prava pristupa.
            return new org.springframework.security.core.userdetails.User(user.get().getUsername(), user.get().getPassword(), grantedAuthorities);
        }
        return null;
    }
}
