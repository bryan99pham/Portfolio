using AutoMapper;
using EmployeeManagementAppAPI.DomainModels;
using EmployeeManagementAppAPI.Profiles.AfterMaps;
using DataModels = EmployeeManagementAppAPI.DataModels;

namespace EmployeeManagementAppAPI.Profiles
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DataModels.Employee, Employee>()
                .ReverseMap();

            CreateMap<DataModels.Department, Department>()
                .ReverseMap();

            CreateMap<DataModels.Address, Address>()
                .ReverseMap();

            CreateMap<UpdateEmployeeRequest, DataModels.Employee>()
                .AfterMap<UpdateEmployeeRequestAfterMap>();

            CreateMap<AddEmployeeRequest, DataModels.Employee>()
                .AfterMap<AddEmployeeRequestAfterMap>();
        }
    }
}
