package gnel.br.monarchy.Model.Nodes;

import java.util.Date;
import java.util.List;

import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.lang.NonNull;

import gnel.br.monarchy.Model.RichRelationships.Reign;
import gnel.br.monarchy.Util.Gender;

@Node
public class Noble {

    @Id @GeneratedValue
    private Long id;

    @NonNull
    private String name;
    private String fullName;
    private Gender gender;
    
    @NonNull
    private Date born;
    
    private Date death;

    @Relationship(type = "IS_CHILD_OF" )
    private List<Noble> ascendents;
    
    @Relationship("REIGNED")
    private List<Reign> reigned;
    

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return String return the fullName
     */
    public String getFullName() {
        return fullName;
    }

    /**
     * @param fullName the fullName to set
     */
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    /**
     * @return Gender return the gender
     */
    public Gender getGender() {
        return gender;
    }

    /**
     * @param gender the gender to set
     */
    public void setGender(Gender gender) {
        this.gender = gender;
    }

    /**
     * @return Date return the born
     */
    public Date getBorn() {
        return born;
    }

    /**
     * @param born the born to set
     */
    public void setBorn(Date born) {
        this.born = born;
    }

    /**
     * @return Date return the death
     */
    public Date getDeath() {
        return death;
    }

    /**
     * @param death the death to set
     */
    public void setDeath(Date death) {
        this.death = death;
    }


    /**
     * @return Long return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = (id < 0) ? null: id;
    }


    /**
     * @return Set<Noble> return the ascendents
     */
    public List<Noble> getAscendents() {
        return ascendents;
    }

    /**
     * @param ascendents the ascendents to set
     */
    public void setAscendents(List<Noble> ascendents) {
        this.ascendents = ascendents;
    }


    /**
     * @return List<Reign> return the reigned
     */
    public List<Reign> getReigned() {
        return reigned;
    }

    /**
     * @param reigned the reigned to set
     */
    public void setReigned(List<Reign> reigned) {
        this.reigned = reigned;
    }

}