package com.project.BlogApplication.service;

import com.project.BlogApplication.dto.TagRequestDTO;
import com.project.BlogApplication.dto.TagResponseDTO;
import com.project.BlogApplication.entity.PostStatus;
import com.project.BlogApplication.entity.Tag;
import com.project.BlogApplication.mapper.TagMapper;
import com.project.BlogApplication.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<TagResponseDTO> addTags(TagRequestDTO tagRequestDTO) {
        Set<String> tags = tagRequestDTO.getNames();
        for(String tag : tags) {
            if(!tagRepository.existsByName(tag)) {
                Tag newTag = new TagMapper().toEntity(tag);
                tagRepository.save(newTag);
            }
        }

        List<TagResponseDTO> tagResponseDTOs = tags.stream()
                .map(tag -> tagRepository.findByName(tag)
                        .map(new TagMapper()::toDTO)
                        .orElse(null))
                .collect(Collectors.toList());

        return tagResponseDTOs;
    }

    public List<TagResponseDTO> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream()
                .map(tag->new TagMapper().toDTO(tag))
                .collect(Collectors.toList());
    }

    public void deleteTag(UUID id) {
        Tag tag = tagRepository.findById(id).orElseThrow(()-> new RuntimeException("Tag not found with id: " + id));
        if(tag.getPosts().isEmpty()) {
            tagRepository.delete(tag);
        } else {
            throw new RuntimeException("Tag cannot be deleted as it is associated with existing posts.");
        }
    }

    public List<Tag> getAllTagsByIds(Set<UUID> ids){
        List<Tag> foundedTags = tagRepository.findAllById(ids);
        if(foundedTags.size() != ids.size()){
            throw new EntityNotFoundException("Some tags not found");
        }
        return foundedTags;
    }
}
