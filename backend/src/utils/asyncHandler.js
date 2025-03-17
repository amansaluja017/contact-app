export const asyncHandler = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
        next();
    }
}