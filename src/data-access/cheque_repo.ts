import { Cheques, ICheques } from "../models/cheque_model";
import { Customer } from "../models/customer_model";

export const createChequeRepo = async (
    chequeData: Partial<ICheques>
): Promise<ICheques> => {
    const cheque = new Cheques(chequeData);
    return await cheque.save();
};

export const findChequeByIdRepo = async (
    id: string
): Promise<ICheques | null> => {
    return await Cheques.findById(id)
        .populate("customer")
        .populate("order")
        .exec();
};

export const updateChequeByIdRepo = async (
    id: string,
    updateData: Partial<ICheques>
): Promise<ICheques | null> => {
    return await Cheques.findByIdAndUpdate(id, updateData, {
        new: true,
    }).exec();
};

export const deleteChequeByIdRepo = async (
    id: string
): Promise<ICheques | null> => {
    const result = await Cheques.findByIdAndDelete(id).exec();
    if (result && result instanceof Cheques) {
        return result.toObject() as ICheques;
    }
    return null;
};

export const searchChequeRepo = async (criteria: {
    chequeNumber?: string;
    bank?: string;
    customerName?: string;
}): Promise<ICheques[]> => {
    const query: any = {};

    if (criteria.chequeNumber) {
        query.chequeNumber = criteria.chequeNumber;
    }

    if (criteria.bank) {
        query.bank = criteria.bank;
    }

    if (criteria.customerName) {
        const customers = await Customer.find({
            name: new RegExp(criteria.customerName, "i"),
        })
            .select("_id")
            .exec();

        const customerIds = customers.map((customer) => customer._id);
        query.customer = { $in: customerIds };
    }

    return await Cheques.find(query)
        .populate("customer")
        .populate("order")
        .exec();
};

export const findAllChequeRepo = async (): Promise<ICheques[]> => {
    return await Cheques.find()
        .populate({
            path: "customer",
            model: "Customer", // Specify the model name here
        })
        .populate({
            path: "order",
            model: "CustomerOrder", // Specify the model name here
        })
        .exec();
};

export const findAllPendingChequeRepo = async (): Promise<ICheques[]> => {
    return await Cheques.find({ status: "PENDING" })
        .populate({
            path: "customer",
            model: "Customer", // Specify the model name here
        })
        .populate({
            path: "order",
            model: "CustomerOrder", // Specify the model name here
        })
        .exec();
};
