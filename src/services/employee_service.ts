import {
    createEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    getAllEmployees,
    searchEmployees,
    getLastEmployee,
    getEmployeesWithJobRoleDriverRepo,
} from "../data-access/employee_repo";
import { getUserByEmail } from "../data-access/user_repo";
import { IEmployee } from "../models/employee_model";
import { createUserService, updateUserService } from "./user_service";

export const createEmployeeService = async (data: any): Promise<IEmployee> => {
    try {
        const lastEmployee = await getLastIndexEmployeeService();
        const lastEmployeeId = lastEmployee?.employeeId;
        const employeeId = await generateEmployeeID(lastEmployeeId);
        const payload = { ...data, employeeId };
        const role =
            typeof payload.jobRole === "string"
                ? payload.jobRole
                : JSON.stringify(payload.jobRole);
        await createUserService({
            fullName: payload.name,
            email: payload.email,
            isFirstLogin: true,
            role: role,
            status: "ACTIVE",
            isSuperAdmin: false,
        });
        return await createEmployee(payload);
    } catch (error) {
        throw new Error(`Failed to create employee: ${error}`);
    }
};

export const generateEmployeeID = async (
    lastEmployeeId: string | null
): Promise<string> => {
    const lastId = lastEmployeeId ? parseInt(lastEmployeeId.split("-")[1]) : 0;
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDE-${newId}`;
};

export const getEmployeeByIdService = async (
    employeeId: string
): Promise<IEmployee | null> => {
    try {
        return getEmployeeById(employeeId);
    } catch (error) {
        throw new Error(`Could not find employee: ${error}`);
    }
};

export const updateEmployeeByIdService = async (
    employeeId: string,
    employeeData: Partial<IEmployee>
): Promise<IEmployee | null> => {
    try {
        // Fetch the user associated with the employee email
        const userPayload = await getUserByEmail(employeeData.email);
        if (!userPayload) {
            throw new Error(`User with email ${employeeData.email} not found`);
        }

        // Prepare the new payload for updating the user
        const newPayload = {
            email: employeeData.email,
            fullName: employeeData.name,
            role: employeeData.jobRole.toString(), // Ensure role is a string
            status: employeeData.status,
            isSuperAdmin: userPayload.isSuperAdmin,
            isFirstLogin: userPayload.isFirstLogin,
        };

        // Update the user
        await updateUserService(userPayload._id, newPayload);

        // Update the employee
        const updatedEmployee = await updateEmployeeById(
            employeeId,
            employeeData
        );
        if (!updatedEmployee) {
            throw new Error(`Employee with ID ${employeeId} not found`);
        }

        return updatedEmployee;
    } catch (error) {
        throw new Error(`Failed to update employee: ${error.message}`);
    }
};

export const deleteEmployeeByIdService = async (
    employeeId: string
): Promise<void> => {
    try {
        await deleteEmployeeById(employeeId);
    } catch (error) {
        throw new Error(`Could not delete employee: ${error}`);
    }
};

export const getAllEmployeesService = async (): Promise<IEmployee[]> => {
    try {
        return getAllEmployees();
    } catch (error) {
        throw new Error(`Could not get all employees: ${error}`);
    }
};

export const searchEmployeesService = async (
    searchTerm: string
): Promise<IEmployee[]> => {
    try {
        return searchEmployees(searchTerm);
    } catch (error) {
        throw new Error(`Could not search employees: ${error}`);
    }
};

export const getLastIndexEmployeeService =
    async (): Promise<IEmployee | null> => {
        try {
            return await getLastEmployee();
        } catch (error) {
            throw new Error(`Failed to get last index employee: ${error}`);
        }
    };

export const getEmployeesWithJobRoleDriverService = async () => {
    try {
        const employees = await getEmployeesWithJobRoleDriverRepo();
        return employees;
    } catch (error) {
        console.error(
            "Service error retrieving employees with job role Driver:",
            error
        );
        throw new Error(
            "Service error: Could not retrieve employees with job role Driver"
        );
    }
};
