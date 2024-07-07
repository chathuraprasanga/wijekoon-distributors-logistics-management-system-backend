import { IEmail } from "../models/email_model";
import * as emailRepo from "../data-access/email_repo";
import nodemailer from "nodemailer";

export const createEmail = async (data: IEmail): Promise<IEmail | null> => {
    try {
        const result = await emailRepo.createEmailRepo(data);
        if (result) {
            await sendEmail(data); // Send the email after saving to the repository
        } else {
            throw new Error("Email not saved");
        }
        return result;
    } catch (error) {
        console.error("Service: Failed to create email", error);
        throw error;
    }
};

export const getAllEmails = async (): Promise<IEmail[]> => {
    try {
        const result = await emailRepo.getAllEmails();
        return result;
    } catch (error) {
        console.error("Service: Failed to get all emails", error);
        throw error;
    }
};

export const updateEmail = async (
    id: Partial<IEmail>,
    updateData: Partial<IEmail>
): Promise<IEmail | null> => {
    try {
        const result = await emailRepo.updateEmailRepo(id, updateData);
        return result;
    } catch (error) {
        console.error("Service: Failed to update email", error);
        throw error;
    }
};

export const sendEmail = async (emailData: IEmail): Promise<void> => {
    // Create a reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wijekoondistributor@gmail.com",
            pass: "hnzz wasj oiho lsrb", // Make sure to replace with your actual password
        },
    });

    // Setup email data with unicode symbols
    const mailOptions = {
        from: `You have new email`, // sender address
        to: "wijekoondistributor@gmail.com",
        subject: emailData.subject,
        // text: emailData.message,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <div style="background-color: #f4f4f4; padding: 20px;">
                    <h2 style="color: #333;">New Contact Us Message</h2>
                    <p style="color: #555;">You have received a new message from the contact us page.</p>
                    <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd;">
                        <p style="color: #333;"><strong>Name:</strong> ${emailData.name}</p>
                        <p style="color: #333;"><strong>Email:</strong> ${emailData.email}</p>
                        <p style="color: #333;"><strong>Subject:</strong> ${emailData.subject}</p>
                        <p style="color: #333;"><strong>Message:</strong></p>
                        <p style="color: #555;">${emailData.message}</p>
                    </div>
                    <p style="color: #777;">This email was sent from the contact us page on your website.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
};
