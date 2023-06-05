using AutoMapper;
using EmployeeManagementAppAPI.DomainModels;
using DataModels = EmployeeManagementAppAPI.DataModels;

namespace EmployeeManagementAppAPI.Profiles.AfterMaps
{
    public class UpdateEmployeeRequestAfterMap : IMappingAction<UpdateEmployeeRequest, DataModels.Employee>
    {
        public void Process(UpdateEmployeeRequest source, DataModels.Employee destination, ResolutionContext context)
        {
            destination.Address = new DataModels.Address()
            {
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress
            };

            /*destination.Department = new DataModels.Department()
            {
                DepartmentId = source.DepartmentId,
                DepartmentName = source.DepartmentName
            };*/
        }
    }
}
