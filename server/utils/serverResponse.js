// Utility function to standardize server responses
// - sendResponse: Sends a standardized JSON response with the given status, message, and data

export const serverResponse = (res, status = 200, message = '') => res.status(status).json(message).end();