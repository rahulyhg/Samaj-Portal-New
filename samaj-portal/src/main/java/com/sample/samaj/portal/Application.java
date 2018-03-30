package com.sample.samaj.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import com.sample.samaj.portal.authapi.security.MyPasswordEncoder;

@SpringBootApplication
public class Application  extends SpringBootServletInitializer {
	
	@Bean
    public MyPasswordEncoder bCryptPasswordEncoder() {
        return new MyPasswordEncoder();
    }
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}