package com.enesakkal.communityapp.services;

import org.springframework.stereotype.Service;

import com.enesakkal.communityapp.models.community.Community;
import com.enesakkal.communityapp.models.community.Template;
import com.enesakkal.communityapp.repositories.CommunityRepository;

@Service
public class TemplateService {

    private final CommunityRepository repository;

    public TemplateService(CommunityRepository repository) {
        this.repository = repository;
    }

    public void addTemplate(Community community, Template template) {


    }

}
