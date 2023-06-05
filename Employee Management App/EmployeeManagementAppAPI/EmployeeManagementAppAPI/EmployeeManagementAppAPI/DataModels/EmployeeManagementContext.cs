using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementAppAPI.DataModels
{
    public class EmployeeManagementContext : DbContext
    {
        public EmployeeManagementContext(DbContextOptions<EmployeeManagementContext> options): base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Department> Department { get; set; }
        
    }
}
