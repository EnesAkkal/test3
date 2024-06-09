package com.enesakkal.communityapp.services;

import com.enesakkal.communityapp.models.post.Comment;
import com.enesakkal.communityapp.models.post.Post;
import com.enesakkal.communityapp.repositories.PostRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final PostRepository repository;

    public CommentService(PostRepository repository) {
        this.repository = repository;
    }

    public void addComment(String postId, Comment comment) {
        Post post = repository.findById(postId)
                .orElse(null);
        if (post != null) {
            // Add the new comment to the post
            post.getComments()
                    .add(comment);
            // Save the updated post back to the repository
            repository.save(post);
        } else {
            // Handle case where post with given ID is not found
            throw new IllegalArgumentException("Post not found with ID: " + postId);
        }
    }

    public void deleteComment(String postId, String commentId) {
        Post post = repository.findById(postId).orElse(null);
        if (post != null) {
            // Find and remove the comment with the given commentId
            post.getComments()
                    .removeIf(comment -> comment.get_id()
                            .equals(commentId));
            // Save the updated post back to the repository
            repository.save(post);
        } else {
            // Handle case where post with given ID is not found
            throw new IllegalArgumentException("Post not found with ID: " + postId);
        }
    }

    public Comment getCommentById(String id, String postId) {
        Post post = repository.findById(postId).orElse(null);
        if (post != null) {
            // Find and remove the comment with the given commentId
            return post.getComments().stream()
                    .filter(comment -> comment.get_id().equals(id))
                    .findFirst()
                    .orElseThrow();
        } else {
            // Handle case where post with given ID is not found
            throw new IllegalArgumentException("Post not found with ID: " + postId);
        }
    }

}
