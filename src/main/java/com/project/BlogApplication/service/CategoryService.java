package com.project.BlogApplication.service;

import com.project.BlogApplication.Exception.CategoryAlreadyExistsException;
import com.project.BlogApplication.Exception.CategoryHasPostsException;
import com.project.BlogApplication.Exception.CategoryNotFoundException;
import com.project.BlogApplication.dto.CategoryRequestDTO;
import com.project.BlogApplication.dto.CategoryResponseDTO;
import com.project.BlogApplication.entity.Category;
import com.project.BlogApplication.mapper.CategoryMapper;
import com.project.BlogApplication.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    @Autowired
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryResponseDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories
                .stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryMapper.toEntity(categoryRequestDTO);
        if(categoryRepository.existsByNameIgnoreCase(category.getName())){
            throw new CategoryAlreadyExistsException("Category with name " + category.getName() + " already exists");
        }
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDTO(savedCategory);
    }

    public String deleteCategory(UUID id) {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isPresent()){
            if(!category.get().getPosts().isEmpty()){
                throw new CategoryHasPostsException("Category with id " + id + " has posts associated with it");
            }
            categoryRepository.deleteById(id);
            return "Category "+category.get().getName()+" deleted successfully";
        }else{
            throw new CategoryNotFoundException("Category with id " + id + " not found");
        }
    }

    public Category getById(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category with id " + id + " not found"));
    }

}
