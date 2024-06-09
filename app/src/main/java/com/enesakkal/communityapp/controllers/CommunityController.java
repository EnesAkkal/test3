package com.enesakkal.communityapp.controllers;

import com.enesakkal.communityapp.dtos.CreateCommunityDto;
import com.enesakkal.communityapp.models.community.Community;
import com.enesakkal.communityapp.models.community.Template;
import com.enesakkal.communityapp.models.post.Post;
import com.enesakkal.communityapp.models.user.User;
import com.enesakkal.communityapp.services.CommunityService;
import com.enesakkal.communityapp.services.PostService;
import com.enesakkal.communityapp.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/community")
public class CommunityController {

    private final PostService postService;
    private final CommunityService communityService;
    private final UserService userService;

    public CommunityController(PostService postService,
            CommunityService communityService, UserService userService) {
        this.postService = postService;
        this.communityService = communityService;
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<Community>> getCommunities(
            @RequestParam(required = false, name = "filter") String filter) {
        if (filter == null || filter.isEmpty()) {
            return ResponseEntity.ok(communityService.getCommunities());
        }
        return ResponseEntity.ok(communityService.getCommunities(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunity(@PathVariable String id) {
        return ResponseEntity.ok(communityService.getCommunity(id));
    }


    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @PostMapping("/create")
    public ResponseEntity<Community> createCommunity(@RequestBody @Valid CreateCommunityDto community) {
        User owner = userService.getUserById(community.getOwnerId());

        Community newCommunity = new Community();
        newCommunity.setName(community.getName());
        newCommunity.setDescription(community.getDescription());
        newCommunity.setPrivate(Boolean.parseBoolean(community.getIsPrivate()));
        newCommunity.setOwner(owner);
        newCommunity.setMembers(List.of(owner));
        newCommunity.setTags(List.of(community.getTags()));
        newCommunity.setCreatedAt(new Date());
        newCommunity.setLastModifiedDate(new Date());
        newCommunity.setMemberCount(1);

        Template template = new Template();
        template.set_id(UUID.randomUUID().toString());
        template.setUserId(owner.get_id());
        template.setTemplateName("Default");
        template.setFieldsTypes(List.of("text"));
        template.setCreatedAt(new Date());
        template.setFieldsNames(List.of("name"));
        newCommunity.setTemplates(List.of(template));

        return ResponseEntity.ok(communityService.putCommunity(newCommunity));
    }

    @PostMapping("/join/{communityId}")
    public ResponseEntity<Community> joinCommunity(@RequestBody String userId, @PathVariable String communityId) {

        return ResponseEntity.ok(communityService.joinCommunity(userId, communityId));
    }

    @DeleteMapping("/deleteall")
    public ResponseEntity<String> deleteAll() {
        communityService.deleteAll();
        return ResponseEntity.ok("All communities deleted");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Community>> searchCommunities(@RequestParam String name) {
        List<Community> communities = communityService.searchCommunitiesByName(name);
        return ResponseEntity.ok(communities);
    }

    @PostMapping("/{id}/leave")
    public ResponseEntity<String> leaveCommunity(@RequestParam String userId, @PathVariable String id) {
        communityService.leaveCommunity(userId, id);
        return ResponseEntity.ok("User left community successfully");
    }

    @PostMapping("/{id}/template")
    public ResponseEntity<Community> addTemplate(@RequestBody Template template, @PathVariable String id) {
        Community community = communityService.getCommunity(id);
        if (community == null) {
            throw new RuntimeException("Community not found");
        }
        Template newTemplate = new Template();
        newTemplate.setUserId(template.getUserId());
        newTemplate.setTemplateName(template.getTemplateName());
        newTemplate.setFieldsTypes(template.getFieldsTypes());
        newTemplate.setFieldsNames(template.getFieldsNames());
        newTemplate.setTemplateName(template.getTemplateName());
        newTemplate.setCreatedAt(new Date());
        newTemplate.set_id(UUID.randomUUID().toString());
        community.getTemplates().add(newTemplate);
        communityService.putCommunity(community);

        return ResponseEntity.ok(community);
    }

    @GetMapping("/{id}/templates")
    public ResponseEntity<List<Template>> getTemplates(@PathVariable String id) {
        Community community = communityService.getCommunity(id);
        if (community == null) {
            throw new RuntimeException("Community not found");
        }
        return ResponseEntity.ok(community.getTemplates());
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<Post>> getPosts(@PathVariable String id) {
        Community community = communityService.getCommunity(id);
        if (community == null) {
            throw new RuntimeException("Community not found");
        }
        return ResponseEntity.ok(community.getPosts());
    }

    @PostMapping("/{id}/posts")
    public ResponseEntity<Community> addPost(@RequestBody Post post, @PathVariable String id) {
        Community community = communityService.getCommunity(id);
        if (community == null) {
            throw new RuntimeException("Community not found");
        }
        post.set_id(UUID.randomUUID().toString());
        post.setCreatedAt(new Date());
        post.setTemplate(post.getTemplate());

        List<Post> posts = community.getPosts();
        posts.add(post);
        community.setPosts(posts);
        community.setPostCount(community.getPosts().size());


        communityService.putCommunity(community);
        return ResponseEntity.ok(community);
    }



}
