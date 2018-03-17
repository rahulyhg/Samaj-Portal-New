package com.sample.samaj.portal.pojo;

public class LoginResponse {
	private String userName;
	private String token;

	public LoginResponse() {

	}

	public LoginResponse(final String userName, final String token) {
		this.userName = userName;
		this.token = token;
	}

	public String getUserName() {
		return userName;
	}

	public String getToken() {
		return token;
	}

}
// Copyright (c) 2016-2016. TIBCO Software Inc. All Rights Reserved. Confidential & Proprietary.
