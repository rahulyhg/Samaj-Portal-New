package com.sample.samaj.portal.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sample.samaj.portal.model.Person;
import com.sample.samaj.portal.repository.PersonRepository;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private PersonRepository personRepository;

    public UserDetailsServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Person person = personRepository.findByUserName(userName);
        if (person == null) {
            throw new UsernameNotFoundException(userName);
        }
        return new User(person.getId().toString(), person.getPassword(), emptyList());
    }
}