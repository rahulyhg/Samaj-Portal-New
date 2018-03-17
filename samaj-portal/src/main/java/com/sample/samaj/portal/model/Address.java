package com.sample.samaj.portal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ADDRESS")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "line", length = 100)
    private String line;
    
    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;

    @JsonIgnore
    @OneToOne(mappedBy = "currentAddress") // inverse reference for bi-directional mapping of "address1"
    private Person person1;
    
    @JsonIgnore
    @OneToOne(mappedBy = "permanentAddress")  // inverse reference for bi-directional mapping of "address2"
    private Person person2;
    
    @JsonIgnore
    @OneToOne(mappedBy = "serviceAddress")  // inverse reference for bi-directional mapping of "address2"
    private Person person3;
    
    public long getId() {
        return id;
    }

    
    public String getLine() {
		return line;
	}
    

	public Person getPerson3() {
		return person3;
	}


	public void setPerson3(Person person3) {
		this.person3 = person3;
	}


	public void setLine(String line) {
		this.line = line;
	}


	public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    
	public Person getPerson1() {
		return person1;
	}

	public void setPerson1(Person person1) {
		this.person1 = person1;
	}

	public Person getPerson2() {
		return person2;
	}

	public void setPerson2(Person person2) {
		this.person2 = person2;
	}

	public void setId(long id) {
		this.id = id;
	}
    
    
}