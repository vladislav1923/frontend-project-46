export const statuses = {
    added: 'added',
    removed: 'removed',
    unchanged: 'unchanged',
    changed: 'changed',
};

const comparator = (a, b) => {
    const fields = [];

    Object.entries(a).forEach(([key, value]) => {
        const bValue = b[key];

        if (bValue === undefined) {
            fields.push({
                key,
                value: value && typeof value === 'object'
                    ? comparator(value, value) : value,
                status: statuses.removed
            });
        } else if (value === bValue) {
            fields.push({
                key,
                value: value && typeof value === 'object'
                    ? comparator(value, value) : value,
                status: statuses.unchanged
            });
        } else if (typeof value === 'object' && typeof bValue === 'object') {
            fields.push({
                key,
                value: comparator(value, bValue),
                status: statuses.unchanged,
            });
        } else {
            fields.push({
                key,
                value: bValue && typeof bValue === 'object'
                    ? comparator(bValue, bValue) : bValue,
                oldValue: value && typeof value === 'object'
                    ? comparator(value, value) : value,
                status: statuses.changed,
            });
        }
    });

    Object.entries(b).forEach(([key, value]) => {
        const aValue = a[key];

        if (aValue === undefined) {
            fields.push({
                key,
                value: value && typeof value === 'object'
                    ? comparator(value, value) : value,
                status: statuses.added
            });
        }
    });

    return fields;
};

export default comparator;
