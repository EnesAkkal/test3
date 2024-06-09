package com.enesakkal.communityapp.repositories;
import com.enesakkal.communityapp.models.post.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    // this method may or may not return post object
    Boolean existsByCreatedAt(Date createdAt);
    Optional<Post> findBy_id(String id);
    Boolean existsBy_id(String id);

}
