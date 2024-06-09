package com.enesakkal.communityapp.models.post;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import java.util.Date;
import java.util.List;

@Data
public class Template {

    @Id
    private String _id;
    private String title;
    private String body;
    private String templateName;
    private List<Field> fields;
    private List<String> tags;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date lastModifiedDate;

    @Data
    public static class Field {
        private String fieldName;
        private String fieldType; 
    }
}
