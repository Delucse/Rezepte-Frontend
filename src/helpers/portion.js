import {
    pluralAlimentsDictionary,
    pluralUnitsAlimentDictionary,
    pluralUnitsDictionary,
    singularAlimentsDictionary,
    singularUnitsAlimentDictionary,
    singularUnitsDictionary,
    singularPortionsDictionary,
    pluralPortionsDictionary,
    singularInfoDictionary,
    pluralInfoDictionary,
    singularUnits,
    pluralUnits,
} from './dictionaries';

const calculateArea = (form) => {
    if (form.length > 1) {
        return form[0] * form[1];
    } else {
        return Math.PI * Math.pow(form[0] / 2, 2);
    }
};

export const getAmount = (amount, portion, settings) => {
    if (amount === 0) {
        return '';
    }
    var calculatedAmount =
        portion && settings
            ? amount * (settings.count / portion.count)
            : amount;
    if (portion && settings && portion.form) {
        calculatedAmount =
            calculatedAmount *
            (calculateArea(settings.form) / calculateArea(portion.form));
    }
    if (!settings || settings.rounded || !settings.hasOwnProperty('rounded')) {
        var int = amount.toString().split('.')[0];
        var decimal = amount.toString().split('.')[1];
        var intDigits = int && int.length === 1 ? 2 : int.length === 2 ? 1 : 0;
        var decimalDigits = decimal ? decimal.length + 1 : 0;
        return calculatedAmount.toLocaleString('de-De', {
            minimumFractionDigits: 0,
            maximumFractionDigits: Math.max(intDigits, decimalDigits),
        });
    }
    return calculatedAmount.toLocaleString('de-De', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
    });
};

export const getUnit = (amount, unit) => {
    if (amount === 1 || amount === 0) {
        if (pluralUnitsDictionary[unit]) {
            return pluralUnitsDictionary[unit];
        }
    } else {
        if (singularUnitsDictionary[unit]) {
            return singularUnitsDictionary[unit];
        }
    }
    return unit;
};

export const getUnitFromDescription = (amount, unit) => {
    if (amount === 1 || amount === 0) {
        var pluralIndex = pluralUnits.findIndex((u) =>
            u.description.toLowerCase().endsWith(`(${unit.toLowerCase()})`)
        );
        if (pluralIndex > -1) {
            unit = pluralUnits[pluralIndex].unit;
        }
        if (pluralUnitsDictionary[unit]) {
            return pluralUnitsDictionary[unit];
        }
    } else {
        var singularIndex = singularUnits.findIndex((u) =>
            u.description.toLowerCase().endsWith(`(${unit.toLowerCase()})`)
        );
        if (singularIndex > -1) {
            unit = singularUnits[singularIndex].unit;
        }
        if (singularUnitsDictionary[unit]) {
            return singularUnitsDictionary[unit];
        }
    }
    return unit;
};

export const getAliment = (amount, unit, aliment) => {
    if (amount === 0) {
        return aliment;
    } else if (amount === 1) {
        const singularInfo = singularUnitsAlimentDictionary[unit];
        if (singularInfo) {
            if (singularInfo === 'singular') {
                if (pluralAlimentsDictionary[aliment]) {
                    return pluralAlimentsDictionary[aliment];
                }
            } else {
                if (singularAlimentsDictionary[aliment]) {
                    return singularAlimentsDictionary[aliment];
                }
            }
        } else {
            if (pluralAlimentsDictionary[aliment]) {
                return pluralAlimentsDictionary[aliment];
            }
        }
    } else {
        const pluralInfo = pluralUnitsAlimentDictionary[unit];
        if (pluralInfo) {
            if (pluralInfo === 'singular') {
                if (pluralAlimentsDictionary[aliment]) {
                    return pluralAlimentsDictionary[aliment];
                }
            } else {
                if (singularAlimentsDictionary[aliment]) {
                    return singularAlimentsDictionary[aliment];
                }
            }
        } else {
            if (singularAlimentsDictionary[aliment]) {
                return singularAlimentsDictionary[aliment];
            }
        }
    }
    return aliment;
};

export const getPortion = (count, portion) => {
    if (count === 1) {
        if (pluralPortionsDictionary[portion]) {
            return pluralPortionsDictionary[portion];
        }
    } else {
        if (singularPortionsDictionary[portion]) {
            return singularPortionsDictionary[portion];
        }
    }
    return portion;
};

export const getInformationAbout = (amount, unit, aliment) => {
    if (amount === 0 || amount === 1) {
        const singularInfo = singularUnitsAlimentDictionary[unit];
        if (singularInfo) {
            if (singularInfo === 'singular') {
                return singularInfoDictionary[aliment];
            } else {
                return pluralInfoDictionary[aliment];
            }
        } else {
            return singularInfoDictionary[aliment];
        }
    } else {
        const pluralInfo = pluralUnitsAlimentDictionary[unit];
        if (pluralInfo) {
            if (pluralInfo === 'singular') {
                return singularInfoDictionary[aliment];
            } else {
                return pluralInfoDictionary[aliment];
            }
        } else {
            return pluralInfoDictionary[aliment];
        }
    }
};
