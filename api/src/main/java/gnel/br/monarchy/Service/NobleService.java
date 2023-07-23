package gnel.br.monarchy.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.neo4j.driver.internal.value.PathValue;
import org.neo4j.driver.types.Node;
import org.neo4j.driver.types.Relationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gnel.br.monarchy.Model.Nodes.Noble;
import gnel.br.monarchy.Model.RichRelationships.Reign;
import gnel.br.monarchy.Repository.Nodes.NobleRepository;

@Service
public class NobleService {

    @Autowired
    private NobleRepository nobleRepo;

    @Autowired
    private ReignService reignService;
    
    public List<Noble> findAll() {
        return nobleRepo.findAll();
    }

    public List<Noble> findAll(String gender) {
        List<Noble> allNobles = nobleRepo.findAll();
        List<Noble> genderNobles = new ArrayList<>();
        allNobles.forEach(n -> {
            if (n.getGender().toString().equals(gender.toUpperCase())) {
                genderNobles.add(n);
            }
        });
        return genderNobles;
    }

    public Optional<Noble> findById(Long id) {
        Optional<Noble> found = nobleRepo.findById(id);
        return found;
    }

    public List<Noble> findChildrenById(Long id) {
        return nobleRepo.findChildrenById(id);
    }

    public Noble save(Noble noble) {
        return nobleRepo.save(noble);
    }

    public Noble updateNoble(Noble noble) {

        // if the reigned country is different, set reign id to null to recreate the reign
        noble.getReigned().forEach(r -> {
            Optional<Reign> savedReign = reignService.findById(r.getId());
            if (!savedReign.isPresent() ||
                (savedReign.isPresent() && savedReign.get().getCountry().getId() != r.getId())) {
                r.setId(null);
            }
        });
        
        if (nobleRepo.existsById(noble.getId())) {
            return nobleRepo.save(noble);
        }
        else {
            return noble;
        }
    }

    public Noble deleteNoble(Long id) {
        Optional <Noble> deletedNoble = nobleRepo.findById(id);
        if (deletedNoble.isPresent()) {
            nobleRepo.deleteById(id);
            return deletedNoble.get();
        }
        else {
            return null;
        }
    }

    public List<String> getKinship(Long nobleId, Long relativeId) {

        // get all paths between nodes
        List<PathValue> allKinshipPaths =  nobleRepo.getAllKinshipPaths(nobleId, relativeId);
        List<String> foundKinship = new ArrayList<String>();
        
        if (allKinshipPaths == null || allKinshipPaths.size() == 0) {
            foundKinship.add("No Kinship");
        }

        //Iterator<PathValue> it = allKinshipPaths.iterator();
        
        allKinshipPaths.forEach((path) -> {
            String kinship = recursiveFindKinship(
                path.asPath().nodes().iterator(),
                path.asPath().relationships().iterator(),
                false,
                "self");
            if (kinship != "none") {
                if (!foundKinship.contains(kinship)) {
                    foundKinship.add(kinship);
                }
            }
        });

        if (foundKinship.size() == 0) {
            foundKinship.add("No kinship");
        }

        return foundKinship;
    }

    private String recursiveFindKinship(
        Iterator<Node> iNode,
        Iterator<Relationship> iRel,
        boolean descending,
        String currentKinship) {

        if (!iRel.hasNext()) {
            return currentKinship;
        }

        Node currentNode = iNode.next();
        Relationship currentRel = iRel.next();

        Boolean willAscend = (currentNode.id() == currentRel.startNodeId());

        if (descending && willAscend) {
            return "none";
        }

        //iNode.remove();
        //iRel.remove();

        if (willAscend) {
            switch (currentKinship) {
                case "self": return recursiveFindKinship(iNode, iRel, false, "parent");
                case "parent": return recursiveFindKinship(iNode, iRel, false, "grandparent");
                case "grandparent": return recursiveFindKinship(iNode, iRel, false, "great-grandparent");
                default: return recursiveFindKinship(iNode, iRel, false, "great-".concat(currentKinship));
            }
        }
        else {
            switch (currentKinship) {
                case "self": return recursiveFindKinship(iNode, iRel, true, "child");
                case "child": return recursiveFindKinship(iNode, iRel, true, "grandchild");
                default: {
                    if (currentKinship.endsWith("child")) {
                        return recursiveFindKinship(iNode, iRel, true, "great-".concat(currentKinship)); 
                    }
                    else {
                        switch (currentKinship) {
                            case "parent": return recursiveFindKinship(iNode, iRel, true, "sibling");
                            case "sibling": return recursiveFindKinship(iNode, iRel, true, "nephew");
                            
                            case "grandparent": return recursiveFindKinship(iNode, iRel, true, "uncle");
                            case "uncle": return recursiveFindKinship(iNode, iRel, true, "cousin");
                            case "cousin": return recursiveFindKinship(iNode, iRel, true, "nephewcousin");
                            
                            default: {
    
                                // [great-] great-grandparent
                                if (currentKinship.endsWith("great-grandparent")) {
                                    String greats = currentKinship.split("grandparent")[0];
                                    return recursiveFindKinship(iNode, iRel, true, greats.concat("uncle"));
                                }
    
                                // No ordinal [great-] uncle
                                if ((currentKinship.endsWith("uncle")) && !(currentKinship.substring(0,1).matches("[0-9]"))) {
                                    String[] greatArray = currentKinship.split("uncle")[0].split("-");
                                    if (greatArray.length == 2) {
                                        return recursiveFindKinship(iNode, iRel, true, "2nd uncle");
                                    }
                                    if (greatArray.length == 3) {
                                        return recursiveFindKinship(iNode, iRel, true, "3rd great-uncle");
                                    }
                                    if (greatArray.length >= 4) {
                                        String relationship = (greatArray.length + 1) + "th ";
                                        for (int i = 1; i < greatArray.length ; i++) {
                                            relationship += "great-";
                                        }
                                        relationship += "uncle";
                                        return recursiveFindKinship(iNode, iRel, true, relationship);
                                    }
                                    
                                }
    
                                // Nth [great-] uncle
                                if ((currentKinship.endsWith("uncle")) && (currentKinship.substring(0,1).matches("[0-9]"))) {
                                    String ordinal = currentKinship.substring(0, 3);
                                    String[] greatArray = currentKinship.substring(4).split("-");
                                    String relationship = ordinal;
                                    
    
                                    if (greatArray.length > 1) {
                                        for (int i=1; i < greatArray.length-1; i++) {
                                            relationship += "great-";
                                        }
                                        relationship += "uncle";
                                    }
                                    else {
                                        relationship += "cousin";
                                    }
                                    return recursiveFindKinship(iNode, iRel, true, relationship);
                                }
    
    
                                // No ordinal, [great-] (nephew | nephewcousin)
                                if ((currentKinship.endsWith("nephew") || currentKinship.endsWith("nephewcousin")) 
                                    && !(currentKinship.substring(0,1).matches("[0-9]"))) {
                                    return recursiveFindKinship(iNode, iRel, true, "great-".concat(currentKinship));
                                }
    
                                // Nth [great-] (cousin | nephewcousin)
                                if ((currentKinship.endsWith("cousin")) && (currentKinship.substring(0,1).matches("[0-9]"))) {
                                    String ordinal = currentKinship.substring(0, 3);
                                    String[] greatArray = currentKinship.substring(4).split("-");
                                    String relationship = ordinal;
    
                                    if (currentKinship.endsWith("nephewcousin")) {
                                        for (int i=0; i < greatArray.length; i++) {
                                            relationship += "great-";
                                        }
                                    }
                                    relationship += "nephewcousin";
                                    return recursiveFindKinship(iNode, iRel, true, relationship);
                                }
    
                                return recursiveFindKinship(iNode, iRel, true, "none");
    
                            }
                        }
                    }
                }
            }
        }
    }

}