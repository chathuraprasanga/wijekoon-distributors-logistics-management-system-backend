import { Email, IEmail } from "../models/email_model";

export const createEmailRepo = async (data: IEmail): Promise<IEmail | null> => {
    try {
        const result = await Email.create(data);
        return result;
    } catch (error) {
        console.error("Failed to create email:", error);
        throw error;
    }
};

export const getAllEmails = async () => {
    try {
        const result = await Email.find();
        return result;
    } catch (error) {
        console.error("Failed to get all email:", error);
        throw error;
    }
};

export const updateEmailRepo = async (
    id: Partial<IEmail>,
    updateData: Partial<IEmail>
): Promise<IEmail | null> => {
    try {
        console.log(updateData);
        const result = await Email.findOneAndUpdate({ _id: id }, updateData, { new: true });
        return result;
    } catch (error) {
        console.error("Failed to update email:", error);
        throw error;
    }
};

