package com.enesakkal.communityapp.repositories;

import com.enesakkal.communityapp.models.community.Community;
import com.enesakkal.communityapp.models.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

// Spring Data repositories provide a way to define query methods in an interface by simply declaring method signatures.

@Repository
public interface CommunityRepository extends MongoRepository<Community, String> {
    Boolean existsByDescription(String description);


    Optional<Community> findBy_id(String id);

    List<Community> findAllByNameContaining(String filter);

    void deleteAll();

    List<Community> findAllByMembersIn(Collection<List<User>> members);

    }
