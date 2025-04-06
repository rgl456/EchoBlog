package com.project.BlogApplication.jwt;

import com.project.BlogApplication.entity.User;
import com.project.BlogApplication.security.BlogUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        System.out.println("JwtAuthenticationFilter is called");

        String authHeader = request.getHeader("Authorization");



        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        String jwtToken = authHeader.substring(7);
        String userEmail = jwtService.extractUserEmail(jwtToken);

        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            System.out.println(jwtService.isTokenValid(jwtToken,userDetails));

            if(jwtService.isTokenValid(jwtToken,userDetails)){

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authToken);
                if(userDetails instanceof BlogUserDetails){
                    User user = ((BlogUserDetails)userDetails).getUser();
                    request.setAttribute("userId",user.getId());
                }
                System.out.println("request = "+request.getRequestURL());
                System.out.println("Method: " + request.getMethod());
                System.out.println("Path: " + request.getServletPath());

            }
        }

        filterChain.doFilter(request,response);

    }
}

