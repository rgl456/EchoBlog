package com.project.BlogApplication.mapper;

import com.project.BlogApplication.dto.TagResponseDTO;
import com.project.BlogApplication.entity.PostStatus;
import com.project.BlogApplication.entity.Tag;


public class TagMapper {

    public Tag toEntity(String name) {
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }

    public TagResponseDTO toDTO(Tag tag) {
        TagResponseDTO dto = new TagResponseDTO();
        dto.setId(tag.getId());
        dto.setName(tag.getName());
        Long publishedPostCount = tag.getPosts().stream()
                .filter(post -> post.getStatus().equals(PostStatus.PUBLISHED))
                .count();
        dto.setPostCount(publishedPostCount);
        return dto;
    }

}




