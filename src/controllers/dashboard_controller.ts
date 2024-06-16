import { getSummaryDetailsService } from "../services/dashboard_service";

export const getSummaryDetailsController = async (req, res) => {
    try {
        const summaryDetails = await getSummaryDetailsService(); // Ensure this is awaited
        res.status(200).json(summaryDetails);
    } catch (error) {
        console.error("Error retrieving summary details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
