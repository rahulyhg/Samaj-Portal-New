package com.sample.samaj.portal.auth;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidLoginException extends RuntimeException {
	private static final long serialVersionUID = 100L;

	public InvalidLoginException(String message) {
		super(message);
	}

	public InvalidLoginException(String message, Throwable cause) {
		super(message, cause);
	}

}