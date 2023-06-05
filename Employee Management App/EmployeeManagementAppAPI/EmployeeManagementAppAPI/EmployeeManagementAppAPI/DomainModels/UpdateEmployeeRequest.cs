using System;

namespace EmployeeManagementAppAPI.DomainModels
{
    public class UpdateEmployeeRequest
    {
        //allowing these fields to be updated
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public long Mobile { get; set; }
        //public string ProfileImageUrl { get; set; }
        public Guid DepartmentId { get; set; }
        //public string DepartmentName { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }
    }
}
