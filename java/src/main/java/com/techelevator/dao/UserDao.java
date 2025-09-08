package com.techelevator.dao;

import com.techelevator.model.dto.RegisterUserDto;
import com.techelevator.model.viewmodel.User;

import java.util.List;

public interface UserDao {
    List<User> getUsers();
    User getUserById(int id);
    User getUserByUsername(String username);
    User createUser(RegisterUserDto user);
}