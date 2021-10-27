package com.phone.controller;

import com.phone.model.Phone;
import com.phone.service.phone.IPhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/phones")
public class PhoneController {

    @Autowired
    private IPhoneService phoneService;

    @GetMapping
    public ResponseEntity<Iterable<Phone>> findAll() {
        return new ResponseEntity<>(phoneService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Phone> findPhoneByName(@PathVariable Long id) {
        Optional<Phone> phone = phoneService.findById(id);
        if (phone.isPresent()) {
            return new ResponseEntity<>(phone.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Phone> save(@RequestBody Phone phone) {
        return new ResponseEntity<>(phoneService.save(phone), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Phone> edit(@PathVariable Long id, @RequestBody Phone phone) {
        Optional<Phone> optionalPhone = phoneService.findById(id);
        if (optionalPhone.isPresent()) {
            phone.setId(id);
            return new ResponseEntity<>(phoneService.save(phone), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Phone> delete(@PathVariable Long id) {
        Optional<Phone> phone = phoneService.findById(id);
        if (phone.isPresent()) {
            phoneService.delete(id);
            return new ResponseEntity<>(phone.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
