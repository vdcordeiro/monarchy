package gnel.br.monarchy.Repository.Nodes;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import gnel.br.monarchy.Model.Nodes.Country;

public interface CountryRepository extends Neo4jRepository<Country, Long>{
    
}