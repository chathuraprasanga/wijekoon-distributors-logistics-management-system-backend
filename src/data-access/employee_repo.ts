import { Employee, IEmployee } from "../models/employee_model";

export const createEmployee = async (
    employeeData: IEmployee
): Promise<IEmployee> => {
    try {
        const employee = new Employee(employeeData);
        console.log("EMPLOYEE CREATE");
        console.log(employee);
        await employee.save();
        return employee;
    } catch (error) {
        throw new Error(`Could not create employee: ${error}`);
    }
};

export const getEmployeeById = async (
    employeeId: string
): Promise<IEmployee | null> => {
    try {
        const employee = await Employee.findById(employeeId);
        return employee;
    } catch (error) {
        throw new Error(`Could not find employee: ${error}`);
    }
};

export const updateEmployeeById = async (
    employeeId: string,
    employeeData: Partial<IEmployee>
): Promise<IEmployee | null> => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            employeeId,
            employeeData,
            { new: true }
        );
        return employee;
    } catch (error) {
        throw new Error(`Could not update employee: ${error}`);
    }
};

export const deleteEmployeeById = async (employeeId: string): Promise<void> => {
    try {
        await Employee.findByIdAndDelete(employeeId);
    } catch (error) {
        throw new Error(`Could not delete employee: ${error}`);
    }
};

export const getAllEmployees = async (): Promise<IEmployee[]> => {
    try {
        const employees = await Employee.find()
            .populate({ path: "jobRole", model: "JobRole" })
            .exec();
        return employees;
    } catch (error) {
        throw new Error(`Could not get all employees: ${error}`);
    }
};

export const getLastEmployee = async (): Promise<IEmployee | null> => {
    try {
        const employees = await Employee.find().sort({ _id: -1 }).limit(1);
        return employees.length > 0 ? employees[0] : null;
    } catch (error) {
        throw new Error(`Could not get the last employee: ${error}`);
    }
};

export const searchEmployees = async (
    searchTerm: string
): Promise<IEmployee[]> => {
    try {
        const employees = await Employee.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { phone: { $regex: searchTerm, $options: "i" } },
                { email: { $regex: searchTerm, $options: "i" } },
            ],
        });
        return employees;
    } catch (error) {
        throw new Error(`Could not search employees: ${error}`);
    }
};

export const getEmployeesWithJobRoleDriverRepo = async () => {
    try {
        const employees = await Employee.find({ status: "ACTIVE" })
            .populate({
                path: "jobRole",
                match: { name: "Driver" },
            })
            .exec();

        // Filter out the employees where jobRole is null (in case there's no match)
        const employeesWithDriverRole = employees.filter((emp) => emp.jobRole);

        return employeesWithDriverRole;
    } catch (error) {
        console.error(
            "Error retrieving employees with job role Driver:",
            error
        );
        throw new Error("Could not retrieve employees with job role Driver");
    }
};
