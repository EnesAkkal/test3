package com.enesakkal.communityapp.repositories;
import com.enesakkal.communityapp.models.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> { // it takes two parameters, first one is class name that we want to get, 
  //the second one is String because our primary key from User class has a type of String  here ->>> private String _id;
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Optional<User> findBy_id(String id);
}
