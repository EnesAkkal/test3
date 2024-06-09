package com.enesakkal.communityapp.services;

import com.enesakkal.communityapp.models.user.User;
import com.enesakkal.communityapp.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User getUserById(String id) {
        return repository.findBy_id(id).orElseThrow();
    }

    public User updateUserById(String id, User user) {

        User userToUpdate = repository.findById(id).orElseThrow();
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setPassword(user.getPassword());

        return repository.save(userToUpdate);


    }

    public List<User> getUsers() {
        return repository.findAll();
    }

    public User addUser(User user) {
        try {
            repository.save(user);
            return user;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }
    public void deleteUserById(String id) {
        repository.deleteById(id);
    }

    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    public void deleteAllUsers() {
        repository.deleteAll();
    }
}
