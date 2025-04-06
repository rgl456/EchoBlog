package com.project.BlogApplication.service;

import com.project.BlogApplication.Exception.CategoryNotFoundException;
import com.project.BlogApplication.dto.PostRequestDTO;
import com.project.BlogApplication.dto.PostResponseDTO;
import com.project.BlogApplication.dto.UpdatePostRequestDTO;
import com.project.BlogApplication.entity.*;
import com.project.BlogApplication.mapper.PostMapper;
import com.project.BlogApplication.repository.CategoryRepository;
import com.project.BlogApplication.repository.PostRepository;
import com.project.BlogApplication.repository.TagRepository;
import com.project.BlogApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagService tagService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TagRepository tagRepository;

    private static final int WORDS_PER_MINUTE = 200;

    public List<PostResponseDTO> getAllPosts(UUID categoryId, UUID tagId) {
        List<Post> posts = postRepository.findAllFiltered(categoryId, tagId);
        return posts.stream().map(post -> new PostMapper().toDTO(post)).collect(Collectors.toList());
    }

    public List<PostResponseDTO> getAllDraftPosts(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        List<Post> posts = postRepository.findAllByAuthorAndStatus(user, PostStatus.DRAFT);
        return posts.stream().map(post -> new PostMapper().toDTO(post)).collect(Collectors.toList());
    }


    public PostResponseDTO createPost(PostRequestDTO postRequestDTO, UUID userId) {
        User loggedInUser = userRepository.findById(userId).orElseThrow(()->new UsernameNotFoundException("User not found"));
        Post post = new Post();
        post.setAuthor(loggedInUser);
        post.setTitle(postRequestDTO.getTitle());
        post.setContent(postRequestDTO.getContent());
        post.setReadingTime(calculateReadingTime(postRequestDTO.getContent()));
        Category category = categoryService.getById(postRequestDTO.getCategoryId());
        post.setCategory(category);
        List<Tag> tags = tagService.getAllTagsByIds(postRequestDTO.getTagIds());
        post.setTags(new HashSet<>(tags));
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setStatus(postRequestDTO.getStatus());
        Post savedPost = postRepository.save(post);
        return new PostMapper().toDTO(savedPost);
    }

    public Integer calculateReadingTime(String content){
        if(content == null || content.isEmpty()){
            return 0;
        }
        int wordCount = content.trim().split("\\s+").length;
        return (int) Math.ceil((double)wordCount/ WORDS_PER_MINUTE);
    }

    public PostResponseDTO updatePost(UUID id, UpdatePostRequestDTO updatePostRequestDTO) {
        Post existingPost = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Post not found"));
        existingPost.setTitle(updatePostRequestDTO.getTitle());
        existingPost.setContent(updatePostRequestDTO.getContent());
        existingPost.setReadingTime(calculateReadingTime(updatePostRequestDTO.getContent()));
        if(!updatePostRequestDTO.getCategoryId().equals(existingPost.getCategory().getId())){
            Category newCategory = categoryService.getById(updatePostRequestDTO.getCategoryId());
            existingPost.setCategory(newCategory);
        }

        Set<UUID> updatedTagIds = updatePostRequestDTO.getTagIds();
        Set<UUID> existingTagIds = existingPost.getTags().stream().map(Tag::getId).collect(Collectors.toSet());
        if(!updatedTagIds.equals(existingTagIds)){
            List<Tag> newTags = tagService.getAllTagsByIds(updatePostRequestDTO.getTagIds());
            existingPost.setTags(new HashSet<>(newTags));
        }
        existingPost.setStatus(updatePostRequestDTO.getStatus());
        existingPost.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(existingPost);
        return new PostMapper().toDTO(updatedPost);
    }

    public void deletePost(UUID id) {
        Post post = postRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Post not found"));
        postRepository.delete(post);
    }

    public List<PostResponseDTO> getPostByCategoryId(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new CategoryNotFoundException("Category not found"));
        List<Post> posts = postRepository.findAllByCategory(category);
        if(posts.isEmpty()){
            throw new CategoryNotFoundException("No posts found for this category");
        }
        return posts.stream().map(post -> new PostMapper().toDTO(post)).collect(Collectors.toList());
    }
}
