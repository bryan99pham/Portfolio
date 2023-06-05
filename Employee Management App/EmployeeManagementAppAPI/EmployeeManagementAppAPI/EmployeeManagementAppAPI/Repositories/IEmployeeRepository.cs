using EmployeeManagementAppAPI.DataModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagementAppAPI.Repositories
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeAsync(Guid employeeId);
        Task<Employee> GetSingleEmployeeAsync(Guid employeeId);
        Task<List<Department>>GetDepartmentsAsync();
        Task<bool>Exists(Guid employeeId);
        Task<Employee> UpdateEmployee(Guid employeeId, Employee newEmployeeInfo);
        Task<Employee> DeleteEmployee(Guid employeeId);
        Task<Employee> AddEmployee(Employee request);
        Task<bool> UpdateProfileImage(Guid employeeId, string profileImageUrl);
    }
}
