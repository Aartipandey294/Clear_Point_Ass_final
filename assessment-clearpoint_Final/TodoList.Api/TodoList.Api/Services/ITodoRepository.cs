using Microsoft.Graph.Models;
using System;
using System.Collections.Generic;
using TodoList.Api.Models;

namespace TodoList.Api.Services
{
    public interface ITodoRepository
    {

        // Add a new todo item
        todo Add(todo todo);

        // Update an existing todo item
        void Update(todo todo);

        // Get all todo items
        IEnumerable<todo> GetAll();

        // Get a todo item by its ID
        todo GetById(int id);

        // Delete a todo item by its ID
        void Delete(int id);
    }
}
