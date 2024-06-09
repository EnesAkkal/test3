package com.enesakkal.communityapp.services;

import com.enesakkal.communityapp.models.post.Comment;
import com.enesakkal.communityapp.models.post.Post;
import com.enesakkal.communityapp.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository repository;

    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public Post getPostById(String id) {
        return repository.findBy_id(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public String deletePostById(String id) {
        repository.deleteById(id);
        return "Post deleted successfully with id: " + id;
    }

    public Post putPost(Post post) {
        return repository.save(post);
    }

    public List<Comment> getComments(String id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Post not found")).getComments();
    }

    // Read operation
    public List<Post> getAllPosts() {
        return repository.findAll();
    }

    public Post updatePost(String id, Post post) {
        Post existingPost = repository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        existingPost.setUpVotes(post.getUpVotes());
        existingPost.setDownVotes(post.getDownVotes());
        existingPost.setComments(post.getComments());
        return repository.save(existingPost);
    }

    public void deleteAllPosts() {
        repository.deleteAll();
    }
}
