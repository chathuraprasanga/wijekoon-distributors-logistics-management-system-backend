import {
    createSupplierOrderRepo,
    getSupplierOrderByIdRepo,
    updateSupplierOrderRepo,
    deleteSupplierOrderRepo,
    getAllSupplierOrdersRepo,
    searchSupplierOrdersByOrderIdRepo,
    searchSupplierOrdersBySupplierNameRepo,
} from "../data-access/supplier_order_repo";
import { getLastEnteredTripId } from "../data-access/trip_repo";
import { ISupplierOrder } from "../models/supplier_order_model";
import {
    getSupplierOrderRequestByIdService,
    updateSupplierOrderRequestService,
} from "./supplier_order_request_service";
import { createSupplierPaymentService } from "./supplier_payment_service";
import { createTrip } from "./trip_service";

export const createSupplierOrderService = async (
    supplierOrderData: Partial<any>
): Promise<any> => {
    try {
        const payload = supplierOrderData;
        // update supplier order request
        const supplierOrderRequest = getSupplierOrderRequestByIdService(
            payload.supplierOrderRequest
        );
        const supplierOrderRequestPaylod = {
            ...supplierOrderRequest,
            order: payload.order,
            totalQuantity: payload.totalQuantity,
            totalSize: payload.totalSize,
            netTotal: payload.netTotal,
            subTotal: payload.subTotal,
            totalTax: payload.totalTax,
            totalDiscount: payload.totalDiscount,
            status: "COMPLETED",
        };
        const updatedOrderRequest = await updateSupplierOrderRequestService(
            payload.supplierOrderRequest,
            supplierOrderRequestPaylod
        );

        if (!updatedOrderRequest) {
            throw new Error("Unable to Update Supplier Order Request");
        }

        const supplierOrder = await createSupplierOrderRepo(supplierOrderData);
        if (!supplierOrder) {
            throw new Error("Unable to create Supplier Order");
        }

        // create supplier payments
        const paymentPayload = {
            ...payload.paymentDetails,
            supplierOrder: supplierOrder._id,
        };
        const createdSupplierPayment = await createSupplierPaymentService(
            paymentPayload
        );
        if (!createdSupplierPayment) {
            throw new Error("Unable to create Supplier Payment");
        }

        // create Trip
        const tripDetails = payload.tripDetails;
        const tripPayload = {
            supplierOrder: supplierOrder._id,
            tripId: await generateTripId(),
            date: tripDetails.date,
            vehicle: tripDetails.vehicle,
            driver: tripDetails.driver,
            products: payload.order.length,
            quantity: payload.totalQuantity,
            purpose: (await supplierOrderRequest).purpose,
            status: "ACTIVE",
        };
        const createdTrip = await createTrip(tripPayload);
        if (!createdTrip) {
            throw new Error("Cannot be created trip");
        }

        return {
            updatedOrderRequest,
            supplierOrder,
            createdSupplierPayment,
            createdTrip,
        };
    } catch (error) {
        throw new Error(`Error creating supplier order: ${error.message}`);
    }
};

const generateTripId = async () => {
    const lastVehicleId = await getLastEnteredTripId();
    const lastId = lastVehicleId ? parseInt(lastVehicleId.split("-")[1]) : 0;
    const newId = (lastId + 1).toString().padStart(3, "0");
    return `WDT-${newId}`;
};

export const getSupplierOrderByIdService = async (
    id: string
): Promise<ISupplierOrder | null> => {
    try {
        return await getSupplierOrderByIdRepo(id);
    } catch (error) {
        throw new Error(`Error getting supplier order by ID: ${error.message}`);
    }
};

export const updateSupplierOrderService = async (
    id: string,
    updateData: Partial<ISupplierOrder>
): Promise<ISupplierOrder | null> => {
    try {
        return await updateSupplierOrderRepo(id, updateData);
    } catch (error) {
        throw new Error(`Error updating supplier order: ${error.message}`);
    }
};

export const deleteSupplierOrderService = async (
    id: string
): Promise<ISupplierOrder | null> => {
    try {
        return await deleteSupplierOrderRepo(id);
    } catch (error) {
        throw new Error(`Error deleting supplier order: ${error.message}`);
    }
};

export const getAllSupplierOrdersService = async (): Promise<
    ISupplierOrder[]
> => {
    try {
        return await getAllSupplierOrdersRepo();
    } catch (error) {
        throw new Error(`Error getting all supplier orders: ${error.message}`);
    }
};

export const searchSupplierOrdersByOrderIdService = async (
    orderId: string
): Promise<ISupplierOrder[]> => {
    try {
        return await searchSupplierOrdersByOrderIdRepo(orderId);
    } catch (error) {
        throw new Error(
            `Error searching supplier orders by order ID: ${error.message}`
        );
    }
};

export const searchSupplierOrdersBySupplierNameService = async (
    supplierName: string
): Promise<ISupplierOrder[]> => {
    try {
        return await searchSupplierOrdersBySupplierNameRepo(supplierName);
    } catch (error) {
        throw new Error(
            `Error searching supplier orders by supplier name: ${error.message}`
        );
    }
};
