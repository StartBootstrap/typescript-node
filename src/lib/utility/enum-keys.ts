export const enumKeys = <E>(e: E): (keyof E)[] => {
    return Object.keys(e) as (keyof E)[];
};
