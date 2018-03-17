package com.sample.samaj.portal.pojo;

import java.util.List;

import com.sample.samaj.portal.repository.SearchCriteria;

public class Filter {
	private List<SearchCriteria> filter;

	public List<SearchCriteria> getFilter() {
		return filter;
	}

	public void setFilter(List<SearchCriteria> filter) {
		this.filter = filter;
	}
	
}
