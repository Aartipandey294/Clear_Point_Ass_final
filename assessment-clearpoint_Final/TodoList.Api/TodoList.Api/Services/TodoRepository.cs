using System;
using System.Collections.Generic;
using System.Linq;
using TodoList.Api.Models;

namespace TodoList.Api.Services
{
    public class TodoRepository : ITodoRepository
    {
        private readonly List<todo> _todoList;
        private int _nextId = 1 ;
        //private readonly AppDbContext _context;

        //public TodoRepository(AppDbContext context)
        //{
        //    _todoList = new List<todo>();
        //    _context = context;

        //}

        public todo Add(todo todo)
        {
            if (todo == null)
            {
                throw new ArgumentNullException(nameof(todo));
            }

            //todo.Id = Guid.NewGuid();  // Assigning a new Guid value
            //_todoList.Add(todo);
            //return todo;
            //_context.TodoItems.Add(todo);
            //_context.SaveChanges();
            return todo;
        }

        public void Delete(int id)
        {
            var todoToRemove = GetById(id);
            if (todoToRemove != null)
            {
                //_todoList.Remove(todoToRemove);
                //_context.TodoItems.Remove(todoToRemove);
                //_context.SaveChanges();
            }
        }

        public IEnumerable<todo> GetAll()
        {
            return _todoList;
            //return _context.TodoItems.ToList();

        }

        public todo GetById(int id)
        {
            throw null;
        }

        public void Update(todo todo)
        {
            //var existingTodo = GetById(todo.Id);
            //if (existingTodo != null)
            //{
            //    //existingTodo.Title = todo.Title;
            //    existingTodo.Description = todo.Description;
            //    existingTodo.Completed = todo.Completed;
            //    //_context.SaveChanges();

            //}

            throw new NotImplementedException();
        }

        //todomodel ITodoRepository.GetById(Guid id)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
