export type Result<T, E> =
    | { success: true; data: T } 
    | { success: false; error: E };

// Why never?
// Means a success contains no errors and a failure contains no data. No need for a unused parameter
export function successResult<T>(
    data: T
): Result<T, never> {
    return {
        success: true,
        data
    };
}

export function failureResult<E>(
    error: E
): Result<never, E> {
    return {
        success: false,
        error
    };
}

export function handleResult<T, E>(
    result: Result<T, E>,
    onSuccess: (data: T) => void,
    onFailure: (error: E) => void
): void {
    if (result.success) {
        onSuccess(result.data);
        return;
    }

    onFailure(result.error);
}
