package com.sample.samaj.portal.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sample.samaj.portal.service.DocumentService;
import com.sample.samaj.portal.service.ResponseMetadata;

@Controller
@RequestMapping(value = "/doc")
public class DocumentController {

    
    @Autowired
    DocumentService documentService;

    @RequestMapping(value = "/upload/{id}", method = RequestMethod.POST)
    public @ResponseBody ResponseMetadata handleFileUpload(@RequestParam(value="file") MultipartFile file,@PathVariable Long id) throws IOException {
        return documentService.save(file,id);
    }

   

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List getDocument() {
        return documentService.findAll();
    }

}