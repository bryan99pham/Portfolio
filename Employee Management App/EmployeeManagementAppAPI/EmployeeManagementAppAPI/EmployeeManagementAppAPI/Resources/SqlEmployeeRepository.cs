using EmployeeManagementAppAPI.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EmployeeManagementAppAPI.Repositories
{
    public class SqlEmployeeRepository : IEmployeeRepository
    {
        private readonly EmployeeManagementContext context;

        public SqlEmployeeRepository(EmployeeManagementContext context)
        {
            this.context = context;
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            return await context.Employee.Include(nameof(Department)).Include(nameof(Address)).ToListAsync();
        }

        public async Task<Employee> GetEmployeeAsync(Guid employeeId)
        {
            return await context.Employee
                .Include(nameof(Department)).Include(nameof(Address))
                .FirstOrDefaultAsync(x => x.Id == employeeId);
        }

        public async Task<Employee> GetSingleEmployeeAsync(Guid employeeId)
        {
            return await context.Employee
                .Include(nameof(Department)).Include(nameof(Address))
                .FirstOrDefaultAsync(x => x.Id == employeeId);
        }

        public async Task<List<Department>> GetDepartmentsAsync()
        {
            return await context.Department.ToListAsync();
        }

        public async Task<bool> Exists(Guid employeeId)
        {
            return await context.Employee.AnyAsync(x => x.Id == employeeId);
        }

        public async Task<Employee> UpdateEmployee(Guid employeeId, Employee newEmployeeInfo)
        {
            var existingEmployee = await GetEmployeeAsync(employeeId);
            if (existingEmployee != null)
            {
                existingEmployee.FirstName = newEmployeeInfo.FirstName;
                existingEmployee.LastName = newEmployeeInfo.LastName;
                existingEmployee.DateOfBirth = newEmployeeInfo.DateOfBirth;
                existingEmployee.Email = newEmployeeInfo.Email;
                existingEmployee.Mobile = newEmployeeInfo.Mobile;
                existingEmployee.DepartmentId = newEmployeeInfo.DepartmentId;
                existingEmployee.Address.PhysicalAddress = newEmployeeInfo.Address.PhysicalAddress;
                existingEmployee.Address.PostalAddress = newEmployeeInfo.Address.PostalAddress;

                await context.SaveChangesAsync();
                return existingEmployee;
            }
            return null;
        }

        public async Task<Employee> DeleteEmployee(Guid employeeId)
        {
            var employee = await GetEmployeeAsync(employeeId);

            if(employee != null)
            {
                //deleting employee
                context.Employee.Remove(employee);
                await context.SaveChangesAsync();
                return employee;
            }
            return null;
        }

        public async Task<Employee> AddEmployee(Employee request)
        {
            var employee = await context.Employee.AddAsync(request);
            await context.SaveChangesAsync();
            return employee.Entity;
        }

        public async Task<bool> UpdateProfileImage(Guid employeeId, string profileImageUrl)
        {
            var employee = await GetSingleEmployeeAsync(employeeId);

            if(employee != null)
            {
                employee.ProfileImageURL = profileImageUrl;
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
