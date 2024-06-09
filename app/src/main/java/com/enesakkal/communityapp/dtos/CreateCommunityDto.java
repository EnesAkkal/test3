package com.enesakkal.communityapp.dtos;
import lombok.Data;
@Data
public class CreateCommunityDto {

    private String name;
    private String description;
    private String isPrivate;
    private String ownerId;
    private String[] tags;

}
