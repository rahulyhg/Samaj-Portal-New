package com.sample.samaj.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.sample.samaj.portal.authapi.security.MyPasswordEncoder;

@SpringBootApplication
public class Application {
	
	@Bean
    public MyPasswordEncoder bCryptPasswordEncoder() {
        return new MyPasswordEncoder();
    }
	
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}