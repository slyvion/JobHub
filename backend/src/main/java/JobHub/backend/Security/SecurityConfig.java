package JobHub.backend.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .userDetailsService(userDetailsService)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    //    @Bean
    //    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //        http.csrf(csrf -> csrf.disable())
    //                .authorizeHttpRequests(auth -> auth
    //                        .requestMatchers(
    //                                "/auth/login",
    //                                "/auth/register/user",
    //                                "/auth/register/company",
    //                                "/companies",
    //                                "/jobposts",
    //                                "/company/**",
    //                                "/jobposts/**",
    //                                "/user/**",
    //                                "/user/*/savedJobPosts",
    //                                "/user/*/saveJob/**",
    //                                "/jobposts/create"
    //                        ).permitAll()
    //                        .requestMatchers(HttpMethod.PUT, "/company/*/add-review").hasRole("USER")
    //                        .requestMatchers(HttpMethod.PUT, "/jobposts/*/apply").permitAll()
    //                        .requestMatchers(HttpMethod.GET, "/jobposts/*/applicants").permitAll()
    //                        .requestMatchers("/admin").hasRole("ADMIN")
    //                        .anyRequest().authenticated()
    //                )
    //                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //                .userDetailsService(userDetailsService)
    //                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    //
    //        return http.build();
    //    }


}
