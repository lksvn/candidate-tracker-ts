export type AsyncResult<T> = 
    | { success: true; data: T } 
    | { success: false; error: string };

export function successResult<T>(data: T): AsyncResult<T> {
    return {
        success: true,
        data
    };
}

export function failureResult<T>(error: string): AsyncResult<T> {
    return {
        success: false,
        error
    };
}

export function handleResult<T>(
    result: AsyncResult<T>,
    onSuccess: (data: T) => void,
    onFailure: (error: string) => void
): void {
    if (result.success) {
        onSuccess(result.data);
        return;
    }

    onFailure(result.error);
}
