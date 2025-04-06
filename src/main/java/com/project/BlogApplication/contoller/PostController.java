package com.project.BlogApplication.contoller;

import com.project.BlogApplication.dto.PostRequestDTO;
import com.project.BlogApplication.dto.PostResponseDTO;
import com.project.BlogApplication.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts(@RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID tagId){
        return ResponseEntity.ok(postService.getAllPosts(categoryId,tagId));
    }

    @GetMapping("/drafts")
    public ResponseEntity<List<PostResponseDTO>> getAllDraftPosts(@RequestAttribute ("userId") UUID userId){
        return ResponseEntity.ok(postService.getAllDraftPosts(userId));

    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO postRequestDTO, @RequestAttribute("userId") UUID userId){
        return new ResponseEntity<>(postService.createPost(postRequestDTO,userId), HttpStatus.CREATED);
    }

}
