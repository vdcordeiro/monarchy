package gnel.br.monarchy.Controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import gnel.br.monarchy.Model.Nodes.Noble;
import gnel.br.monarchy.Service.NobleService;

@Controller
@RequestMapping(value = "/noble", produces = MediaType.APPLICATION_JSON_VALUE)
public class NobleController {

    @Autowired
    private NobleService nobleService;

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    public ResponseEntity<List<Noble>> allNoble() {
        return ResponseEntity.status(200).body(nobleService.findAll());
    }

    @GetMapping("/by-gender/{gender}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Noble>> allByGender(
        @PathVariable String gender
    ) {
        return ResponseEntity.status(200).body(nobleService.findAll(gender));
    }

    @GetMapping("/children/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Noble>> childrenById(
        @PathVariable Long id
    ) {
        return ResponseEntity.status(200).body(nobleService.findChildrenById(id));
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/{id}")
    public ResponseEntity<Noble> theNoble(
        @PathVariable Long id
    ) {
        Optional<Noble> noble = nobleService.findById(id);
        return (noble.isPresent())
            ? ResponseEntity.status(200).body(noble.get())
            : ResponseEntity.status(404).body(null);
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public ResponseEntity<Noble> addNoble(
        @RequestBody Noble noble
    ) throws ParseException {

        Noble savedNoble = nobleService.save(noble);

        return (savedNoble != null)
        ? ResponseEntity.status(200).body(savedNoble)
        : ResponseEntity.status(404).body(null);

    }

    @Transactional
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/{id}")
    public ResponseEntity<Noble> updateNoble(
        @RequestBody Noble noble,
        @PathVariable Long id
    ) throws ParseException {

        noble.setId(id);
        Noble savedNoble = nobleService.updateNoble(noble);

        return (savedNoble != null)
        ? ResponseEntity.status(200).body(savedNoble)
        : ResponseEntity.status(404).body(null);

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/{id}")
    public ResponseEntity<Noble> deleteNoble(
        @PathVariable Long id
    ) throws ParseException {

        Noble deletedNoble = nobleService.deleteNoble(id);

        return (deletedNoble != null)
        ? ResponseEntity.status(200).body(deletedNoble)
        : ResponseEntity.status(404).body(null);

    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/kinship/{nobleId}/{relativeId}")
    public ResponseEntity<List<String>> kinship(
        @PathVariable Long nobleId,
        @PathVariable Long relativeId
    ) {
        return ResponseEntity.status(200).body(nobleService.getKinship(nobleId, relativeId));
    }
}