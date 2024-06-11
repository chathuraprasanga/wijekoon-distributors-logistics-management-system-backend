import { Request, Response } from "express";
import {
    createEmployeeService,
    getEmployeeByIdService,
    updateEmployeeByIdService,
    deleteEmployeeByIdService,
    getAllEmployeesService,
    searchEmployeesService,
    getEmployeesWithJobRoleDriverService,
} from "../services/employee_service";
import { IEmployee } from "../models/employee_model";

export const createEmployeeController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employeeData: IEmployee = req.body;
        const newEmployee = await createEmployeeService(employeeData);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employeeId: string = req.params.id;
        const employee = await getEmployeeByIdService(employeeId);
        if (!employee) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployeeByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employeeId: string = req.params.id;
        const employeeData: Partial<IEmployee> = req.body;
        console.log("UPDATE EMPLOYEE");
        console.log(employeeId, employeeData);
        const updatedEmployee = await updateEmployeeByIdService(
            employeeId,
            employeeData
        );
        if (!updatedEmployee) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEmployeeByIdController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employeeId: string = req.params.id;
        await deleteEmployeeByIdService(employeeId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllEmployeesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const employees = await getAllEmployeesService();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchEmployeesController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const searchTerm: string = req.query.q as string;
        const employees = await searchEmployeesService(searchTerm);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeesWithJobRoleDriverController = async (
    req: Request,
    res: Response
) => {
    try {
        const employees = await getEmployeesWithJobRoleDriverService();
        res.status(200).json({
            success: true,
            data: employees,
        });
    } catch (error) {
        console.error(
            "Controller error retrieving employees with job role Driver:",
            error
        );
        res.status(500).json({
            success: false,
            message: "Could not retrieve employees with job role Driver",
        });
    }
};
