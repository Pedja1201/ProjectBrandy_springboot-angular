package org.radak.project.rakija.app.security;


import org.radak.project.rakija.app.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

///Filter koji sluzi samo za proveru naseg tokena(jwt)
public class AuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {
    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    private TokenUtils tokenUtils;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) req;
        // Dobavljanje tokena iz zaglavlja Authorization.
        String authToken = httpRequest.getHeader("Authorization");

        // Dobavljanje korisnickog imena iz tokena.
        String username = tokenUtils.getUsername(authToken);

        if ((username != null) && (SecurityContextHolder.getContext().getAuthentication() == null)) {
            // Dobavljanje userDetails objekta po korisnickom imenu.
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            // Validacija tokena.
            if (tokenUtils.validateToken(authToken, userDetails)) {
                // U slucaju da je token validan vrsi se dodavanje autentifikacije u
                // security context.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        super.doFilter(req, res, chain);
    }
}
