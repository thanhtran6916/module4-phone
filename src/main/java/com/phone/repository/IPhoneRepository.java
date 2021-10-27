package com.phone.repository;

import com.phone.model.Phone;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPhoneRepository extends CrudRepository<Phone, Long> {
}
