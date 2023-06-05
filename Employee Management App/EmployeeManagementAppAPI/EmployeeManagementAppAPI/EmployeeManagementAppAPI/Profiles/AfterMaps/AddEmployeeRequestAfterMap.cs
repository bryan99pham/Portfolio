using AutoMapper;
using EmployeeManagementAppAPI.DomainModels;
using System;


namespace EmployeeManagementAppAPI.Profiles.AfterMaps
{
    public class AddEmployeeRequestAfterMap : IMappingAction<AddEmployeeRequest, DataModels.Employee>
    {
        public void Process(AddEmployeeRequest source, DataModels.Employee destination, ResolutionContext context)
        {
            destination.Id = Guid.NewGuid();
            destination.Address = new DataModels.Address()
            {
                Id = Guid.NewGuid(),
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress
            };
        }
    }
}
