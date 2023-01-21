import units from './units.json';
import aliments from './aliments.json';
import portions from './portions.json';

export const singularUnits = units
    .map((unit) => {
        return {
            description: `${unit.singular ? unit.singular : unit.plural}${
                unit.information ? ` (${unit.information})` : ''
            }`,
            unit: unit.singular ? unit.singular : unit.plural,
            group: unit.group,
        };
    })
    .sort(
        (a, b) => a.group.localeCompare(b.group) || a.unit.localeCompare(b.unit)
    );
export const pluralUnits = units
    .map((unit) => {
        return {
            description: `${unit.plural ? unit.plural : unit.singular}${
                unit.information ? ` (${unit.information})` : ''
            }`,
            unit: unit.plural ? unit.plural : unit.singular,
            group: unit.group,
        };
    })
    .sort(
        (a, b) => a.group.localeCompare(b.group) || a.unit.localeCompare(b.unit)
    );

export const singularAliments = aliments
    .map((aliment) => {
        return {
            aliment: aliment.singular ? aliment.singular : aliment.plural,
            group: aliment.group,
        };
    })
    .sort(
        (a, b) =>
            a.group.localeCompare(b.group) || a.aliment.localeCompare(b.aliment)
    );
export const pluralAliments = aliments
    .map((aliment) => {
        return {
            aliment: aliment.plural ? aliment.plural : aliment.singular,
            group: aliment.group,
        };
    })
    .sort(
        (a, b) =>
            a.group.localeCompare(b.group) || a.aliment.localeCompare(b.aliment)
    );

export const singularPortions = portions
    .map((portion) => {
        return {
            portion: portion.singular ? portion.singular : portion.plural,
            group: portion.group,
        };
    })
    .sort(
        (a, b) =>
            a.group.localeCompare(b.group) || a.portion.localeCompare(b.portion)
    );

export const pluralPortions = portions
    .map((portion) => {
        return {
            portion: portion.plural ? portion.plural : portion.singular,
            group: portion.group,
        };
    })
    .sort(
        (a, b) =>
            a.group.localeCompare(b.group) || a.portion.localeCompare(b.portion)
    );

export const singularUnitsDictionary = {};
export const pluralUnitsDictionary = {};
units.forEach((unit) => {
    singularUnitsDictionary[unit.singular ? unit.singular : unit.plural] =
        unit.plural ? unit.plural : unit.singular;
    pluralUnitsDictionary[unit.plural ? unit.plural : unit.singular] =
        unit.singular ? unit.singular : unit.plural;
});

export const singularAlimentsDictionary = {};
export const pluralAlimentsDictionary = {};
aliments.forEach((aliment) => {
    singularAlimentsDictionary[
        aliment.singular ? aliment.singular : aliment.plural
    ] = aliment.plural ? aliment.plural : aliment.singular;
    pluralAlimentsDictionary[
        aliment.plural ? aliment.plural : aliment.singular
    ] = aliment.singular ? aliment.singular : aliment.plural;
});

export const singularPortionsDictionary = {};
export const pluralPortionsDictionary = {};
portions.forEach((portion) => {
    singularPortionsDictionary[
        portion.singular ? portion.singular : portion.plural
    ] = portion.plural ? portion.plural : portion.singular;
    pluralPortionsDictionary[
        portion.plural ? portion.plural : portion.singular
    ] = portion.singular ? portion.singular : portion.plural;
});

export const singularUnitsAlimentDictionary = {};
export const pluralUnitsAlimentDictionary = {};
units.forEach((unit) => {
    if (unit.aliment) {
        singularUnitsAlimentDictionary[
            unit.singular ? unit.singular : unit.plural
        ] = unit.aliment;
        pluralUnitsAlimentDictionary[
            unit.plural ? unit.plural : unit.singular
        ] = unit.aliment;
    }
});

export const singularInfoDictionary = {};
export const pluralInfoDictionary = {};
aliments.forEach((aliment) => {
    singularInfoDictionary[
        aliment.singular ? aliment.singular : aliment.plural
    ] = aliment.information;
    pluralInfoDictionary[aliment.plural ? aliment.plural : aliment.singular] =
        aliment.information;
});
