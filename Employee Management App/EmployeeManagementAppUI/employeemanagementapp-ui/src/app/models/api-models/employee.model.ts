import { Address } from "./address.model";
import { Department } from "./department.model";

export interface Employee {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  email: string,
  mobile: number,
  profileImageURL: string,
  departmentId: string,
  department: Department,
  address: Address
}
