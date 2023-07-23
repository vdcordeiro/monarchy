package gnel.br.monarchy.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gnel.br.monarchy.Model.Nodes.Country;
import gnel.br.monarchy.Repository.Nodes.CountryRepository;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepo;
    
    public List<Country> findAll() {
        return countryRepo.findAll();
    }

    public Optional<Country> findById(Long id) {
        return countryRepo.findById(id);
    }

    public Country saveCountry(Country country) {
        return countryRepo.save(country);
    }

    public Country updateCountry(Country country) {
        if (countryRepo.existsById(country.getId())) {
            return countryRepo.save(country);
        }
        else {
            return country;
        }
    }

    public Country deleteCountry(Long id) {
        Optional <Country> deletedCountry = countryRepo.findById(id);
        if (deletedCountry.isPresent()) {
            countryRepo.deleteById(id);
            return deletedCountry.get();
        }
        else {
            return null;
        }
    }


}