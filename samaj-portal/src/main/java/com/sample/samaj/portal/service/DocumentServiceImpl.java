package com.sample.samaj.portal.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sample.samaj.portal.model.Document;
import com.sample.samaj.portal.model.Person;
import com.sample.samaj.portal.repository.DocumentRepository;
import com.sample.samaj.portal.repository.PersonRepository;

@Service
public class DocumentServiceImpl implements DocumentService {

	@Autowired
	private DocumentRepository documentRepository;

	@Autowired
	private PersonRepository personRepository;

	@Override
	public ResponseMetadata save(MultipartFile file, long id) throws IOException {

		Person person = personRepository.findById(id).get();
		ResponseMetadata metadata = new ResponseMetadata();
		if (person == null) {
			metadata.setMessage("error");
			metadata.setStatus(500);
		} else {
			Document doc = new Document();
			doc.setDocName(file.getOriginalFilename());
			doc.setFile(file.getBytes());
			Document docUploaded = documentRepository.save(doc);
			person.setImage(docUploaded);
			personRepository.save(person);
			metadata.setMessage("success");
			metadata.setStatus(200);
		}
		return metadata;
	}

	@Override
	public byte[] getDocumentFile(Long id) {
		return documentRepository.findById(id).get().getFile();
	}

	@Override
	public List<Document> findAll() {
		return (List<Document>) documentRepository.findAll();
	}

	@Override
	public Document save(MultipartFile file) throws IOException {

		ResponseMetadata metadata = new ResponseMetadata();
		Document doc = new Document();
		doc.setDocName(file.getOriginalFilename());
		doc.setFile(file.getBytes());
		Document docUploaded = documentRepository.save(doc);
		return docUploaded;

	}

}
