package com.project.BlogApplication.contoller;

import com.project.BlogApplication.dto.TagRequestDTO;
import com.project.BlogApplication.dto.TagResponseDTO;
import com.project.BlogApplication.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping
    public ResponseEntity<List<TagResponseDTO>> addTags(@RequestBody TagRequestDTO tagRequestDTO){
        return new ResponseEntity<>(tagService.addTags(tagRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TagResponseDTO>> getAllTags(){
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTag(@PathVariable UUID id) {
        tagService.deleteTag(id);
        return new ResponseEntity<>("Tag deleted successfully", HttpStatus.NO_CONTENT);
    }

}
