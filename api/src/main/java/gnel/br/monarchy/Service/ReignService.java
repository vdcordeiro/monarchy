package gnel.br.monarchy.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gnel.br.monarchy.Model.RichRelationships.Reign;
import gnel.br.monarchy.Repository.RichRelationships.ReignRepository;

@Service
public class ReignService {

    @Autowired
    private ReignRepository reignRepo;
    
    public List<Reign> findAll() {
        return reignRepo.findAll();
    }

    public List<Reign> findAllByNobleOrCountryId(Long nobleId, Long countryId) {
        return reignRepo.findAllByNobleOrCountry(nobleId, countryId);
    }

    public Optional<Reign> findById(Long id) {
        return reignRepo.findById(id);
    }

    public Reign save(Reign reign) {
        return reignRepo.save(reign);
    }

    public Reign updateReign(Reign reign) {
        if (reignRepo.existsById(reign.getId())) {
            return reignRepo.save(reign);
        }
        else {
            return reign;
        }
    }

    public Reign deleteReign(Long id) {
        Optional <Reign> deletedReign = reignRepo.findById(id);
        if (deletedReign.isPresent()) {
            reignRepo.deleteById(id);
            return deletedReign.get();
        }
        else {
            return null;
        }
    }


}