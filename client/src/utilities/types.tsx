export type transition = {
    name: string;
    from:string;
    to:string;
}

export type updateFunctions = {
    initial:Function;
    labels:Function;
    status:Function;
    transition:Function;
}

export type labelsType = {
    orphan:string[],
    final:string[]
}

export type variables = {
    initial:string;
    labels: labelsType;
    status: string[];
    transition:transition[]
}