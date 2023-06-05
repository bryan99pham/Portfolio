using System;

namespace EmployeeManagementAppAPI.DataModels
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public long Mobile { get; set; }
        public string ProfileImageURL { get; set; }
        public Guid DepartmentId { get; set; }
        
        //Navigation Properties
        public Department Department { get; set; }
        public Address Address { get; set; }

    }
}
