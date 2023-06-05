using AutoMapper;
using EmployeeManagementAppAPI.DomainModels;
using EmployeeManagementAppAPI.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementAppAPI.Controllers
{
    [ApiController]
    public class EmployeesController : Controller
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IMapper mapper;
        private readonly IImageRepository imageRepository;

        public EmployeesController(IEmployeeRepository employeeRepository, IMapper mapper, IImageRepository imageRepository)
        {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
            this.imageRepository = imageRepository;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllEmployeesAsync()
        {
            //fetching all employees
            var employees = await employeeRepository.GetEmployeesAsync();

            return Ok(mapper.Map<List<Employee>>(employees));
        }

        [HttpGet]
        [Route("[controller]/{employeeId:guid}"), ActionName("GetEmployeeAsync")]
        public async Task<IActionResult> GetEmployeeAsync([FromRoute] Guid employeeId)
        {
            //fetch employee information
            var employee = await employeeRepository.GetEmployeeAsync(employeeId);
            if (employee == null)
            {
                return NotFound();
            }

            //convert this data model that we stored in the employee variable to a domain model and return it to the angular application
            return Ok(mapper.Map<Employee>(employee));
        }

        [HttpPut]
        [Route("[controller]/{employeeId:guid}")]
        public async Task<IActionResult> UpdateEmployeeAsync([FromRoute] Guid employeeId, [FromBody] UpdateEmployeeRequest newEmployeeInfo)
        {
            if (await employeeRepository.Exists(employeeId))
            {
                //update employee info
                var updatedEmployee = await employeeRepository.UpdateEmployee(employeeId, mapper.Map<DataModels.Employee>(newEmployeeInfo));

                if (updatedEmployee != null)
                {
                    return Ok(mapper.Map<Employee>(updatedEmployee));
                }
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("[controller]/{employeeId:guid}")]
        public async Task<IActionResult> DeleteEmployeeAsync([FromRoute] Guid employeeId)
        {
            if (await employeeRepository.Exists(employeeId))
            {
                //delete employee
                var employee = await employeeRepository.DeleteEmployee(employeeId);
                return Ok(mapper.Map<Employee>(employee));
            }

            return NotFound();
        }

        [HttpPost]
        [Route("[controller]/Add")]
        public async Task<IActionResult> AddEmployeeAsync([FromBody] AddEmployeeRequest request)
        {
            var employee = await employeeRepository.AddEmployee(mapper.Map<DataModels.Employee>(request));
            return CreatedAtAction(nameof(GetEmployeeAsync), new { employeeId = employee.Id },
                mapper.Map<Employee>(employee));
        }

        [HttpGet]
        [Route("[controller]/View/{employeeId:guid}"), ActionName("GetSingleEmployeeAsync")]
        public async Task<IActionResult> GetSingleEmployeeAsync([FromRoute] Guid employeeId)
        {
            var employee = await GetEmployeeAsync(employeeId);
            return employee;
            /*//fetch employee information
            var employee = await employeeRepository.GetSingleEmployeeAsync(employeeId);
            if (employee == null)
            {
                return NotFound();
            }

            //convert this data model that we stored in the employee variable to a domain model and return it to the angular application
            return Ok(mapper.Map<Employee>(employee));*/
        }

        [HttpPost]
        [Route("[controller]/{employeeId:Guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromRoute] Guid employeeId, IFormFile profileImage)
        {
            //allowing these image formats
            var validExtensions = new List<string>
            {
                ".jpeg",
                ".png",
                ".jpg",
                ".gif",
                ".jfif"
            };

            //image validation
            if(profileImage != null && profileImage.Length > 0)
            {
                var extension = Path.GetExtension(profileImage.FileName);
                if (validExtensions.Contains(extension))
                {
                    //checking if employee exists
                    if (await employeeRepository.Exists(employeeId))
                    {
                        var fileName = Guid.NewGuid() + Path.GetExtension(profileImage.FileName);

                        //upload image to local storage
                        var fileImagePath = await imageRepository.Upload(profileImage, fileName);

                        //update profile image path in database
                        if (await employeeRepository.UpdateProfileImage(employeeId, fileImagePath))
                        {
                            return Ok(fileImagePath);
                        }
                        return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image");
                    }
                }
                //send 400 response
                return BadRequest("Invalid image format");
            }
            
            return NotFound();
        }
    }
}
