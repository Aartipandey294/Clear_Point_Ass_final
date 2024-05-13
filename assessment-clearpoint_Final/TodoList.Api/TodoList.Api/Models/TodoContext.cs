using Microsoft.EntityFrameworkCore;

namespace TodoList.Api.Models
{
    public class TodoContext :DbContext
    {
        public TodoContext(DbContextOptions options) : base(options) 
        { 
        
            
        
        }

        public DbSet<todo> TodoDB { get; set; }
        
    }
}
