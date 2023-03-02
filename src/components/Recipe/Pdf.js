import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { snackbarMessage } from '../../actions/messageActions';

import {
    Page,
    Text,
    Image,
    View,
    Document,
    Svg,
    G,
    Path,
    pdf,
    Link,
    Font,
} from '@react-pdf/renderer';

import QRCode from 'qrcode';

import { saveAs } from 'file-saver';

import IconButton from '../IconButton';

import { useTheme } from '@mui/material';

import Icon from '@mdi/react';
import { mdiPrinter } from '@mdi/js';

import {
    singularUnitsAlimentDictionary,
    pluralUnitsAlimentDictionary,
    singularUnitsDictionary,
    pluralUnitsDictionary,
    singularAlimentsDictionary,
    pluralAlimentsDictionary,
    singularPortionsDictionary,
    pluralPortionsDictionary,
} from '../../data/dictionaries';

import LobsterTwoBold from '../../fonts/LobsterTwo-Bold.ttf';

Font.register({
    family: 'Lobster Two',
    fonts: [
        {
            src: LobsterTwoBold,
            format: 'truetype',
            fontWeight: 700,
        },
    ],
});

const msToReadableTime = (time) => {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const days = parseInt(time / day);
    const hours = parseInt((time - days * day) / hour);
    const minutes = parseInt((time - days * day - hours * hour) / minute);
    var title = '';
    if (days > 0) {
        title += `${days} ${days > 1 ? 'Tage' : 'Tag'}`;
    }
    if (hours > 0) {
        title += `${title !== '' ? ' ' : ''}${hours} ${
            hours > 1 ? 'Stunden' : 'Stunde'
        }`;
    }
    if (minutes > 0) {
        title += `${title !== '' ? ' ' : ''}${minutes} ${
            minutes > 1 ? 'Minuten' : 'Minute'
        }`;
    }
    return title;
};
const filename = (string) => {
    string = string.replace(/Ä/g, 'Ae');
    string = string.replace(/Ö/g, 'Oe');
    string = string.replace(/Ü/g, 'Ue');
    string = string.replace(/ä/g, 'ae');
    string = string.replace(/ö/g, 'oe');
    string = string.replace(/ü/g, 'ue');
    string = string.replace(/ß/g, 'ss');
    string = string.replace(/[^a-z0-9\s-]/gi, '').trim();
    string = string.replace(/(\s|-)/g, '_');
    return string;
};

const calculateArea = (form) => {
    if (form.length > 1) {
        return form[0] * form[1];
    } else {
        return Math.PI * Math.pow(form[0] / 2, 2);
    }
};

const getAmount = (amount, portion, settings) => {
    var calculatedAmount = amount * (settings.count / portion.count);
    if (portion.form) {
        calculatedAmount =
            calculatedAmount *
            (calculateArea(settings.form) / calculateArea(portion.form));
    }
    if (settings.rounded) {
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

const getUnit = (amount, unit) => {
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

const getAliment = (amount, unit, aliment) => {
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

const getPortion = (count, portion) => {
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

function Steps({ steps, style }) {
    return (
        <View style={[style, { flexDirection: 'column' }]}>
            {steps.map((step, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        marginBottom: 4,
                        width: '100%',
                        fontSize: '14pt',
                    }}
                >
                    <Text style={{ width: '30px', color: 'grey' }}>
                        {index + 1}.
                    </Text>
                    <Text style={{ flex: 1 }}>{step}</Text>
                </View>
            ))}
        </View>
    );
}

function Ingredients({ theme, ingredients, settings, portion, style }) {
    return (
        <View style={[style, { flexDirection: 'column' }]}>
            {ingredients.map((ingredient, index) => (
                <View
                    key={index}
                    style={{
                        fontSize: '14pt',
                        marginBottom:
                            index === ingredients.length - 1 ? 0 : '20px',
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 9,
                            textDecoration: 'underline',
                            textDecorationColor: theme.palette.primary.main,
                            fontFamily: 'Lobster Two',
                            fontWeight: 700,
                            fontSize: '15pt',
                        }}
                    >
                        {ingredient.title ? ingredient.title : 'Zutaten'}
                    </Text>
                    {ingredient.food.map((food, index) => {
                        const amountString = getAmount(
                            food.amount,
                            portion,
                            settings
                        );
                        const amount = Number(amountString.replace(',', '.'));
                        const unit = getUnit(amount, food.unit);
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 4,
                                    width: '100%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'grey',
                                        marginHorizontal: '8px',
                                    }}
                                >
                                    -
                                </Text>
                                <Text style={{ flex: 1 }}>
                                    {food.amount === 0
                                        ? ''
                                        : `${amountString} `}
                                    {unit === ' ' ? '' : `${unit} `}
                                    {getAliment(amount, unit, food.aliment)}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}

function Header({ theme, title, portion, time }) {
    return (
        <View
            fixed
            style={{
                marginBottom: '20px',
                paddingBottom: '3px',
                borderBottom: `2px solid ${theme.palette.primary.light}`,
            }}
        >
            <Text
                style={{
                    marginBottom: '3px',
                    fontFamily: 'Lobster Two',
                    fontWeight: 700,
                    fontSize: '25pt',
                    color: theme.palette.primary.main,
                }}
            >
                {title}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    color: 'grey',
                    fontSize: '14pt',
                }}
            >
                <Text>
                    {portion.count.toLocaleString()}{' '}
                    {portion.form
                        ? `${
                              portion.form.length > 1
                                  ? `${
                                        portion.form[0] < 15 ||
                                        portion.form[1] < 15
                                            ? `Kastenform${
                                                  portion.count !== 1
                                                      ? 'en'
                                                      : ''
                                              }`
                                            : `Backblech${
                                                  portion.count !== 1 ? 'e' : ''
                                              }`
                                    } ${portion.form[0]} cm x ${
                                        portion.form[1]
                                    } cm`
                                  : `Springform${
                                        portion.count !== 1 ? 'en' : ''
                                    } Ø ${portion.form[0]} cm`
                          }`
                        : portion.art
                        ? getPortion(portion.count, portion.art)
                        : `Portion${portion.count !== 1 ? 'en' : ''}`}
                </Text>
                {time.resting > 0 ? (
                    <Text style={{ marginRight: 8, marginLeft: 8 }}>|</Text>
                ) : null}
                {time.resting > 0 ? (
                    <View style={{ flexDirection: 'row' }}>
                        <Svg style={{ width: '14pt' }} viewBox="0 0 24 24">
                            <Path
                                fill="grey"
                                d="M21 13.35C20.36 13.13 19.7 13 19 13C19 9.13 15.87 6 12 6S5 9.13 5 13 8.13 20 12 20C12.37 20 12.72 19.96 13.08 19.91C13.18 20.6 13.4 21.25 13.71 21.83C13.16 21.94 12.59 22 12 22C7.03 22 3 17.97 3 13S7.03 4 12 4C14.12 4 16.07 4.74 17.62 6L19.04 4.56C19.55 5 20 5.46 20.45 5.97L19.03 7.39C20.26 8.93 21 10.88 21 13C21 13.12 21 13.23 21 13.35M11 14H13V8H11V14M15 1H9V3H15V1M19.63 16.5V21.5H21.5V16.5H19.63M16.5 21.5H18.38V16.5H16.5V21.5Z"
                            />
                        </Svg>
                        <Text> {msToReadableTime(time.resting)}</Text>
                    </View>
                ) : null}
                {time.baking > 0 ? (
                    <Text style={{ marginRight: 8, marginLeft: 8 }}>|</Text>
                ) : null}
                {time.baking > 0 ? (
                    <View style={{ flexDirection: 'row' }}>
                        <Svg style={{ width: '14pt' }} viewBox="0 0 24 24">
                            <Path
                                fill="grey"
                                d="M6,14H8L11,17H9L6,14M4,4H5V3A1,1 0 0,1 6,2H10A1,1 0 0,1 11,3V4H13V3A1,1 0 0,1 14,2H18A1,1 0 0,1 19,3V4H20A2,2 0 0,1 22,6V19A2,2 0 0,1 20,21V22H17V21H7V22H4V21A2,2 0 0,1 2,19V6A2,2 0 0,1 4,4M18,7A1,1 0 0,1 19,8A1,1 0 0,1 18,9A1,1 0 0,1 17,8A1,1 0 0,1 18,7M14,7A1,1 0 0,1 15,8A1,1 0 0,1 14,9A1,1 0 0,1 13,8A1,1 0 0,1 14,7M20,6H4V10H20V6M4,19H20V12H4V19M6,7A1,1 0 0,1 7,8A1,1 0 0,1 6,9A1,1 0 0,1 5,8A1,1 0 0,1 6,7M13,14H15L18,17H16L13,14Z"
                            />
                        </Svg>
                        <Text> {msToReadableTime(time.baking)}</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

function Footer({ theme, qr, id }) {
    return (
        <View
            fixed
            wrap
            style={{
                position: 'absolute',
                bottom: '1cm',
                left: '1cm',
                right: '1cm',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <View
                style={{
                    width: '100%',
                    height: '2cm',
                }}
            >
                <Svg
                    viewBox="0 0 190.262 51.884"
                    style={{
                        width: '3.5cm',
                    }}
                >
                    <G>
                        <Path
                            fill={theme.palette.primary.main}
                            d="M22.576,6.392v39.305c1.7,1.292,3.332,1.768,4.76,1.768c7.004,0,9.588-11.492,9.588-21.353c0-16.796-4.556-23.664-16.388-23.664c-8.228,0-15.368,5.236-15.368,14.076c0,5.236,2.652,7.004,3.74,7.752 C3.4,24.276,0,21.964,0,15.98C0,7.548,9.248,0,21.488,0c17.34,0,23.528,12.852,23.528,26.044c0,12.852-5.508,25.84-13.056,25.84c-2.72,0-5.78-1.224-9.384-3.943V51h-7.344V7.412L22.576,6.392z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M56.371,37.4c0.68,7.209,3.944,8.841,7.82,8.841c4.284,0,8.364-2.108,10.744-7.412h2.176c-2.312,6.664-8.772,12.58-15.708,12.58c-6.256,0-12.308-4.08-12.308-15.708c0-7.616,3.196-19.041,12.988-19.041c4.488,0,9.044,1.633,9.044,8.841C71.127,31.825,65.551,36.38,56.371,37.4z M66.775,24.82c0-3.399-1.224-4.828-3.4-4.828c-4.76,0-7.072,8.093-7.072,14.757C62.695,33.728,66.775,29.92,66.775,24.82z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M81.735,3.4v36.721c0,1.768,0.136,6.12,3.06,6.12c2.177,0,3.877-2.517,4.896-7.412h2.516c-2.04,11.355-6.46,12.58-9.451,12.58c-6.257,0-7.82-5.44-7.82-9.86V4.352L81.735,3.4z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M112.539,17v23.12c0,1.768,0.136,6.12,3.06,6.12c2.177,0,3.877-2.517,4.896-7.412h2.516c-2.04,11.355-6.46,12.58-9.452,12.58c-4.147,0-5.916-3.061-6.596-6.393c-1.7,4.42-4.76,6.393-7.82,6.393c-5.304,0-9.588-2.788-9.588-10.54V17h6.8v23.12c0,4.42,1.7,6.12,4.08,6.12c2.584,0,5.305-2.721,5.305-7.412V17H112.539z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M137.019,23.868c0-2.107-1.36-3.604-3.74-3.604c-4.896,0-6.393,7.956-6.393,14.416c0,9.521,3.604,11.561,8.024,11.561c4.76,0,8.024-2.38,10.336-7.412h2.313c-2.177,6.664-8.229,12.58-14.893,12.58c-6.256,0-12.988-4.08-12.988-15.845c0-7.548,2.313-18.904,12.58-18.904c5.712,0,8.772,2.856,8.772,8.16c0,2.244-0.884,4.013-2.652,4.013c-1.088,0-1.904-0.544-2.516-1.429C136.611,26.792,137.019,25.161,137.019,23.868z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M171.359,38.829c-2.584,3.604-5.509,5.848-8.093,7.684c-2.04,3.536-6.527,4.896-9.452,4.896c-7.956,0-10.132-5.645-10.132-10.064c0-2.38,1.088-4.216,2.448-4.964c2.38-6.732,5.032-13.464,5.712-20.128l6.868-1.36c4.284,17.272,5.576,20.196,5.645,27.132c1.495-1.02,2.924-2.176,4.147-3.195H171.359z M153.338,22.168c-0.544,5.032-2.584,9.52-3.944,14.416c0.816,0.544,1.496,1.496,1.496,2.992c0,1.699-1.088,2.651-2.176,2.651c-0.68,0-1.292-0.271-1.836-0.952c0.68,3.196,2.516,5.032,5.508,5.032c2.856,0,4.76-1.428,4.76-4.76 C157.146,35.972,155.854,34,153.338,22.168z"
                        />
                        <Path
                            fill={theme.palette.primary.main}
                            d="M174.962,37.4c0.68,7.209,3.944,8.841,7.82,8.841c2.924,0,5.644-0.885,7.344-3.332c0.068,0.611,0.136,1.224,0.136,1.7c0,4.079-4.556,6.8-9.588,6.8c-6.12,0-12.988-4.216-12.988-15.708c0-7.616,3.196-19.041,12.988-19.041c4.488,0,9.044,1.633,9.044,8.841C189.718,31.825,184.142,36.38,174.962,37.4z M185.367,24.82c0-3.399-1.225-4.828-3.4-4.828c-4.76,0-7.072,8.093-7.072,14.757C181.287,33.728,185.367,29.92,185.367,24.82z"
                        />
                    </G>
                </Svg>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: 12,
                        color: 'grey',
                    }}
                >
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `Seite ${pageNumber} von ${totalPages}  |  `
                        }
                    />
                    <Link
                        src={`${process.env.REACT_APP_BASE_URL}/rezepte/${id}${window.location.search}`}
                        style={{ color: 'grey', textDecoration: 'none' }}
                    >
                        <Text>{`${process.env.REACT_APP_BASE_URL}/rezepte/${id}`}</Text>
                    </Link>
                </View>
                <Image
                    style={{
                        width: '2cm',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    src={qr}
                />
            </View>
        </View>
    );
}

function PdfDocument({ theme, qr, recipe }) {
    const portion = {
        ...recipe.settings,
        art: recipe.portion.art,
    };

    return (
        <Document>
            <Page
                size="A4"
                style={{
                    padding: '1cm',
                    paddingBottom: '4cm',
                }}
            >
                <Header
                    theme={theme}
                    title={recipe.title}
                    portion={portion}
                    time={recipe.time}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Ingredients
                        theme={theme}
                        ingredients={recipe.ingredients}
                        portion={recipe.portion}
                        settings={recipe.settings}
                        style={{
                            width: '35%',
                            paddingRight: '10px',
                            borderRight: '1px',
                            borderRightStyle: 'solid',
                            borderRightColor: theme.palette.primary.light,
                        }}
                    />
                    <Steps
                        theme={theme}
                        steps={recipe.steps}
                        style={{
                            width: '65%',
                            paddingLeft: '20px',
                        }}
                    />
                </View>
                <Footer qr={qr} theme={theme} id={recipe.id} />
            </Page>
        </Document>
    );
}

function Pdf() {
    const theme = useTheme();

    const recipe = useSelector((state) => state.recipe);

    const dispatch = useDispatch();

    const generateQR = () => {
        try {
            return QRCode.toDataURL(
                `${process.env.REACT_APP_BASE_URL}/rezepte/${recipe.id}${window.location.search}`,
                {
                    type: 'svg',
                    margin: 0,
                    color: {
                        light: '#fff',
                        dark: theme.palette.primary.light,
                    },
                }
            );
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return (
        <IconButton
            tooltipProps={{
                title: 'PDF erstellen',
                placement: 'right',
            }}
            sx={{
                marginBottom: '25px',
                width: '24.8px',
                height: '23px',
                background: (theme) => theme.palette.action.hover,
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={async () => {
                const qr = await generateQR();
                const generatedPdf = pdf(
                    <PdfDocument theme={theme} qr={qr} recipe={recipe} />
                );
                const blob = await generatedPdf.toBlob();
                dispatch(
                    snackbarMessage(
                        'Deine angeforderte PDF wurde erfolgreich generiert.',
                        `pdf-${Date.now()}`
                    )
                );
                saveAs(blob, `${filename(recipe.title)}.pdf`);
            }}
        >
            <Icon path={mdiPrinter} size={1} />
        </IconButton>
    );
}

export default Pdf;
