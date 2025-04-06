package com.project.BlogApplication.mapper;

import com.project.BlogApplication.dto.AuthorDTO;
import com.project.BlogApplication.dto.PostResponseDTO;
import com.project.BlogApplication.entity.Post;

public class PostMapper {

    public PostResponseDTO toDTO(Post post) {
        PostResponseDTO postResponseDTO = new PostResponseDTO();
        postResponseDTO.setTitle(post.getTitle());
        postResponseDTO.setAuthor(new AuthorDTO(post.getAuthor().getId(), post.getAuthor().getName()));
        postResponseDTO.setId(post.getId());
        postResponseDTO.setContent(post.getContent());
        postResponseDTO.setStatus(post.getStatus());
        postResponseDTO.setCategoryName(new CategoryMapper().toDTO(post.getCategory()));
        postResponseDTO.setTags(post.getTags().stream().map(tag -> new TagMapper().toDTO(tag)).toList());
        postResponseDTO.setReadingTime(post.getReadingTime());
        postResponseDTO.setCreatedAt(post.getCreatedAt());
        postResponseDTO.setUpdatedAt(post.getUpdatedAt());
        return postResponseDTO;
    }

}
