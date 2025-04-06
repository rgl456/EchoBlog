package com.project.BlogApplication.dto;

import com.project.BlogApplication.entity.PostStatus;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class PostRequestDTO {

    private String title;
    private String content;
    private UUID categoryId;
    private Set<UUID> tagIds = new HashSet<>();
    private PostStatus status;

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

    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }

    public Set<UUID> getTagIds() {
        return tagIds;
    }

    public void setTagIds(Set<UUID> tagIds) {
        this.tagIds = tagIds;
    }

    public PostStatus getStatus() {
        return status;
    }

    public void setStatus(PostStatus status) {
        this.status = status;
    }
}
