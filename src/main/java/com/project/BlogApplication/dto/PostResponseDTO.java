package com.project.BlogApplication.dto;

import com.project.BlogApplication.entity.PostStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class PostResponseDTO {

    private UUID id;
    private String title;
    private String content;
    private AuthorDTO author;
    private CategoryResponseDTO categoryName;
    private List<TagResponseDTO> tags;
    private PostStatus status;
    private Integer readingTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public AuthorDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorDTO author) {
        this.author = author;
    }

    public CategoryResponseDTO getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(CategoryResponseDTO categoryName) {
        this.categoryName = categoryName;
    }

    public List<TagResponseDTO> getTags() {
        return tags;
    }

    public void setTags(List<TagResponseDTO> tags) {
        this.tags = tags;
    }

    public PostStatus getStatus() {
        return status;
    }

    public void setStatus(PostStatus status) {
        this.status = status;
    }

    public Integer getReadingTime() {
        return readingTime;
    }

    public void setReadingTime(Integer readingTime) {
        this.readingTime = readingTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
