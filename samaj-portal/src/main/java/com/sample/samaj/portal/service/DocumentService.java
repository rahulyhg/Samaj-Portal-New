package com.sample.samaj.portal.service;

import org.springframework.web.multipart.MultipartFile;

import com.sample.samaj.portal.model.Document;

import java.io.IOException;
import java.util.List;

public interface DocumentService {

    ResponseMetadata save(MultipartFile multipartFile,long id) throws IOException;

    byte[] getDocumentFile(Long id);

    List<Document> findAll();
}
