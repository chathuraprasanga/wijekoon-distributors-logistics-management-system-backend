export const getWelcomeMessage = (req, res) => {
    res.send(`Wijekoon Distributors API Server Running on - ${process.env.NODE_ENV} Mode`);
};
