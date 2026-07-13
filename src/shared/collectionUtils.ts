type WithId = {
    id: string;
};

// T is the object type
// K is a property name that exists on T
// T[K] is a value that matches the type of that property

export function findById<T extends WithId>(items: T[], id: string): T | undefined {
    return items.find((item) => item.id === id);
}

export function filterByProperty<T, K extends keyof T>(items: T[], property: K, value: T[K]): T[] {
    return items.filter((item) => item[property] === value);
}
