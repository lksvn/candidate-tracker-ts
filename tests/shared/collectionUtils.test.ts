import { describe, expect, it } from "vitest";
import { findById, filterByProperty } from "../../src/shared/collectionUtils";

type TestItem = {
    id: string;
    name: string;
    status?: string;
    model?: string;
};

describe('findById', () => {
    const items: TestItem[] = [
        { id: "1", name: "First item" },
        { id: "2", name: "Second item" }
    ];

    it("returns the item with the matching id", () => {
        expect(findById(items, "2")).toEqual({ id: "2", name: "Second item" });
    });
    
    it("returns undefined when no item matches", () => {
        expect(findById(items, "999")).toBeUndefined();
    });
});

describe('filterByProperty', () => {
    const items: TestItem[] = [
        { id: "1", name: "First item", status: "new", model: "remote" },
        { id: "2", name: "Second item", status: "contacted", model: "remote" },
        { id: "2", name: "Second item", status: "lost", model: "on-site" }
    ];

    it("returns multiple items when more than one item matches", () => {
        expect(filterByProperty(items, "model", "remote")).toEqual([
            { id: "1", name: "First item", status: "new", model: "remote" },
            { id: "2", name: "Second item", status: "contacted", model: "remote" }
        ]);
    });

    it("returns an empty array when no items match", () => {
        expect(filterByProperty(items, "status", "accepted")).toEqual([]);
    });
});