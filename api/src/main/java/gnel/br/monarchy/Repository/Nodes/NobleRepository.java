package gnel.br.monarchy.Repository.Nodes;

import java.util.List;

import org.neo4j.driver.internal.value.PathValue;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import gnel.br.monarchy.Model.Nodes.Noble;

public interface NobleRepository extends Neo4jRepository<Noble, Long>{
    
    @Query (
        "MATCH (n:Noble) WHERE n.gender = $gender return n"
    )
    public List<Noble> findAll(String gender);

    @Query (
        "MATCH (n:Noble)<-[:IS_CHILD_OF]-(child:Noble) WHERE id(n) = $id return child"
    )
    public List<Noble> findChildrenById(Long id);

    @Query (
    //    "match p=(n0:Noble)-[r0:IS_CHILD_OF *0..]->()<-[r1:IS_CHILD_OF *0..]-(n1:Noble) " +
    //    "where id(n0)=$nobleOneId and id(n1)=$nobleTwoId " +
    //    "return p"

    "with " +
        "$nobleOneId as startId, " +
        "$nobleTwoId as idEnd " +
    "MATCH(start: Noble), (end:Noble) " +
    "WHERE id(start)=startId and id(end)=idEnd " +
    "with start, end " +
    "CALL apoc.path.expandConfig(start, { " +
        "terminatorNodes : [end], " +
        "uniqueness : 'NODE_PATH', " +
        "relationshipFilter: 'IS_CHILD_OF', " +
        "optional : true " +
    "}) yield path " +
    "return path"


    )
    //public NobleRelativesPathDto getShortestFamilyPath(Long nobleOneId, Long nobleTwoId);
    public List<PathValue> getAllKinshipPaths(Long nobleOneId, Long nobleTwoId);

}