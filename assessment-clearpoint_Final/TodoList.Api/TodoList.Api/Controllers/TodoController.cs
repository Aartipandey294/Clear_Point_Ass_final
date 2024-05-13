using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Graph.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Api.Models;
using TodoList.Api.Services;

namespace TodoList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class TodoController : ControllerBase
    {

        private readonly ILogger<TodoController> _logger;
        private readonly IConfiguration _config;
        public readonly TodoContext _context;


        public TodoController(ILogger<TodoController> logger, IConfiguration config, TodoContext context)
        {

            _logger = logger;
            _config = config;
            _context = context;
        }


        // GET: api/Todo/ListTodo
        [HttpGet("ListTodo")]
        public ActionResult<IEnumerable<todo>> GetTodoItems()
        {
            return _context.TodoDB.ToList();
        }

        // POST: api/Todo/CreateTodo
        [HttpPost("CreateTodo")]
        public ActionResult<string> CreateTodoItem(todo todo)
        {
            if (_context.TodoDB.Any(t => t.Description == todo.Description))
            {
                return Conflict("Todo with the same description already exists.");
            }

            todo.LastUpdateDate = DateTime.Now;
            todo.Id = Guid.NewGuid(); // Generate a new Id
            _context.TodoDB.Add(todo);
            _context.SaveChanges();

            return Ok("Todo created successfully.");
        }

        

        // PUT: api/Todo/MarkTodoItemAsCompleted/{id}
        [HttpPut("MarkTodoItemAsCompleted/{id}")]
        public IActionResult MarkTodoItemAsCompleted(Guid id, [FromBody] Todo todo)
        {
            var existingTodo = _context.TodoDB.FirstOrDefault(t => t.Id == id);
            if (existingTodo == null)
            {
                return NotFound(new { error = "Todo item not found." });
            }

            existingTodo.Completed = true;
            _context.SaveChanges();

            return Ok(new { message = "Todo item marked as completed.", todoId = existingTodo.Id });
        }


        // DELETE: api/Todo/DeleteTodoItem/{id}
        [HttpDelete("DeleteTodoItem/{id}")]
        public IActionResult DeleteTodoItem(Guid id)
        {
            var todo = _context.TodoDB.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound(new { error = "Todo item not found." }); // Return a JSON object with an error message
            }

            _context.TodoDB.Remove(todo);
            _context.SaveChanges();

            return Ok(new { message = "Todo item deleted successfully." }); // Return a JSON object with a success message
        }

    }
}
