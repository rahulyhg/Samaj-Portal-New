package com.sample.samaj.portal.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.sample.samaj.portal.authapi.security.MyPasswordEncoder;
import com.sample.samaj.portal.model.Person;
import com.sample.samaj.portal.pojo.ChangePassword;
import com.sample.samaj.portal.pojo.DocumentBase64;
import com.sample.samaj.portal.pojo.Filter;
import com.sample.samaj.portal.repository.PersonRepository;
import com.sample.samaj.portal.repository.SearchCriteria;
import com.sample.samaj.portal.repository.UserSpecification;

@RestController
@RequestMapping(path = "/samaj")
public class MainController {
	@Autowired
	private PersonRepository personRepository;
	
	@Autowired
	private MyPasswordEncoder bCryptPasswordEncoder;

	@PostMapping(path = "/add")
	public @ResponseBody String addNewPerson(@RequestBody Person person) {
		personRepository.save(person);
		return "Saved";
	}

	@RequestMapping(value = "/document/{id}", method = RequestMethod.GET)
	public DocumentBase64 getDocument(@PathVariable Long id) {
		Person person=personRepository.findById(id).get();
		DocumentBase64 documentBase64=new DocumentBase64();
		if(person.getImage()!=null){
			String data=Base64.getEncoder().encodeToString(person.getImage().getFile());
			documentBase64.setData(data);
			documentBase64.setId(person.getImage().getId());
		}
		
		return documentBase64;
	}

	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Person> getAllUsers() {
		return personRepository.findAll();
	}
	
	@PostMapping(path = "/browse")
	public @ResponseBody Iterable<Person> getPersonByCriteria1(@RequestBody Filter filter) {
		Specification<Person> userSpecification=null;
		for(int i=0;i<filter.getFilter().size();i++){
			if(i==0){
				userSpecification=new UserSpecification(filter.getFilter().get(i));
			}else{
				userSpecification=userSpecification.and(new UserSpecification(filter.getFilter().get(i)));
			}
			
		}
		return personRepository.findAll(userSpecification	);
	}
	
	@PostMapping(path = "/changePassword")
	public Person changePassword(@RequestBody ChangePassword changePassword) {
		Person person=personRepository.findByUserName(changePassword.getId());
		person.setPassword(bCryptPasswordEncoder.encode(changePassword.getNewPassword()));
		return personRepository.save(person);
	}
	
	
	@PostMapping(path = "/filter")
	public PagedResources<Resource<Person>> getPersonByCriteria(@RequestBody Filter filter,Pageable pageRequest,PagedResourcesAssembler<Person> assembler) {
		Specification<Person> userSpecification=null;
		List<SearchCriteria> filterList=new ArrayList<SearchCriteria>();
		for(int i=0;i<filter.getFilter().size();i++){
			SearchCriteria searchCriteria=filter.getFilter().get(i);
			if(searchCriteria.getOperator()!=null && searchCriteria.getOperator().length()>0 && searchCriteria.getValue() !=null && searchCriteria.getValue().toString().length()>0){
				filterList.add(searchCriteria);
			}
		}
		for(int i=0;i<filterList.size();i++){
			if(i==0){
				userSpecification=new UserSpecification(filterList.get(i));
			}else{
				userSpecification=userSpecification.and(new UserSpecification(filterList.get(i)));
			}
			
		}
		Page<Person> page=personRepository.findAll(userSpecification,pageRequest);
		return assembler.toResource(page);
	}
	
	@PostMapping(path = "/register")
	public Person register(@RequestBody Person person) {
		person.setPassword(bCryptPasswordEncoder.encode(person.getPassword()));
		return personRepository.save(person);
	}
	
	@RequestMapping(path = "/profile/{id}", method = RequestMethod.GET, produces = "application/json")
	public Person getProfile(@PathVariable String id) {
		Person person=null;
		try{
			person=personRepository.findById(Long.parseLong(id)).get();
		}catch(NumberFormatException nfe){
			person=personRepository.findByUserName(id);
		}
		if(person == null){
			throw new ResponseStatusException(HttpStatus.NO_CONTENT);
		}else{
			return person;
		}
	}
	
	
	
	@RequestMapping(path = "/profile", method = RequestMethod.PUT, produces = "application/json",consumes = "application/json")
	public Person getProfile(@RequestBody Person person) {
		   Person existing = personRepository.findById(person.getId()).get();
		   String pass[]={"password","image"};
		   BeanUtils.copyProperties(person, existing,pass);
		   return personRepository.save(existing);
	}
}
