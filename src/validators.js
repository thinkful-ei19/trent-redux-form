export const required = value => value ? undefined : 'Required';

export const nonEmpty = value => value.trim() ? undefined : 'Must have text';

export const numberLength = value => value.length === 5 ? undefined : 'Tracking Number Must have 5 numbers';

export const mustBeNumber = value => !isNaN(value) ? undefined : 'Field can only include numbers';