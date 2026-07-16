export type RepositoryError = {
    type: 'repository';
    code: 'QUERY_FAILED';
    message: string;
    cause: unknown;
};