package com.sample.samaj.portal.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sample.samaj.portal.model.Document;
import com.sample.samaj.portal.pojo.DocumentBase64;
import com.sample.samaj.portal.service.DocumentService;
import com.sample.samaj.portal.service.ResponseMetadata;

@Controller
@RequestMapping(value = "/doc")
public class DocumentController {

	@Autowired
	DocumentService documentService;

	@RequestMapping(value = "/upload/{id}", method = RequestMethod.POST)
	public @ResponseBody ResponseMetadata handleFileUpload(@RequestParam(value = "file") MultipartFile file,
			@PathVariable Long id) throws IOException {
		return documentService.save(file, id);
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public @ResponseBody DocumentBase64 handleFileUploadWithoutId(@RequestParam(value = "file") MultipartFile file)
			throws IOException {
		Document document = documentService.save(file);
		DocumentBase64 documentBase64 = new DocumentBase64();
		String data = Base64.getEncoder().encodeToString(document.getFile());
		documentBase64.setData(data);
		documentBase64.setId(document.getId());
		return documentBase64;
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List getDocument() {
		return documentService.findAll();
	}

}