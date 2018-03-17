package com.sample.samaj.portal.repository;

import org.springframework.data.repository.CrudRepository;

import com.sample.samaj.portal.model.Document;


public interface DocumentRepository extends CrudRepository<Document,Long>{
	
}
