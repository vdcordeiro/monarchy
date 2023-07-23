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
import org.springframework.web.bind.annotation.RequestParam;

import gnel.br.monarchy.Model.RichRelationships.Reign;
import gnel.br.monarchy.Service.ReignService;

@Controller
@RequestMapping(value = "/reign", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReignController {

    @Autowired
    private ReignService reignService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<Reign>> allReign() {
        return ResponseEntity.status(200).body(reignService.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/by-noble-country")
    public ResponseEntity<List<Reign>> allReignByNobleOrCountryId(
        @RequestParam(required=false) Long nobleId,
        @RequestParam(required=false) Long countryId
    ) {
        return ResponseEntity.status(200).body(reignService.findAllByNobleOrCountryId(nobleId, countryId));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public ResponseEntity<Reign> theReign(
        @PathVariable Long id
    ) {
        Optional<Reign> reign = reignService.findById(id);
        return (reign.isPresent())
            ? ResponseEntity.status(200).body(reign.get())
            : ResponseEntity.status(404).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public ResponseEntity<Reign> addReign(
        @RequestBody Reign reign
    ) throws ParseException {

        Reign savedReign = reignService.save(reign);

        return (savedReign != null)
        ? ResponseEntity.status(200).body(savedReign)
        : ResponseEntity.status(404).body(null);

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public ResponseEntity<Reign> updateReign(
        @RequestBody Reign reign,
        @PathVariable Long id
    ) throws ParseException {

        reign.setId(id);
        Reign savedReign = reignService.updateReign(reign);

        return (savedReign != null)
        ? ResponseEntity.status(200).body(savedReign)
        : ResponseEntity.status(404).body(null);

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public ResponseEntity<Reign> deleteReign(
        @PathVariable Long id
    ) throws ParseException {

        Reign deletedReign = reignService.deleteReign(id);

        return (deletedReign != null)
        ? ResponseEntity.status(200).body(deletedReign)
        : ResponseEntity.status(404).body(null);

    }

}