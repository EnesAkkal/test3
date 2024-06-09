package com.enesakkal.communityapp;

import com.enesakkal.communityapp.models.community.Community;
import com.enesakkal.communityapp.repositories.CommunityRepository;
import com.enesakkal.communityapp.repositories.UserRepository;
import com.enesakkal.communityapp.services.CommunityService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class SearchCommunityTest {

    @Mock
    private CommunityRepository communityRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommunityService communityService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSearchCommunities() {
        // Arrange
        String searchName = "Test Community";
        
        Community community1 = new Community();
        community1.set_id("community1Id");
        community1.setName("Test Community 1");
        community1.setDescription("Description 1");
        community1.setPrivate(true);
        community1.setCreatedAt(new Date());
        community1.setLastModifiedDate(new Date());

        Community community2 = new Community();
        community2.set_id("community2Id");
        community2.setName("Test Community 2");
        community2.setDescription("Description 2");
        community2.setPrivate(true);
        community2.setCreatedAt(new Date());
        community2.setLastModifiedDate(new Date());

        List<Community> expectedCommunities = List.of(community1, community2);
        
        when(communityRepository.findAllByNameContaining(searchName)).thenReturn(expectedCommunities);

        // Act
        List<Community> result = communityService.searchCommunitiesByName(searchName);

        // Assert
        assertEquals(2, result.size());
        assertEquals("community1Id", result.get(0).get_id());
        assertEquals("Test Community 1", result.get(0).getName());
        assertEquals("community2Id", result.get(1).get_id());
        assertEquals("Test Community 2", result.get(1).getName());
    }
}
