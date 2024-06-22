import * as ChequeRepository from "../data-access/cheque_repo";
import { findAllPendingChequeRepo, getAllChequesByCustomerIdRepo } from "../data-access/cheque_repo";
import { ICheques } from "../models/cheque_model";

export const createChequeService = async (
    chequeData: Partial<ICheques>
): Promise<ICheques> => {
    try {
        return await ChequeRepository.createChequeRepo(chequeData);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const getChequeByIdService = async (id: string): Promise<ICheques | null> => {
    try {
        return await ChequeRepository.findChequeByIdRepo(id);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const updateChequeByIdService = async (
    id: string,
    updateData: Partial<ICheques>
): Promise<ICheques | null> => {
    try {
        return await ChequeRepository.updateChequeByIdRepo(id, updateData);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const deleteChequeByIdService = async (
    id: string
): Promise<ICheques | null> => {
    try {
        return await ChequeRepository.deleteChequeByIdRepo(id);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const searchChequesService = async (criteria: {
    chequeNumber?: string;
    bank?: string;
    customerName?: string;
}): Promise<ICheques[]> => {
    try {
        return await ChequeRepository.searchChequeRepo(criteria);
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const getAllChequesService = async (): Promise<ICheques[]> => {
    try {
        return await ChequeRepository.findAllChequeRepo();
    } catch (error) {
        throw new Error(`Unable to create permission: ${error.message}`);
    }
};

export const getAllPendingChequesService = async (): Promise<ICheques[]> => {
    try {
        const pendingCheques = await findAllPendingChequeRepo();
        return pendingCheques;
    } catch (error) {
        throw new Error(`Failed to retrieve pending cheques: ${error.message}`);
    }
};

export const getAllChequesByCustomerIdService = async (customerId: string): Promise<ICheques[]> => {
    try {
        return await getAllChequesByCustomerIdRepo(customerId);
    } catch (error) {
        throw new Error(`Service Error: Unable to retrieve cheques for customer ID ${customerId}: ${error.message}`);
    }
};
