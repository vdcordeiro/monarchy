package gnel.br.monarchy.Controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import gnel.br.monarchy.Model.Nodes.Country;
import gnel.br.monarchy.Service.CountryService;

@Controller
@RequestMapping(value = "/country", produces = MediaType.APPLICATION_JSON_VALUE)
public class CountryController {

    @Autowired
    private CountryService countryService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<Country>> allCountry() {
        return ResponseEntity.status(200).body(countryService.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public ResponseEntity<Country> theCountry(
        @PathVariable Long id
    ) {
        Optional<Country> country = countryService.findById(id);
        return (country.isPresent())
            ? ResponseEntity.status(200).body(country.get())
            : ResponseEntity.status(404).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public ResponseEntity<Country> addCountry(
        @RequestBody Country country
    ) throws ParseException {

        Country savedCountry = countryService.saveCountry(country);

        return (savedCountry != null)
        ? ResponseEntity.status(200).body(savedCountry)
        : ResponseEntity.status(404).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public ResponseEntity<Country> updateCountry(
        @PathVariable Long id,
        @RequestBody Country country
    ) throws ParseException {
        country.setId(id);
        Country savedCountry = countryService.updateCountry(country);

        return (savedCountry != null)
        ? ResponseEntity.status(200).body(savedCountry)
        : ResponseEntity.status(404).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public ResponseEntity<Country> deleteCountry(
        @PathVariable Long id
    ) throws ParseException {
        Country deletedCountry = countryService.deleteCountry(id);

        return (deletedCountry != null)
        ? ResponseEntity.status(200).body(deletedCountry)
        : ResponseEntity.status(404).body(null);
    }
    

}