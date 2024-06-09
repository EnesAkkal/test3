package com.enesakkal.communityapp.models.community;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import java.util.Date;
import java.util.Dictionary;
import java.util.List;

@Data
public class Template {

    @Id
    private String _id;
    private String userId;
    private String templateName;
    private List<String> fieldsNames;
    private List<String> fieldsTypes;
    private List<String> fieldsValues;
    @CreatedDate
    private Date createdAt;
    @LastModifiedDate
    private Date lastModifiedDate;

}
