package org.radak.project.rakija.app.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TokenUtils {
    @Value("${token.secret}")
    private String secret;

    @Value("${token.expiration}")
    private Long expiration;

    private Claims getClaims(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
        }
        return claims;
    }

    private boolean isExpired(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date(System.currentTimeMillis()));
        } catch (Exception e) {
        }
        return true;
    }

    public String getUsername(String token) {
        String username = null;
        try {
            return getClaims(token).getSubject();
        } catch (Exception e) {
        }

        return username;
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsername(token);
        return username.equals(userDetails.getUsername()) && !isExpired(token);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("sub", userDetails.getUsername());
        claims.put("created", new Date(System.currentTimeMillis()));
        claims.put("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        System.out.println(claims);

        return Jwts.builder().setClaims(claims).setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }
}