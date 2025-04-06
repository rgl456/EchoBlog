package com.project.BlogApplication.repository;

import com.project.BlogApplication.entity.Category;
import com.project.BlogApplication.entity.Post;
import com.project.BlogApplication.entity.PostStatus;
import com.project.BlogApplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    @Query("""
        SELECT p FROM Post p
        WHERE (:categoryId IS NULL OR p.category.id = :categoryId)
          AND (:tagId IS NULL OR EXISTS (
              SELECT t FROM p.tags t WHERE t.id = :tagId
          ))
    """)
    List<Post> findAllFiltered(@Param("categoryId") UUID categoryId, @Param("tagId") UUID tagId);

    List<Post> findAllByAuthorAndStatus(User author, PostStatus status);

    List<Post> findAllByCategory(Category category);
}
