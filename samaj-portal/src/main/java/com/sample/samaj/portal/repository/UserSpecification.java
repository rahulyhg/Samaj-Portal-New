package com.sample.samaj.portal.repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.sample.samaj.portal.model.Person;

public class UserSpecification implements Specification<Person> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private SearchCriteria criteria;

	public UserSpecification(SearchCriteria searchCriteria) {
		this.criteria=searchCriteria;
	}

	@Override
	public Predicate toPredicate(Root<Person> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

		if (criteria.getOperator().equalsIgnoreCase(">")) {
			return builder.greaterThanOrEqualTo(root.<String>get(criteria.getKey()), criteria.getValue().toString());
		} else if (criteria.getOperator().equalsIgnoreCase("<")) {
			return builder.lessThanOrEqualTo(root.<String>get(criteria.getKey()), criteria.getValue().toString());
		} else if (criteria.getOperator().equalsIgnoreCase("=") || criteria.getOperator().equalsIgnoreCase("equal")) {
			return builder.equal(root.get(criteria.getKey()), criteria.getValue());
		} else if (criteria.getOperator().equalsIgnoreCase("!=") || criteria.getOperator().equalsIgnoreCase("equal")) {
			return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
		} else if (criteria.getOperator().equalsIgnoreCase("not like")) {
			return builder.notLike(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
		} else if (criteria.getOperator().equalsIgnoreCase("equal")) {
			return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
		}
		return null;
	}
}