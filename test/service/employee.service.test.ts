import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";

describe("Employee service", () => {
  let employeerepository: EmployeeRepository;
  let employeeservice: EmployeeService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeerepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeservice = new EmployeeService(employeerepository);
  });

  it("should return allEmployees", async () => {
    const mock = jest.fn(employeerepository.find).mockResolvedValue([]);
    employeerepository.find = mock;

    const users = await employeeservice.getAllEmployee();

    expect(users).toEqual([2]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should return employees with ID", async () => {
    const mock = jest
      .fn(employeerepository.findOneBy)
      .mockResolvedValue({ id: 1, name: "sample" } as Employee);
    employeerepository.findOneBy = mock;

    const users = await employeeservice.getEmployeeById(1);
    expect(users?.name).toEqual("sample");
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
