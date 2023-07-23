package gnel.br.monarchy.Repository.RichRelationships;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import gnel.br.monarchy.Model.RichRelationships.Reign;

public interface ReignRepository extends Neo4jRepository<Reign, Long> {

    @Query (
        "MATCH (n:Noble)-[r:REIGNED]->(c:Country) WHERE " +
        "($nobleId = null || id(n) = $nobleId) && " +
        "($countryId = null || id(c) = $countryId) " +
        "return r"
    )
    List<Reign> findAllByNobleOrCountry(Long nobleId, Long countryId);
    
}