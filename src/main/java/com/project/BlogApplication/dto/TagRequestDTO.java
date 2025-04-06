package com.project.BlogApplication.dto;


import java.util.Set;

public class TagRequestDTO {

    private Set<String> names;

    public Set<String> getNames() {
        return names;
    }

    public void setNames(Set<String> names) {
        this.names = names;
    }

}
