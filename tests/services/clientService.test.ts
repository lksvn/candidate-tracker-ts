import { describe, expect, it } from "vitest";
import { Client } from "../../src/domain/client";
import { createClient, getClientById, updateClient } from "../../src/services/clientService";


const clients: Client[] = [
    { id: '1', name: 'Ana Costa' },
    { id: '2', name: 'Rafael Oliveira' },
    { id: '3', name: 'Juliana Mendes' }
];

describe('getClientById', () => {
    it('returns the selected client', () => {
        expect(getClientById(clients, '1')).toEqual(
            { id: '1', name: 'Ana Costa' }
        );
    });

    it('returns undefined when no client matches', () => {
        expect(getClientById(clients, '55')).toBeUndefined();
    });
});

describe('createClient', () => {
    it('creates a client with the provided id', () => {
        const input: Omit<Client, 'id'> = {
            name: 'New Client',
            email: 'test@test.com'
        };

        expect(createClient('new-client-1', input)).toEqual({
            id: 'new-client-1',
            name: 'New Client',
            email: 'test@test.com'
        });
    });
});

describe('updateClient', () => {
    it('updates only the provided client fields', () => {
        const input: Partial<Omit<Client, 'id'>> = {
            email: 'test@yahoo.com'
        };

        expect(updateClient(clients[0], input)).toEqual({
            id: '1',
            name: 'Ana Costa',
            email: 'test@yahoo.com'
        });
    });
});