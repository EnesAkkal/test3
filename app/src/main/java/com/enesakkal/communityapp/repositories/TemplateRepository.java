package com.enesakkal.communityapp.repositories;

import com.enesakkal.communityapp.models.post.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateRepository extends MongoRepository<Template, String> {
}

