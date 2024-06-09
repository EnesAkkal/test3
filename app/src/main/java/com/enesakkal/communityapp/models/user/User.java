package com.enesakkal.communityapp.models.user;

import com.enesakkal.communityapp.dtos.UserDto;
import com.enesakkal.communityapp.models.community.Template;
import com.enesakkal.communityapp.models.post.Comment;
import com.enesakkal.communityapp.models.post.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private String _id;
    private String username;
    private String password;
    private String email;
    private Date registeredAt;
    private List<Post> posts = List.of();
    private List<Comment> comments = List.of();
    private List<String> followedCommunities = List.of();
    private List<String> createdCommunities = List.of();
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date lastModifiedDate;

    public UserDto toUserDto() {
        return UserDto.builder()
                ._id(_id)
                .username(username)
                .email(email)
                .build();

    }

}
