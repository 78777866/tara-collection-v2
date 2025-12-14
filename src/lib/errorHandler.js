/**
 * Standardized error handler for API calls and async operations.
 * 
 * @param {Error|Object} error - The error object to handle
 * @param {string} context - Optional context string (e.g., 'Fetching logic')
 * @returns {string} - A user-friendly error message
 */
export const handleError = (error, context = '') => {
    // Log the full error to console for debugging
    console.error(`Error ${context ? `in ${context}` : ''}:`, error)

    // Check for Supabase specific errors
    if (error?.code) {
        switch (error.code) {
            case '42P17': // Infinite recursion (RLS policy)
                return 'Access policy error. Please contact support.'
            case '23505': // Unique violation
                return 'This record already exists.'
            case '42501': // RLS permission denied
                return 'You do not have permission to perform this action.'
            case 'PGRST116': // JSON object result expected but no rows found
                return 'Resource not found.'
            default:
                return error.message || 'An unexpected database error occurred.'
        }
    }

    // Network errors
    if (error?.message === 'Failed to fetch') {
        return 'Network connection lost. Please check your internet connection.'
    }

    // Default fallback
    return error?.message || 'Something went wrong. Please try again.'
}

/**
 * Wrapper for async functions to automatically handle errors
 * @param {Function} asyncFn - The async function to wrap
 * @param {Function} onError - Optional callback for error handling
 */
export const withErrorHandling = async (asyncFn, onError) => {
    try {
        return await asyncFn()
    } catch (error) {
        const message = handleError(error)
        if (onError) onError(message, error)
        throw error // Re-throw so the caller knows it failed
    }
}
