using EmployeeManagementAppAPI.DomainModels;
using EmployeeManagementAppAPI.Repositories;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementAppAPI.Validators
{
    public class AddEmployeeRequestValidator: AbstractValidator<AddEmployeeRequest>    
    {
        public AddEmployeeRequestValidator(IEmployeeRepository employeeRepository)
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.DateOfBirth).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Mobile).NotEmpty();
            RuleFor(x => x.DepartmentId).NotEmpty().Must(id =>
            {
                var department = employeeRepository.GetDepartmentsAsync().Result.ToList()
                .FirstOrDefault(x => x.DepartmentId == id);

                if (department != null)
                {
                    return true;
                }

                return false;
            }).WithMessage("Please select a department");
            RuleFor(x => x.PhysicalAddress).NotEmpty();
            RuleFor(x => x.PostalAddress).NotEmpty();

        }
    }
}
