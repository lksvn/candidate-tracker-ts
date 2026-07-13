import { Client } from "../domain/client";
import { findById } from "../shared/collectionUtils";

type CreateClientInput = Omit<Client, 'id'>;
type UpdateClientInput = Partial<Omit<Client, 'id'>>;

export function getClientById(clients: Client[], id: string): Client | undefined {
    return findById(clients, id);
}

export function createClient(id: string, input: CreateClientInput): Client {
    return {
        id,
        ...input
    };
}

export function updateClient(client: Client, input: UpdateClientInput): Client {
    return {
        ...client,
        ...input
    };
}