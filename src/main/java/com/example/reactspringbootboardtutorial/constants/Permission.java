package com.example.reactspringbootboardtutorial.constants;

public enum Permission {
    ADMIN("ADMIN"),
    MANAGER("MANAGER"),
    USER("USER");

    private final String name;

    Permission(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
