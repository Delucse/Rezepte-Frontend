import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import Link from '../components/Link';
import IconButton from '../components/IconButton';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import Icon from '@mdi/react';
import {
    mdiSilverwareVariant,
    mdiPencilOutline,
    mdiPrinter,
    mdiPot,
    mdiHeartOutline,
    mdiDotsVertical,
    mdiSortAscending,
    mdiCameraPlus,
    mdiContentSave,
} from '@mdi/js';

import params from '../data/params.json';
import Button from '../components/Button';

function Accordion(props) {
    return (
        <MuiAccordion
            id={props.id}
            expanded={props.expanded}
            onChange={props.onChange}
            disableGutters
            elevation={0}
            square
            sx={{
                '&:not(:last-child)': {
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                },
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<Icon path={mdiSilverwareVariant} size={1} />}
                sx={{
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                        marginLeft: (theme) => theme.spacing(1),
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        color: (theme) => theme.palette.action.disabled,
                        transform: 'rotate(-45deg)',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(0deg)',
                    },
                    '&:hover': {
                        color: (theme) => theme.palette.primary.light,
                    },
                }}
            >
                <Typography>{props.question}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{ marginBottom: '10px', fontStyle: 'italic' }}
            >
                <Typography>{props.answer}</Typography>
            </AccordionDetails>
        </MuiAccordion>
    );
}

const themes = (state) => {
    return [
        {
            title: 'Allgemein',
            hash: '#allgemein',
            questions: [
                {
                    hash: '#delucse',
                    question: 'Was bedeutet "Delucse"?',
                    answer: '"Delucse" ist eine Mischung aus "de Luc", also von Luc, und "deluxe", also Luxus. Diese Merkmale finden sich in dieser Anwendung wieder, da sie zum Einen von Luc programmiert wird und zum Anderen sämtliche Funktionen der Community beinhaltet.',
                },
                {
                    hash: '#app',
                    question: 'Gibt es eine App?',
                    answer: (
                        <div>
                            Jein. Die Anwendung ist eine klassische
                            "Singe-Page-Application" basierend auf React.
                            Allerdings ist es Dir möglich die Webseite wie eine
                            native App zu nutzen (
                            <Link
                                to="https://de.wikipedia.org/wiki/Progressive_Web_App"
                                target="_blank"
                                alt="PWA"
                            >
                                PWA
                            </Link>
                            ). D.h. Du kannst Dir die Webseite zum Homescreen
                            hinzufügen oder alternativ eine der folgenden
                            Dateien herunterladen und auf Deinem Gerät
                            installieren, damit Du in den Genuss einer
                            scheinbaren App kommst.
                            <ul style={{ marginBottom: 0 }}>
                                <li>
                                    <Link
                                        to={`${process.env.PUBLIC_URL}/datei/Delucse.apk`}
                                        target="_blank"
                                        alt="Android"
                                    >
                                        Android
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`${process.env.PUBLIC_URL}/datei/Delucse_Windows.zip`}
                                        target="_blank"
                                        alt="Windows"
                                    >
                                        Windows
                                    </Link>{' '}
                                    ('install.ps1' mit PowerShell ausführen)
                                </li>
                                <li>iOS folgt zu einem späteren Zeitpunkt</li>
                            </ul>
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Konto',
            hash: '#konto',
            questions: [
                {
                    hash: '#nutzer',
                    question: 'Wozu benötige ich ein Nutzerkonto?',
                    answer: (
                        <div>
                            Generell ist zur Nutzung der Anwendung kein Konto
                            zwingend erforderlich. Jedoch erhält man durch die
                            Anmeldung die Möglichkeit selbst Rezepte und Fotos
                            zu veröffentlichen und weitere Funktionen, die einem
                            das Organisieren von Rezepten erleichtern:
                            <ul>
                                <li>Erstellung von Rezepten</li>
                                <li>Hinzufügen von Fotos</li>
                                <li>Speichern von Favoriten</li>
                                <li>Anlegen von Rezeptnotizen</li>
                            </ul>
                            {!state.auth.user ? (
                                <div>
                                    Melde Dich <Link to="/anmeldung">hier</Link>{' '}
                                    an und profitiere von den erweiterten
                                    Funktionen.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
                {
                    hash: '#registrierung',
                    question:
                        'Welche Daten müssen bei der Registrierung angegeben werden?',
                    answer: (
                        <div>
                            Neben einem Nutzernamen und einem Passwort, mit
                            welchem Du dich zukünftig anmelden kannst, benötigt
                            es noch einer funktionierenden E-Mail-Adresse. Diese
                            Adresse wird ausschließlich dafür verwendet Dein
                            Nutzerkonto nach Registrierung freizuschalten und
                            das Passwort neu zu vergeben, solltest Du es
                            vergessen haben.
                            {!state.auth.user ? (
                                <div style={{ marginTop: '10px' }}>
                                    Registriere Dich{' '}
                                    <Link to="/registrierung">hier</Link> und
                                    profitiere von den erweiterten Funktionen.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
                {
                    hash: '#anmeldung',
                    question:
                        'Ich habe mich erfolgreich registriert, kann mich aber nicht anmelden. Was habe ich falsch gemacht?',
                    answer: (
                        <div>
                            Nach erfolgreicher Registrierung erhälst Du eine
                            E-Mail an die hinterlegte E-Mail-Adresse mit einem
                            Link. Nach Betätigung des Links wird Dein
                            Nutzerkonto freigeschaltet und Du kannst dich normal
                            anmelden. Falls der Link bereits abgelaufen ist,
                            musst Du dich einfach nochmal{' '}
                            {!state.auth.user ? (
                                <Link to="/registrierung">registrieren</Link>
                            ) : (
                                'registrieren'
                            )}
                            . (Hintergrund dessen ist, dass man auf diese Art
                            und Weise Deine E-Mail-Adresse validieren kann.)
                        </div>
                    ),
                },
                {
                    hash: '#passwort',
                    question:
                        'Ich habe mein Passwort vergessen. Wie erhalte ich ein neues Passwort?',
                    answer: (
                        <div>
                            Kein Grund zur Sorge! Gehe dafür einfach in der
                            Anmelde-Maske auf "
                            {!state.auth.user ? (
                                <Link to="/passwort">Passwort vergessen?</Link>
                            ) : (
                                'Passwort vergessen?'
                            )}
                            " und gib Deinen Nutzernamen oder Deine hinterlegte
                            E-Mail-Adresse in das vorgesehene Feld ein und
                            klicke auf "Passwort vergessen". Anschließend
                            erhälst Du eine E-Mail an die von Dir hinterlegte
                            E-Mail-Adresse mit einem Link, der es Dir ermöglicht
                            ein neues Passwort zu vergeben.
                        </div>
                    ),
                },
                {
                    hash: '#abmeldung',
                    question:
                        'Warum werde ich immer nach einiger Zeit automatisch abgemeldet?',
                    answer: (
                        <div>
                            Bei Inaktivität, also keiner Nutzung von geschützten
                            Inhalten innerhalb der letzten{' '}
                            {Number(
                                process.env.REACT_APP_API_TOKEN_EXPIRATION
                            ) / 60}{' '}
                            Minuten, wird man automatisch abgemeldet. Dies dient
                            vornehmlich Deiner eigenen Sicherheit.
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Rezepte',
            hash: '#rezept',
            questions: [
                {
                    hash: '#portion',
                    question: 'Wie kann ich die Portionsangaben verändern?',
                    answer: (
                        <div>
                            Bei jedem Rezept hast Du die Möglichkeit
                            Portionsangaben zu verändern. Neben der Menge kann
                            auch die genutzt Form angepasst werden, sofern das
                            Original-Rezept selbst eine Form enthält. Du findest
                            dazu links neben oder unter dem Rezeptbild die
                            Angabe zur Portion und ein
                            <IconButton
                                sx={{
                                    height: 'inherit',
                                    width: '24px',
                                    cursor: 'default',
                                }}
                                color="primary"
                            >
                                <Icon path={mdiPencilOutline} size={'20px'} />
                            </IconButton>
                            -Symbol, welches durch Klick auf jenes das
                            erforderliche Dialogfenster öffnet.
                        </div>
                    ),
                },
                {
                    hash: '#favorit',
                    question:
                        'Wie kann ich ein Rezept meinem persönlichen Kochbuch hinzufügen?',
                    answer: (
                        <div>
                            Es gibt zwei unterschiedliche Wege ein Rezept als
                            Favorit zu markieren.
                            <ul>
                                <li>
                                    In der Rezepteübersicht kannst Du durch
                                    einen Klick auf das Klebeband des
                                    entsprechenden Rezepts jenes als Favorit
                                    vermerken.
                                </li>
                                <li>
                                    In der Rezeptansicht hast Du oben links die
                                    Möglichkeit durch die Schaltfläche{' '}
                                    <IconButton
                                        sx={{
                                            width: '24.8px',
                                            height: '23px',
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                            cursor: 'default',
                                        }}
                                    >
                                        <Icon path={mdiHeartOutline} size={1} />
                                    </IconButton>{' '}
                                    das Rezept als Favorit zu deklarieren.
                                </li>
                            </ul>
                            In beiden Fällen kannst du durch nochmaliges Klicken
                            der jeweiligen Schaltfläche den Favoritenstatus
                            entfernen.
                            {!state.auth.user ? (
                                <div>
                                    Voraussetzung für das Speichern von
                                    Favoriten ist, dass man angemeldet ist.
                                    Melde Dich also{' '}
                                    <Link to="/anmeldung">hier</Link> an.
                                </div>
                            ) : (
                                <div>
                                    <div>
                                        Alle Deine Favoriten werden unter dem
                                        Menüpunkt "
                                        <Link to="/rezepte/favoriten">
                                            Mein Kochbuch
                                        </Link>
                                        " gelistet.
                                    </div>
                                </div>
                            )}
                        </div>
                    ),
                },
                {
                    hash: '#kochmodus',
                    question:
                        'Was ist der Kochmodus und wie kann ich diesen aktivieren?',
                    answer: (
                        <div>
                            Der Kochmodus beschreibt die Möglichkeit den
                            Bildschirm permanent anzulassen, während man das
                            Rezept geöffnet hat.
                            {'wakeLock' in navigator &&
                            'request' in navigator.wakeLock ? (
                                <div>
                                    Links oben hast Du die Möglichkeit durch die
                                    Schaltfläche{' '}
                                    <IconButton
                                        sx={{
                                            width: '24.8px',
                                            height: '23px',
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                            cursor: 'default',
                                        }}
                                    >
                                        <Icon path={mdiPot} size={1} />
                                    </IconButton>{' '}
                                    den Kochmodus zu aktivieren.
                                </div>
                            ) : (
                                <div>
                                    Dein Endgerät verfügt leider nicht über
                                    diese Funktion.
                                </div>
                            )}
                        </div>
                    ),
                },
                {
                    hash: '#druck',
                    question: 'Wie kann ich ein Rezept ausdrucken?',
                    answer: (
                        <div>
                            Links oben hast Du die Möglichkeit durch die
                            Schaltfläche{' '}
                            <IconButton
                                sx={{
                                    width: '24.8px',
                                    height: '23px',
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                    cursor: 'default',
                                }}
                            >
                                <Icon path={mdiPrinter} size={1} />
                            </IconButton>{' '}
                            Dir eine PDF von dem Rezept zu generieren. Dabei
                            werden die gerade eingestellten Angaben
                            berücksichtigt. Mittels eines PDF-Viewers Deiner
                            Wahl kannst Du Dir anschließend die Rezepte-PDF
                            ausdrucken. (Der Name der PDF-Datei wird automatisch
                            aus dem Rezepttitel erstellt.)
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Suche',
            hash: '#suche',
            questions: [
                {
                    hash: '#sucheinstellungen',
                    question: 'Was für Sucheinstellungen kann ich vornehmen?',
                    answer: (
                        <div>
                            <ul style={{ marginTop: 0 }}>
                                <li>
                                    Standard (durchsucht sowohl den Rezepttitel,
                                    als auch die Zutaten, die Schlüsselwörter
                                    und Arbeitsschritte)
                                </li>
                                <li>Titel</li>
                                <li>Zutaten</li>
                                <li>Schlüsselwort</li>
                                <li>Arbeitsschritte</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    hash: '#reihenfolge',
                    question:
                        'Wie gelingt es mir die Reihenfolge der Suchergebnisse zu verändern?',
                    answer: (
                        <div>
                            Rechts neben der Suchleiste ist die Schaltfläche{' '}
                            <Button
                                sx={{
                                    cursor: 'default',
                                    height: '24px',
                                    minWidth: '24px',
                                    padding: '2px',
                                    display: { xs: 'none', sm: 'initial' },
                                }}
                                variant="outlined"
                            >
                                <Icon path={mdiSortAscending} size={0.5} />
                            </Button>
                            <Button
                                sx={{
                                    cursor: 'default',
                                    height: '24px',
                                    minWidth: '20px',
                                    padding: 0,
                                    display: { xs: 'initial', sm: 'none' },
                                }}
                            >
                                <Icon path={mdiDotsVertical} size={0.5} />
                            </Button>{' '}
                            angeordnet, welche folgende Optionen für die
                            Rezept-Reihenfolge bietet:
                            <ul>
                                <li>Relevanz absteigend</li>
                                <li>Alphabet aufsteigend</li>
                                <li>Alphabet absteigend</li>
                                <li>Gesamtzeit aufsteigend</li>
                                <li>Gesamtzeit absteigend</li>
                                <li>Datum aufsteigend</li>
                                <li>Datum absteigend</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    hash: '#filter',
                    question:
                        'Welche Filtermöglichkeiten gibt es bei der Suche?',
                    answer: (
                        <div>
                            Neben der Möglichkeit Rezepte nach bestimmten
                            Schlüsselwörtern zu durchsuchen, gibt es ebenso
                            folgende Filter:
                            <ul>
                                {Object.entries(params.filter).map(
                                    ([key, value]) => (
                                        <li key={key}>
                                            {key}
                                            <ul>
                                                {value.map((v) => (
                                                    <li key={v}>{v}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    )
                                )}
                                <li>Autor</li>
                            </ul>
                        </div>
                    ),
                },
                {
                    hash: '#kriterien',
                    question: 'Welche Rezepte kann ich alle durchsuchen?',
                    answer: (
                        <div>
                            <ul style={{ margin: 0 }}>
                                <li>
                                    <Link to="/rezepte">alle Rezepte</Link>
                                </li>
                                <li>
                                    <Link to="/rezepte/basis">
                                        Grundrezepte
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/rezepte/nutzer">
                                        eigene Rezepte
                                    </Link>{' '}
                                    {!state.auth.user ? (
                                        <div style={{ display: 'inline' }}>
                                            (Voraussetzung, dass man{' '}
                                            <Link to="/anmeldung">
                                                angemeldet
                                            </Link>{' '}
                                            ist.)
                                        </div>
                                    ) : null}
                                </li>
                                <li>
                                    <Link to="/rezepte/favoriten">
                                        Favoriten
                                    </Link>{' '}
                                    {!state.auth.user ? (
                                        <div style={{ display: 'inline' }}>
                                            (Voraussetzung, dass man{' '}
                                            <Link to="/anmeldung">
                                                angemeldet
                                            </Link>{' '}
                                            ist.)
                                        </div>
                                    ) : null}
                                </li>
                                <li>
                                    <Link to="/rezepte/vorlagen">
                                        Rezeptvorlagen
                                    </Link>{' '}
                                    {!state.auth.user ? (
                                        <div style={{ display: 'inline' }}>
                                            (Voraussetzung, dass man{' '}
                                            <Link to="/anmeldung">
                                                angemeldet
                                            </Link>{' '}
                                            ist.)
                                        </div>
                                    ) : null}
                                </li>
                            </ul>
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Vorlagen',
            hash: '#vorlage',
            questions: [
                {
                    hash: '#vorlagendefinition',
                    question: 'Was ist eine Vorlage?',
                    answer: (
                        <div>
                            Eine Vorlage ist eine angefangene Bearbeitung eines
                            (neuen oder bereits existierenden) Rezepts, die noch
                            nicht final hochgelalden wurde. Es erlaubt die
                            Pausierung des Erstellungsvorgangs ohne
                            Datenverlust.
                            <br />
                            Jede Änderung des Rezepts im Vergleich zum Ursprung
                            wird detektiert und durch das{' '}
                            <IconButton
                                sx={{
                                    padding: '4px',
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                }}
                            >
                                <Icon
                                    path={mdiContentSave}
                                    size={0.5}
                                    style={{ color: 'inherit' }}
                                />
                            </IconButton>{' '}
                            - Symbol unten rechts im Rezept-Bearbeitungsmodus
                            visualisiert. Durch einen Klick auf das beschriebene
                            Symbol wird der derzeitige Stand
                            zwischengespeichert. Alternativ erfolgt die
                            Zwischenspeicherung automatisch nach jedem
                            Eingabe-Block. (Ausnahme bildet hierbei die
                            Speicherung von Bildern; diese sind nicht
                            Bestandteil einer Vorlage.)
                            <br />
                            Nach Fertigstellung oder erfolgreicher
                            Aktualisierung eines Rezepts wird die jeweilige
                            Vorlage gelöscht.
                            {!state.auth.user ? (
                                <div>
                                    Voraussetzung für das Hinzufügen von eigenen
                                    Rezepten und damit auch Vorlagen ist, dass
                                    man angemeldet ist. Melde Dich also{' '}
                                    <Link to="/anmeldung">hier</Link> an.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
                {
                    hash: '#vorlagenübersicht',
                    question: 'Wo kann ich meine Vorlagen einsehen?',
                    answer: (
                        <div>
                            Unter dem Menüpunkt "
                            <Link to="/rezepte/vorlagen">Vorlagen</Link>" werden
                            alle Deine Vorlagen aufgelistet. Wenn keine Vorlagen
                            vorhanden sind, heißt dies, dass Du aktuell keine
                            offenen Bearbeitungen hast.
                            <br />
                            In der Übersicht ist es möglich nicht mehr benötigte
                            Vorlage manuell zu löschen.
                            {!state.auth.user ? (
                                <div>
                                    Voraussetzung für das Ansehen von eigenen
                                    Vorlagen ist, dass man angemeldet ist. Melde
                                    Dich also <Link to="/anmeldung">hier</Link>{' '}
                                    an.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Fotos',
            hash: '#foto',
            questions: [
                {
                    hash: '#fotohinzufügen',
                    question: 'Wie kann ich ein Foto hinzufügen?',
                    answer: (
                        <div>
                            Wenn Du Autor des jeweiligen Rezepts bist, kannst Du
                            Bilder im Rezept-Bearbeitungs-Modus hinzufügen.
                            Alternativ ist dies ebenso in der Rezept-Ansicht
                            über die Schaltfläche{' '}
                            <Box
                                sx={{
                                    display: 'inline',
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                }}
                            >
                                <Icon path={mdiCameraPlus} size={1} />
                            </Box>{' '}
                            möglich (entweder in der rechten unteren Bildecke
                            oder falls noch kein Bild vorhanden ist rechts neben
                            dem Rezepttitel).
                            <br />
                            Man kann zurzeit maximal vier Bilder je Nutzer je
                            Rezept hinzufügen.
                            {!state.auth.user ? (
                                <div>
                                    Voraussetzung für das Hinzufügen von eigenen
                                    Bildern ist, dass man angemeldet ist. Melde
                                    Dich also <Link to="/anmeldung">hier</Link>{' '}
                                    an.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
                {
                    hash: '#fotoverwalten',
                    question: 'Wo kann ich meine Fotos sehen?',
                    answer: (
                        <div>
                            Alle hochgeladenen Fotos - egal, ob zu Deinem
                            eigenem Rezept oder zu anderen Rezepten - sind
                            zentral unter dem Menüpunkt "
                            <Link to="/bilder">Meine Fotos</Link>" abrufbar.
                            (Die Bilder sind nach Rezepttitel alphabetisch
                            sortiert.)
                            <br />
                            Sie können in der Übersicht im Vollbild-Modus
                            angesehen und auch gezielt gelöscht werden. Jedes
                            Bild enthält eine Verlinkung zum referenzierten
                            Rezept.
                            {!state.auth.user ? (
                                <div>
                                    Voraussetzung für das Einsehen von eigenen
                                    Bildern ist, dass man angemeldet ist. Melde
                                    Dich also <Link to="/anmeldung">hier</Link>{' '}
                                    an.
                                </div>
                            ) : null}
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Einstellungen',
            hash: '#einstellungen',
            questions: [
                {
                    hash: '#modus',
                    question: 'Gibt es einen "Dark-Modus"?',
                    answer: (
                        <div>
                            Ja, es gibt eine Unterscheidung zwischen einem
                            hellen Thema mit weißen Hintergrund ("Light-Modus")
                            und einem dunklen Thema mit dunkelgrauem Hintergrund
                            ("Dark-Modus"). Zusätzlich kann man den Modus
                            abhängig von der Systemeinstellung des gerade
                            genutzten Gerätes verwenden.
                            <br />
                            Aktuell wird der "
                            {state.settings.color.mode
                                .slice(0, 1)
                                .toUpperCase()}
                            {state.settings.color.mode.slice(1)}
                            -Modus" verwendet. Der Modus kann unter{' '}
                            <Link to="/einstellungen">Einstellungen</Link>{' '}
                            verändert werden.
                        </div>
                    ),
                },
                {
                    hash: '#farbe',
                    question:
                        'Kann ich die Farbeinstellungen der Anwendung personalisieren?',
                    answer: (
                        <div>
                            Die Standardfarbe der Anwendung (
                            <div
                                style={{
                                    color: '#e85917',
                                    display: 'inline-block',
                                }}
                            >
                                {'#e85917'.toUpperCase()}
                            </div>
                            ) kann im Grundton unter{' '}
                            <Link to="/einstellungen">Einstellungen</Link>{' '}
                            angepasst werden. Nach Auswahl der Hauptfarbe wird
                            automatisch ein stimmiger hellerer Farbton als
                            Zweitfarbe berechnet.
                            <br />
                            Aktuell ist folgende Farbkombination eingestellt:
                            <div style={{ display: 'flex' }}>
                                <Box
                                    sx={{
                                        backgroundColor:
                                            state.settings.color.main,
                                        color: (theme) =>
                                            theme.palette.getContrastText(
                                                state.settings.color.main
                                            ),
                                        width: '80px',
                                        height: '50px',
                                        textAlign: 'center',
                                        lineHeight: '50px',
                                    }}
                                >
                                    {state.settings.color.main.toUpperCase()}
                                </Box>
                                <Box
                                    sx={{
                                        marginLeft: '2px',
                                        backgroundColor:
                                            state.settings.color.light,
                                        color: (theme) =>
                                            theme.palette.getContrastText(
                                                state.settings.color.light
                                            ),
                                        width: '80px',
                                        height: '50px',
                                        textAlign: 'center',
                                        lineHeight: '50px',
                                    }}
                                >
                                    {state.settings.color.light.toUpperCase()}
                                </Box>
                            </div>
                        </div>
                    ),
                },
            ],
        },
        {
            title: 'Entwicklung',
            hash: '#entwicklung',
            questions: [
                {
                    hash: '#code',
                    question: 'Wie komme ich an den Quellcode?',
                    answer: (
                        <div>
                            Sämtlicher Quellcode der im Front- und Backend
                            verwendet wird kann in Github eingesehen werden. Die
                            beiden Repositories werden in regelmäßigen Abständen
                            aktualisiert.
                            <ul>
                                <li>
                                    <Link
                                        to="https://github.com/Delucse/Rezepte-Frontend"
                                        target="_blank"
                                        alt="Frontend-Github-Repository"
                                    >
                                        Frontend
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="https://github.com/Delucse/Rezepte-Backend"
                                        target="_blank"
                                        alt="Backend-Github-Repository"
                                    >
                                        Backend
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ),
                },
                {
                    hash: '#bug',
                    question:
                        'Ich habe einen Bug bzw. Fehler entdeckt. Wo kann ich diesen melden?',
                    answer: (
                        <div>
                            Bugs bzw. Fehler können sehr gerne per E-Mail an{' '}
                            <Link to="mailto:support@delucse.de">
                                support@delucse.de
                            </Link>{' '}
                            versendet werden. Alternativ kann ein Issue auf
                            Github (
                            <Link
                                to="https://github.com/Delucse/Rezepte-Frontend/issues/new"
                                target="_blank"
                                alt="Github Issue für Frontend-Repository erstellen"
                            >
                                Frontend
                            </Link>{' '}
                            bzw.{' '}
                            <Link
                                to="https://github.com/Delucse/Rezepte-Backend/issues/new"
                                target="_blank"
                                alt="Github Issue für Backend-Repository erstellen"
                            >
                                Backend
                            </Link>
                            ) erstellt werden.
                            <br />
                            Anmerkung: Bei der Übermittlung eines Fehlers ist es
                            immer hilfreich kurz zu erläutern was man gemacht
                            hat, bevor der Fehler aufgetaucht ist und anzugeben
                            über welches Endgerät und Browser die Anwendung
                            benutzt wurde. Vielen Dank für deine Mühen!
                        </div>
                    ),
                },
            ],
        },
    ];
};

function Faq() {
    const navigate = useNavigate();
    const location = useLocation();
    const hash = location.hash;

    const state = useSelector((state) => state);

    useEffect(() => {
        if (hash !== '') {
            const div = document.getElementById(hash);
            if (div) {
                setExpanded(hash);
                window.scrollTo({
                    top: div.offsetTop,
                    behavior: 'smooth',
                });
            }
            navigate(location.pathname, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [expanded, setExpanded] = useState(null);

    const handleChange = (newExpanded, panel) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {themes(state).map((theme, index) => (
                <Box
                    key={theme.hash}
                    sx={{ marginTop: index === 0 ? 0 : '20px' }}
                >
                    <Typography
                        id={theme.hash}
                        color="text.primary"
                        sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                    >
                        {theme.title}
                    </Typography>
                    {theme.questions.map((q) => (
                        <Accordion
                            id={q.hash}
                            key={q.hash}
                            expanded={expanded === q.hash}
                            question={q.question}
                            answer={q.answer}
                            onChange={(event, newExpanded) =>
                                handleChange(newExpanded, q.hash)
                            }
                        />
                    ))}
                </Box>
            ))}
        </div>
    );
}

export default Faq;
