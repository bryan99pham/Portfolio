using AutoMapper;
using EmployeeManagementAppAPI.DomainModels;
using EmployeeManagementAppAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementAppAPI.Controllers
{
    [ApiController]
    public class DepartmentsController : Controller
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IMapper mapper;

        public DepartmentsController(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departmentList = await employeeRepository.GetDepartmentsAsync();

            if(departmentList == null || !departmentList.Any())
            {
                return NotFound();
            }

            return Ok(mapper.Map<List<Department>>(departmentList));
        }
    }
}
