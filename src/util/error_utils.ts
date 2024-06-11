import { Error } from "mongoose";
const { ValidationError } = Error;

const getErrorMessage = (error) => {
    return error.message ? error.message : "Internal server error";
};

/**
 * Function to get the error object
 *
 * @param {Object} error - The error object
 *
 * @returns {Object} - The error object
 *
 */
export const getError = (error) => {
    let message = "";
    if (error instanceof ValidationError) {
        return { errorCode: 400, message: error.message };
    } else if (error.name === "MongoError" && error.code === 11000) {
        // Duplicate key error
        message = errorEnum.DUPLICATE_KEY + " " + error.message;
        return { errorCode: 400, message: "Duplicate entry has found" };
    } else {
        message = getErrorMessage(error);
        return { errorCode: 500, message };
    }
};

export const getValidationErrorMessage = (error) => {
    let message = "Validation has failed:";
    if (
        error.message.includes("Due date must be greater than the current date")
    ) {
        message = "Due date must be greater than the current date";
    } else if (
        error.message.includes(
            "Invalid thresholds provided. user count and threshold count does not match"
        )
    ) {
        message =
            "Invalid thresholds provided. user count and threshold count does not match";
    } else if (
        error.message.includes(
            "Invalid thresholds provided. Max threshold does not match"
        )
    ) {
        message = "Invalid thresholds provided. Max threshold does not match";
    }
    return message;
};

export const errorEnum = {
    DUPLICATE_KEY: "Duplicate key",
    INVALID_CUSTOMER: "Customer is not valid",
    INVALID_SUPPLIER: "Supplier is not valid",
    INVALID_PRODUCT: "Product is not valid",
    INVALID_CUSTOMER_ORDER_REQUEST: "Customer order request is not valid",
    INVALID_CUSTOMER_ORDER: "Customer order is not valid",
    INVALID_VEHICLE: "Vehicle is not valid",
    INVALID_EMPLOYEE: "Employee is not valid",
    INVALID_TRIP: "Trip is not valid",
    INVALID_WAREHOUSE: "Warehouse is not valid",
    INVALID_SUPPLIER_ORDER_REQUEST: "Supplier order request is not valid",
    INVALID_SUPPLIER_ORDER: "Supplier order is not valid",
};
