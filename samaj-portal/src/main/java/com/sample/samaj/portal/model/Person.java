package com.sample.samaj.portal.model;
 
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
@Table(name="PERSON")
public class Person {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "EMAIL")
    private String email;
    
    @Size(min=5, max=50)
    @Column(name = "USERNAME",unique= true)
    private String userName;
    
    @Column(name = "PASSWORD")
    private String password;
    
    
    @Size(min=3, max=50)
    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;
    

    @Size(min=3, max=50)
    @Column(name = "MIDDLE_NAME")
    private String middleName;
    
    @Size(min=3, max=50)
    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;
    
    @Size(min=3, max=50)
    @Column(name = "SANGH")
    private String sangh;
    
    @Size(min=3, max=50)
    @Column(name = "EXPERTISE_CONTRIBUTION")
    private String expertiseContribution;
    
    
    @Size(min=3, max=50)
    @Column(name = "MOBILE_NO")
    private String mobileNo;
    
    @Size(min=3, max=50)
    @Column(name = "GENDER", nullable = false)
    private String gender;
    
    @Size(min=3, max=50)
    @Column(name = "MARITAL_STATUS")
    private String maritalStatus;
    
    @Size(min=3, max=50)
    @Column(name = "FAMILY_TYPE")
    private String familyType;
    
    @DateTimeFormat(pattern="yyyy-MM-dd") 
    @Column(name = "BIRTH_DATE")
    private Date birthDate;
 
	@Column(name = "BIRTH_TIME")
    private String birthTime;
 
	@Column(name = "BIRTH_PLACE")
    private String birthPlace;
	
	@Column(name = "BODY_TYPE")
    private String bodyType;
	
	@Column(name = "COMPLEXION")
    private String complexion;
	
	@Column(name = "HEIGHT")
    private String height;
	
	@Column(name = "BLOOD_GROUP")
    private String bloodGroup;
	
	@Column(name = "HIGHEST_QUALIFICATION")
    private String highestQualification;
	
	@Column(name = "PROFESSION")
    private String profession;
	
	@Column(name = "FATHER_FIRST_NAME")
    private String fatherFirstName;
	
	@Column(name = "FATHER_LAST_NAME")
    private String fatherLastName;
	
	@Column(name = "FATHER_MIDDLE_NAME")
    private String fatherMiddleName;
	
	@Column(name = "MOTHER_FIRST_NAME")
    private String motherFirstName;
	
	@Column(name = "MOTHER_MIDDLE_NAME")
    private String motherMiddleName;
	
	@Column(name = "MOTHER_LAST_NAME")
    private String motherLastName;
	
	@Column(name = "MOTHER_OCCUPATION")
    private String motherOccupation;
	
	@Column(name = "FATHER_OCCUPATION")
    private String fatherOccupation;
	
	@Column(name = "SPOUSE_FIRST_NAME")
    private String spouseFirstName;
	
	@Column(name = "SPOUSE_MIDDLE_NAME")
    private String spouseMiddleName;
	
	@Column(name = "SPOUSE_LAST_NAME")
    private String spouseLastName;
	
	@Column(name = "service")
    private String service;
	
	@Column(name = "business")
    private String business;
	
	@Column(name = "designation")
    private String designation;
	
	@Column(name = "GOTRA")
    private String gotra;
	
	@Column(name = "VADHU_WAR_MELAVA")
    private String vadhuVarMelava;
	
	@Column(name = "SALARY")
    private String salary;
	
    
	@Column(name = "EXPERTISE")
    private String expertise;
	
	@OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="PERMANENT_ADDRESS")
    private Address permanentAddress;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="CURRENT_ADDRESS")
    private Address currentAddress;
    
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="SERVICE_ADDRESS")
    private Address serviceAddress;
    
    @JsonIgnore
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="IMAGE")
    private Document image;
    
    
    @Column(name = "ABOUT_FAMILY")
    private String aboutFamily;
    
    
    @Column(name = "ABOUT_BRO_SIS")
    private String aboutBrotherSister;
    
    @Column(name = "ABOUT_PARENTS")
    private String aboutParents;
    
    public String getVadhuVarMelava() {
		return vadhuVarMelava;
	}

	public void setVadhuVarMelava(String vadhuVarMelava) {
		this.vadhuVarMelava = vadhuVarMelava;
	}

	public String getSangh() {
		return sangh;
	}

	public void setSangh(String sangh) {
		this.sangh = sangh;
	}

	

	public String getExpertiseContribution() {
		return expertiseContribution;
	}

	public void setExpertiseContribution(String expertiseContribution) {
		this.expertiseContribution = expertiseContribution;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}
	
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}
	
	

	public String getMotherOccupation() {
		return motherOccupation;
	}

	public void setMotherOccupation(String motherOccupation) {
		this.motherOccupation = motherOccupation;
	}

	public String getFatherOccupation() {
		return fatherOccupation;
	}

	public void setFatherOccupation(String fatherOccupation) {
		this.fatherOccupation = fatherOccupation;
	}

	public String getSpouseFirstName() {
		return spouseFirstName;
	}

	public void setSpouseFirstName(String spouseFirstName) {
		this.spouseFirstName = spouseFirstName;
	}

	public String getSpouseMiddleName() {
		return spouseMiddleName;
	}

	public void setSpouseMiddleName(String spouseMiddleName) {
		this.spouseMiddleName = spouseMiddleName;
	}

	public String getSpouseLastName() {
		return spouseLastName;
	}

	public void setSpouseLastName(String spouseLastName) {
		this.spouseLastName = spouseLastName;
	}

	public String getExpertise() {
		return expertise;
	}

	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getBusiness() {
		return business;
	}

	public void setBusiness(String business) {
		this.business = business;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getGotra() {
		return gotra;
	}

	public void setGotra(String gotra) {
		this.gotra = gotra;
	}

	public Address getServiceAddress() {
		return serviceAddress;
	}

	public void setServiceAddress(Address serviceAddress) {
		this.serviceAddress = serviceAddress;
	}

	public Document getImage() {
		return image;
	}

	public void setImage(Document image) {
		this.image = image;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getFamilyType() {
		return familyType;
	}

	public void setFamilyType(String familyType) {
		this.familyType = familyType;
	}


	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getBirthTime() {
		return birthTime;
	}

	public void setBirthTime(String birthTime) {
		this.birthTime = birthTime;
	}

	public String getBirthPlace() {
		return birthPlace;
	}

	public void setBirthPlace(String birthPlace) {
		this.birthPlace = birthPlace;
	}

	public String getBodyType() {
		return bodyType;
	}

	public void setBodyType(String bodyType) {
		this.bodyType = bodyType;
	}

	public String getComplexion() {
		return complexion;
	}

	public void setComplexion(String complexion) {
		this.complexion = complexion;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getHighestQualification() {
		return highestQualification;
	}

	public void setHighestQualification(String highestQualification) {
		this.highestQualification = highestQualification;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	

	public String getFatherFirstName() {
		return fatherFirstName;
	}

	public void setFatherFirstName(String fatherFirstName) {
		this.fatherFirstName = fatherFirstName;
	}

	public String getFatherLastName() {
		return fatherLastName;
	}

	public void setFatherLastName(String fatherLastName) {
		this.fatherLastName = fatherLastName;
	}

	public String getFatherMiddleName() {
		return fatherMiddleName;
	}

	public void setFatherMiddleName(String fatherMiddleName) {
		this.fatherMiddleName = fatherMiddleName;
	}

	public String getMotherFirstName() {
		return motherFirstName;
	}

	public void setMotherFirstName(String motherFirstName) {
		this.motherFirstName = motherFirstName;
	}

	public String getMotherMiddleName() {
		return motherMiddleName;
	}

	public void setMotherMiddleName(String motherMiddleName) {
		this.motherMiddleName = motherMiddleName;
	}

	public String getMotherLastName() {
		return motherLastName;
	}

	public void setMotherLastName(String motherLastName) {
		this.motherLastName = motherLastName;
	}

	public String getSalary() {
		return salary;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}	

	public Address getPermanentAddress() {
		return permanentAddress;
	}

	public void setPermanentAddress(Address permanentAddress) {
		this.permanentAddress = permanentAddress;
	}

	public Address getCurrentAddress() {
		return currentAddress;
	}

	public void setCurrentAddress(Address currentAddress) {
		this.currentAddress = currentAddress;
	}
	
	public String getAboutFamily() {
		return aboutFamily;
	}

	public void setAboutFamily(String aboutFamily) {
		this.aboutFamily = aboutFamily;
	}

	public String getAboutBrotherSister() {
		return aboutBrotherSister;
	}

	public void setAboutBrotherSister(String aboutBrotherSister) {
		this.aboutBrotherSister = aboutBrotherSister;
	}

	public String getAboutParents() {
		return aboutParents;
	}

	public void setAboutParents(String aboutParents) {
		this.aboutParents = aboutParents;
	}

	@Override
    public int hashCode() {
        final int prime = 31;
        Long result = 1L;
    
        result = prime * result +id;
        return Long.hashCode(id);
    }
 
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof Person))
            return false;
        Person other = (Person) obj;
        if (id != other.id)
            return false;
        return true;
    }
 
    @Override
    public String toString() {
        return "Person [id=" + id + "]";
    }
     
}