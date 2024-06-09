package com.enesakkal.communityapp.models.post;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

@Data
public class Comment {

    @Id
    private String _id;
    private String body;
    private int upVotes;
    private int downVotes;
    private String username;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date lastModifiedDate;
}
