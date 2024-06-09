package com.enesakkal.communityapp.models.post;

import com.enesakkal.communityapp.models.community.Template;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String _id;
    private String userId;
    private String username;
    private Template template;
    private int upVotes;
    private int downVotes;
    private List<Comment> comments = List.of();
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date lastModifiedDate;
}
