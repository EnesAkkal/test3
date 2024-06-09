package com.enesakkal.communityapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {

    private String _id;
    private String username;
    private String email;

}
