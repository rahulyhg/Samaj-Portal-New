package com.sample.samaj.portal.repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
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
		SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		if (criteria.getOperator().equalsIgnoreCase("greater than")) {
			try {
				return builder.greaterThanOrEqualTo(root.<Date>get(criteria.getKey()), myFormat.parse(criteria.getValue().toString()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (criteria.getOperator().equalsIgnoreCase("less than")) {
			try {
				return builder.lessThanOrEqualTo(root.<Date>get(criteria.getKey()), myFormat.parse(criteria.getValue().toString()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (criteria.getOperator().equalsIgnoreCase("=") || criteria.getOperator().equalsIgnoreCase("equal")) {
			return builder.equal(root.get(criteria.getKey()), criteria.getValue());
		} else if (criteria.getOperator().equalsIgnoreCase("!=") || criteria.getOperator().equalsIgnoreCase("not equal")) {
			return builder.notEqual(root.get(criteria.getKey()), criteria.getValue());
		} else if (criteria.getOperator().equalsIgnoreCase("not like")) {
			return builder.notLike(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
		} else if (criteria.getOperator().equalsIgnoreCase("like")) {
			return builder.like(root.<String>get(criteria.getKey()), "%" + criteria.getValue() + "%");
		}
		return null;
	}
}