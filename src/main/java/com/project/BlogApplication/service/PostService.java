package com.project.BlogApplication.service;

import com.project.BlogApplication.dto.PostResponseDTO;
import com.project.BlogApplication.entity.Post;
import com.project.BlogApplication.entity.PostStatus;
import com.project.BlogApplication.entity.User;
import com.project.BlogApplication.mapper.PostMapper;
import com.project.BlogApplication.repository.PostRepository;
import com.project.BlogApplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PostResponseDTO> getAllPosts(UUID categoryId, UUID tagId) {
        List<Post> posts = postRepository.findAllFiltered(categoryId, tagId);
        return posts.stream().map(post -> new PostMapper().toDTO(post)).collect(Collectors.toList());
    }

    public List<PostResponseDTO> getAllDraftPosts(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UsernameNotFoundException("User not found"));
        List<Post> posts = postRepository.findAllByAuthorAndStatus(user, PostStatus.DRAFT);
        return posts.stream().map(post -> new PostMapper().toDTO(post)).collect(Collectors.toList());
    }
}
