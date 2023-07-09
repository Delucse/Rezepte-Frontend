import React from 'react';

import Link from '../components/Link';
import Questions from '../components/Questions';

import { Box, Typography, styled } from '@mui/material';
import { mdiFormatSection } from '@mdi/js';

const StyledList = styled('li')({
    margin: '5px 0px',
});

const themes = () => {
    return [
        {
            hash: '#verantwortlicher',
            question: 'Verantwortlicher',
            answer: (
                <>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den
                    Websitebetreiber. Dessen Kontaktdaten kannst Du dem{' '}
                    <Link to="/impressum">Impressum</Link> dieser Website
                    entnehmen.
                </>
            ),
        },
        {
            hash: '#uebersicht',
            question: 'Übersicht der Verarbeitungen',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Die nachfolgende Übersicht fasst die Arten der
                        verarbeiteten Daten und die Zwecke ihrer Verarbeitung
                        zusammen und verweist auf die betroffenen Personen.
                    </p>
                    <ul style={{ marginBottom: 0 }}>
                        <StyledList>
                            <b>Arten der verarbeiteten Daten</b>
                            <ul>
                                <li>Bestandsdaten</li>
                                <li>Kontaktdaten</li>
                                <li>Inhaltsdaten</li>
                                <li>Nutzungsdaten</li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Kategorien betroffener Personen</b>
                            <ul>
                                <li>Nutzer</li>
                                <li>Kommunikationspartner</li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul>
                                <li>Kontaktanfragen und Kommunikation</li>
                                <li>Sicherheitsmaßnahmen</li>
                                <li>
                                    Verwaltung und Beantwortung von Anfragen
                                </li>
                                <li>Feedback</li>
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                                <li>Informationstechnische Infrastruktur</li>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#begriffsdefinitionen',
            question: 'Begriffsdefinitionen',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        In diesem Abschnitt erhälst Du eine Übersicht über die
                        in dieser Datenschutzerklärung verwendeten
                        Begrifflichkeiten. Viele der Begriffe sind dem Gesetz
                        entnommen und vor allem im Art. 4 DSGVO definiert. Die
                        gesetzlichen Definitionen sind verbindlich. Die
                        nachfolgenden Erläuterungen sollen dagegen vor allem dem
                        Verständnis dienen. Die Begriffe sind alphabetisch
                        sortiert.
                    </p>
                    <ul style={{ marginBottom: 0 }}>
                        <StyledList>
                            <b>Personenbezogene Daten:</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    "Personenbezogene Daten“ sind alle
                                    Informationen, die sich auf eine
                                    identifizierte oder identifizierbare
                                    natürliche Person (im Folgenden "betroffene
                                    Person“) beziehen
                                </li>
                                <li>
                                    als identifizierbar wird eine natürliche
                                    Person angesehen, die direkt oder indirekt,
                                    insbesondere mittels Zuordnung zu einer
                                    Kennung wie einem Namen, zu einer
                                    Kennnummer, zu Standortdaten, zu einer
                                    Online-Kennung (z.B. Cookie) oder zu einem
                                    oder mehreren besonderen Merkmalen
                                    identifiziert werden kann, die Ausdruck der
                                    physischen, physiologischen, genetischen,
                                    psychischen, wirtschaftlichen, kulturellen
                                    oder sozialen Identität dieser natürlichen
                                    Person sind.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Verantwortlicher</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Als "Verantwortlicher“ wird die natürliche
                                    oder juristische Person, Behörde,
                                    Einrichtung oder andere Stelle, die allein
                                    oder gemeinsam mit anderen über die Zwecke
                                    und Mittel der Verarbeitung von
                                    personenbezogenen Daten entscheidet,
                                    bezeichnet.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    "Verarbeitung" ist jeder mit oder ohne Hilfe
                                    automatisierter Verfahren ausgeführte
                                    Vorgang oder jede solche Vorgangsreihe im
                                    Zusammenhang mit personenbezogenen Daten.
                                    Der Begriff reicht weit und umfasst
                                    praktisch jeden Umgang mit Daten, sei es das
                                    Erheben, das Auswerten, das Speichern, das
                                    Übermitteln oder das Löschen.
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#rechtsgrundlage',
            question: 'Maßgebliche Rechtsgrundlagen',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Im Folgenden erhälst Du eine Übersicht der
                        Rechtsgrundlagen der DSGVO, auf deren Basis wir
                        personenbezogene Daten verarbeiten. Bitte nimm zur
                        Kenntnis, dass neben den Regelungen der DSGVO nationale
                        Datenschutzvorgaben in Deinem bzw. unserem Wohn- oder
                        Sitzland gelten können. Sollten ferner im Einzelfall
                        speziellere Rechtsgrundlagen maßgeblich sein, teilen wir
                        Dir diese in der Datenschutzerklärung mit.
                    </p>
                    <ul>
                        <StyledList>
                            <b>
                                Vertragserfüllung und vorvertragliche Anfragen
                                (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)
                            </b>{' '}
                            - Die Verarbeitung ist für die Erfüllung eines
                            Vertrags, dessen Vertragspartei die betroffene
                            Person ist, oder zur Durchführung vorvertraglicher
                            Maßnahmen erforderlich, die auf Anfrage der
                            betroffenen Person erfolgen.
                        </StyledList>
                        <StyledList>
                            <b>
                                Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit.
                                f) DSGVO)
                            </b>{' '}
                            - Die Verarbeitung ist zur Wahrung der berechtigten
                            Interessen des Verantwortlichen oder eines Dritten
                            erforderlich, sofern nicht die Interessen oder
                            Grundrechte und Grundfreiheiten der betroffenen
                            Person, die den Schutz personenbezogener Daten
                            erfordern, überwiegen.
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        Zusätzlich zu den Datenschutzregelungen der DSGVO gelten
                        nationale Regelungen zum Datenschutz in Deutschland.
                        Hierzu gehört insbesondere das Gesetz zum Schutz vor
                        Missbrauch personenbezogener Daten bei der
                        Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das
                        BDSG enthält insbesondere Spezialregelungen zum Recht
                        auf Auskunft, zum Recht auf Löschung, zum
                        Widerspruchsrecht, zur Verarbeitung besonderer
                        Kategorien personenbezogener Daten, zur Verarbeitung für
                        andere Zwecke und zur Übermittlung sowie automatisierten
                        Entscheidungsfindung im Einzelfall einschließlich
                        Profiling. Ferner können Landesdatenschutzgesetze der
                        einzelnen Bundesländer zur Anwendung gelangen.
                    </p>
                </>
            ),
        },
        {
            hash: '#sicherheitsmaßnahmen',
            question: 'Sicherheitsmaßnahmen',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
                        Berücksichtigung des Stands der Technik, der
                        Implementierungskosten und der Art, des Umfangs, der
                        Umstände und der Zwecke der Verarbeitung sowie der
                        unterschiedlichen Eintrittswahrscheinlichkeiten und des
                        Ausmaßes der Bedrohung der Rechte und Freiheiten
                        natürlicher Personen geeignete technische und
                        organisatorische Maßnahmen, um ein dem Risiko
                        angemessenes Schutzniveau zu gewährleisten.
                    </p>

                    <p>
                        Zu den Maßnahmen gehören insbesondere die Sicherung der
                        Vertraulichkeit, Integrität und Verfügbarkeit von Daten
                        durch Kontrolle des physischen und elektronischen
                        Zugangs zu den Daten als auch des sie betreffenden
                        Zugriffs, der Eingabe, der Weitergabe, der Sicherung der
                        Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir
                        Verfahren eingerichtet, die eine Wahrnehmung von
                        Betroffenenrechten, die Löschung von Daten und
                        Reaktionen auf die Gefährdung der Daten gewährleisten.
                        Ferner berücksichtigen wir den Schutz personenbezogener
                        Daten bereits bei der Entwicklung bzw. Auswahl von
                        Hardware, Software sowie Verfahren entsprechend dem
                        Prinzip des Datenschutzes, durch Technikgestaltung und
                        durch datenschutzfreundliche Voreinstellungen.
                    </p>

                    <p style={{ marginBottom: 0 }}>
                        TLS-Verschlüsselung (https): Um Deine via unserem
                        Online-Angebot übermittelten Daten zu schützen, nutzen
                        wir eine TLS-Verschlüsselung. Du erkennst derart
                        verschlüsselte Verbindungen an dem Präfix https:// in
                        der Adresszeile Deines Browsers.
                    </p>
                </>
            ),
        },
        {
            hash: '#rechte',
            question: 'Rechte der betroffenen Personen',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Ihnen stehen als Betroffene nach der DSGVO verschiedene
                        Rechte zu, die sich insbesondere aus Art. 15 bis 21
                        DSGVO ergeben:
                    </p>
                    <ul style={{ marginBottom: 0 }}>
                        <StyledList>
                            <b>Widerspruchsrecht</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast das Recht, aus Gründen, die sich aus
                                    Deiner besonderen Situation ergeben,
                                    jederzeit gegen die Verarbeitung der Dich
                                    betreffenden personenbezogenen Daten, die
                                    aufgrund von Art. 6 Abs. 1 lit. e oder f
                                    DSGVO erfolgt, Widerspruch einzulegen; dies
                                    gilt auch für ein auf diese Bestimmungen
                                    gestütztes Profiling. Werden die Dich
                                    betreffenden personenbezogenen Daten
                                    verarbeitet, um Direktwerbung zu betreiben,
                                    hast Du das Recht, jederzeit Widerspruch
                                    gegen die Verarbeitung der Dich betreffenden
                                    personenbezogenen Daten zum Zwecke
                                    derartiger Werbung einzulegen; dies gilt
                                    auch für das Profiling, soweit es mit
                                    solcher Direktwerbung in Verbindung steht.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Widerrufsrecht bei Einwilligungen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast das Recht, erteilte Einwilligungen
                                    jederzeit zu widerrufen.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Auskunftsrecht</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast das Recht, eine Bestätigung darüber
                                    zu verlangen, ob betreffende Daten
                                    verarbeitet werden und auf Auskunft über
                                    diese Daten sowie auf weitere Informationen
                                    und Kopie der Daten entsprechend den
                                    gesetzlichen Vorgaben.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Recht auf Berichtigung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast entsprechend den gesetzlichen
                                    Vorgaben das Recht, die Vervollständigung
                                    der Dich betreffenden Daten oder die
                                    Berichtigung der Dich betreffenden
                                    unrichtigen Daten zu verlangen.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>
                                Recht auf Löschung und Einschränkung der
                                Verarbeitung
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast nach Maßgabe der gesetzlichen
                                    Vorgaben das Recht, zu verlangen, dass Dich
                                    betreffende Daten unverzüglich gelöscht
                                    werden, bzw. alternativ nach Maßgabe der
                                    gesetzlichen Vorgaben eine Einschränkung der
                                    Verarbeitung der Daten zu verlangen.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Recht auf Datenübertragbarkeit</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast das Recht, Dich betreffende Daten,
                                    die Du uns bereitgestellt hast, nach Maßgabe
                                    der gesetzlichen Vorgaben in einem
                                    strukturierten, gängigen und
                                    maschinenlesbaren Format zu erhalten oder
                                    deren Übermittlung an einen anderen
                                    Verantwortlichen zu fordern.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Beschwerde bei Aufsichtsbehörde</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Du hast unbeschadet eines anderweitigen
                                    verwaltungsrechtlichen oder gerichtlichen
                                    Rechtsbehelfs das Recht auf Beschwerde bei
                                    einer Aufsichtsbehörde, insbesondere in dem
                                    Mitgliedstaat ihres gewöhnlichen
                                    Aufenthaltsorts, ihres Arbeitsplatzes oder
                                    des Orts des mutmaßlichen Verstoßes, wenn Du
                                    der Ansicht bist, dass die Verarbeitung der
                                    Dich betreffenden personenbezogenen Daten
                                    gegen die Vorgaben der DSGVO verstößt.
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#cookies',
            question: 'Einsatz von Cookies',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Cookies sind kleine Textdateien, bzw. sonstige
                        Speichervermerke, die Informationen auf Endgeräten
                        speichern und Informationen aus den Endgeräten auslesen.
                        Z.B. um den Login-Status in einem Nutzerkonto, die
                        aufgerufenen Inhalte oder verwendete Funktionen eines
                        Onlineangebotes zu speichern. Cookies können ferner zu
                        unterschiedlichen Zwecken eingesetzt werden, z.B. zu
                        Zwecken der Funktionsfähigkeit, Sicherheit und Komfort
                        von Onlineangeboten sowie der Erstellung von Analysen
                        der Besucherströme.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Hinweise zur Einwilligung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wir setzen Cookies im Einklang mit den
                                    gesetzlichen Vorschriften ein. Daher holen
                                    wir von den Nutzern eine vorhergehende
                                    Einwilligung ein, außer wenn diese
                                    gesetzlich nicht gefordert ist.
                                </li>
                                <li>
                                    Eine Einwilligung ist insbesondere nicht
                                    notwendig, wenn das Speichern und das
                                    Auslesen der Informationen, also auch von
                                    Cookies, unbedingt erforderlich sind, um dem
                                    den Nutzern einen von ihnen ausdrücklich
                                    gewünschten Telemediendienst (also unser
                                    Onlineangebot) zur Verfügung zu stellen. Zu
                                    den unbedingt erforderlichen Cookies gehören
                                    in der Regel Cookies mit Funktionen, die der
                                    Anzeige und Lauffähigkeit des
                                    Onlineangebotes, dem Lastausgleich, der
                                    Sicherheit, der Speicherung der Präferenzen
                                    und Auswahlmöglichkeiten der Nutzer oder
                                    ähnlichen mit der Bereitstellung der Haupt-
                                    und Nebenfunktionen des von den Nutzern
                                    angeforderten Onlineangebotes
                                    zusammenhängenden Zwecken dienen.
                                </li>
                                <li>
                                    Die widerrufliche Einwilligung wird
                                    gegenüber den Nutzern deutlich kommuniziert
                                    und enthält die Informationen zu der
                                    jeweiligen Cookie-Nutzung.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>
                                Hinweise zu datenschutzrechtlichen
                                Rechtsgrundlagen
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Auf welcher datenschutzrechtlichen
                                    Rechtsgrundlage wir die personenbezogenen
                                    Daten der Nutzer mit Hilfe von Cookies
                                    verarbeiten, hängt davon ab, ob wir Nutzer
                                    um eine Einwilligung bitten. Falls die
                                    Nutzer einwilligen, ist die Rechtsgrundlage
                                    der Verarbeitung Ihrer Daten die erklärte
                                    Einwilligung. Andernfalls werden die
                                    mithilfe von Cookies verarbeiteten Daten auf
                                    Grundlage unserer berechtigten Interessen
                                    (z.B. an einem betriebswirtschaftlichen
                                    Betrieb unseres Onlineangebotes und
                                    Verbesserung seiner Nutzbarkeit) verarbeitet
                                    oder, wenn dies im Rahmen der Erfüllung
                                    unserer vertraglichen Pflichten erfolgt,
                                    wenn der Einsatz von Cookies erforderlich
                                    ist, um unsere vertraglichen Verpflichtungen
                                    zu erfüllen. Zu welchen Zwecken die Cookies
                                    von uns verarbeitet werden, darüber klären
                                    wir im Laufe dieser Datenschutzerklärung
                                    oder im Rahmen von unseren Einwilligungs-
                                    und Verarbeitungsprozessen auf.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Speicherdauer</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Im Hinblick auf die Speicherdauer werden die
                                    folgenden Arten von Cookies unterschieden:
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>
                                        Temporäre Cookies (auch: Session- oder
                                        Sitzungs-Cookies)
                                    </b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Temporäre Cookies werden spätestens
                                            gelöscht, nachdem ein Nutzer ein
                                            Online-Angebot verlassen und sein
                                            Endgerät (z.B. Browser oder mobile
                                            Applikation) geschlossen hat.
                                        </li>
                                    </ul>
                                </StyledList>
                                <StyledList>
                                    <b>Permanente Cookies</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Permanente Cookies bleiben auch nach
                                            dem Schließen des Endgerätes
                                            gespeichert. So können
                                            beispielsweise der Login-Status
                                            gespeichert oder bevorzugte Inhalte
                                            direkt angezeigt werden, wenn der
                                            Nutzer eine Website erneut besucht.
                                            Ebenso können die mit Hilfe von
                                            Cookies erhobenen Daten der Nutzer
                                            zur Reichweitenmessung verwendet
                                            werden.
                                        </li>
                                        <li>
                                            Sofern wir Nutzern keine expliziten
                                            Angaben zur Art und Speicherdauer
                                            von Cookies mitteilen (z. B. im
                                            Rahmen der Einholung der
                                            Einwilligung), sollten Nutzer davon
                                            ausgehen, dass Cookies permanent
                                            sind und die Speicherdauer bis zu
                                            zwei Jahre betragen kann.
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>
                                Allgemeine Hinweise zum Widerruf und Widerspruch
                                (sog. "Opt-Out")
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer können die von ihnen abgegebenen
                                    Einwilligungen jederzeit widerrufen und der
                                    Verarbeitung entsprechend den gesetzlichen
                                    Vorgaben widersprechen. Hierzu können Nutzer
                                    unter anderem die Verwendung von Cookies in
                                    den Einstellungen ihres Browsers
                                    einschränken (wobei dadurch auch die
                                    Funktionalität unseres Onlineangebotes
                                    eingeschränkt sein kann). Ein Widerspruch
                                    gegen die Verwendung von Cookies zu
                                    Online-Marketing-Zwecken kann auch über die
                                    Websites{' '}
                                    <Link
                                        to="https://optout.aboutads.info"
                                        target="_blank"
                                    >
                                        https://optout.aboutads.info
                                    </Link>{' '}
                                    und{' '}
                                    <Link
                                        to="https://www.youronlinechoices.com/"
                                        target="_blank"
                                    >
                                        https://www.youronlinechoices.com
                                    </Link>{' '}
                                    erklärt werden.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                        <li>
                                            Einwilligung (Art. 6 Abs. 1 S. 1
                                            lit. a) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                    <p>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ marginBottom: 0 }}>
                        <StyledList>
                            <b>
                                Verarbeitung von Cookie-Daten auf Grundlage
                                einer Einwilligung
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wir setzen ein Verfahren zum
                                    Cookie-Einwilligungs-Management ein, in
                                    dessen Rahmen die Einwilligungen der Nutzer
                                    in den Einsatz von Cookies, bzw. der im
                                    Rahmen des
                                    Cookie-Einwilligungs-Management-Verfahrens
                                    genannten Verarbeitungen und Anbieter
                                    eingeholt sowie von den Nutzern verwaltet
                                    und widerrufen werden können. Hierbei wird
                                    die Einwilligungserklärung gespeichert, um
                                    deren Abfrage nicht erneut wiederholen zu
                                    müssen und die Einwilligung entsprechend der
                                    gesetzlichen Verpflichtung nachweisen zu
                                    können. Die Speicherung kann serverseitig
                                    und/oder in einem Cookie (sogenanntes
                                    Opt-In-Cookie, bzw. mithilfe vergleichbarer
                                    Technologien) erfolgen, um die Einwilligung
                                    einem Nutzer, bzw. dessen Gerät zuordnen zu
                                    können. Vorbehaltlich individueller Angaben
                                    zu den Anbietern von
                                    Cookie-Management-Diensten, gelten die
                                    folgenden Hinweise: Die Dauer der
                                    Speicherung der Einwilligung kann bis zu
                                    zwei Jahren betragen. Hierbei wird ein
                                    pseudonymer Nutzer-Identifikator gebildet
                                    und mit dem Zeitpunkt der Einwilligung,
                                    Angaben zur Reichweite der Einwilligung (z.
                                    B. welche Kategorien von Cookies und/oder
                                    Diensteanbieter) sowie dem Browser, System
                                    und verwendeten Endgerät gespeichert.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Einwilligung (Art. 6 Abs. 1 S. 1
                                            lit. a) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#loeschung',
            question: 'Löschung von Daten',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Die von uns verarbeiteten Daten werden nach Maßgabe der
                        gesetzlichen Vorgaben gelöscht, sobald deren zur
                        Verarbeitung erlaubten Einwilligungen widerrufen werden
                        oder sonstige Erlaubnisse entfallen (z.B. wenn der Zweck
                        der Verarbeitung dieser Daten entfallen ist oder sie für
                        den Zweck nicht erforderlich sind). Sofern die Daten
                        nicht gelöscht werden, weil sie für andere und
                        gesetzlich zulässige Zwecke erforderlich sind, wird
                        deren Verarbeitung auf diese Zwecke beschränkt. D.h.,
                        die Daten werden gesperrt und nicht für andere Zwecke
                        verarbeitet. Das gilt z.B. für Daten, die aus handels-
                        oder steuerrechtlichen Gründen aufbewahrt werden müssen
                        oder deren Speicherung zur Geltendmachung, Ausübung oder
                        Verteidigung von Rechtsansprüchen oder zum Schutz der
                        Rechte einer anderen natürlichen oder juristischen
                        Person erforderlich ist.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        Unsere Datenschutzhinweise können ferner weitere Angaben
                        zu der Aufbewahrung und Löschung von Daten beinhalten,
                        die für die jeweiligen Verarbeitungen vorrangig gelten.
                    </p>
                </>
            ),
        },
        {
            hash: '#aktualisierung',
            question: 'Änderung und Aktualisierung der Datenschutzerklärung',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Wir bitten Dich, sich regelmäßig über den Inhalt unserer
                        Datenschutzerklärung zu informieren. Wir passen die
                        Datenschutzerklärung an, sobald die Änderungen der von
                        uns durchgeführten Datenverarbeitungen dies erforderlich
                        machen. Wir informieren Dich, sobald durch die
                        Änderungen eine Mitwirkungshandlung Deinerseits (z.B.
                        Einwilligung) oder eine sonstige individuelle
                        Benachrichtigung erforderlich wird.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        Sofern wir in dieser Datenschutzerklärung Adressen und
                        Kontaktinformationen von Unternehmen und Organisationen
                        angeben, bitten wir zu beachten, dass die Adressen sich
                        über die Zeit ändern können und bitten die Angaben vor
                        Kontaktaufnahme zu prüfen.
                    </p>
                </>
            ),
        },

        {
            hash: '#nutzerkonto',
            question: 'Registrierung, Anmeldung und Nutzerkonto',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Nutzer können ein Nutzerkonto anlegen. Im Rahmen der
                        Registrierung werden den Nutzern die erforderlichen
                        Pflichtangaben mitgeteilt und zu Zwecken der
                        Bereitstellung des Nutzerkontos auf Grundlage
                        vertraglicher Pflichterfüllung verarbeitet. Zu den
                        verarbeiteten Daten gehören insbesondere die
                        Login-Informationen (u.a. Nutzername, Passwort sowie
                        eine E-Mail-Adresse).
                    </p>
                    <p>
                        Im Rahmen der Inanspruchnahme unserer Registrierungs-
                        und Anmeldefunktionen sowie der Nutzung des Nutzerkontos
                        speichern wir die IP-Adresse und den Zeitpunkt der
                        jeweiligen Nutzerhandlung. Die Speicherung erfolgt auf
                        Grundlage unserer berechtigten Interessen als auch jener
                        der Nutzer an einem Schutz vor Missbrauch und sonstiger
                        unbefugter Nutzung. Eine Weitergabe dieser Daten an
                        Dritte erfolgt grundsätzlich nicht, es sei denn, sie ist
                        zur Verfolgung unserer Ansprüche erforderlich oder es
                        besteht eine gesetzliche Verpflichtung hierzu. Die
                        IP-Adressen werden spätestens nach sieben Tagen gelöscht
                        oder anonymisiert.
                    </p>
                    <p>
                        Die Nutzer können über Vorgänge, die für deren
                        Nutzerkonto relevant sind, wie z.B. technische
                        Änderungen, per E-Mail informiert werden.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Verarbeitete Datenarten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                                <li>
                                    Kontaktdaten (z.B. E-Mail, Telefonnummern)
                                </li>
                                <li>
                                    Inhaltsdaten (z.B. Eingaben in
                                    Onlineformularen)
                                </li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                    (z. B. IP-Adressen, Zeitangaben,
                                    Identifikationsnummern, Einwilligungsstatus)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Betroffene Personen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer (z.B. Webseitenbesucher, Nutzer von
                                    Onlinediensten)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>Sicherheitsmaßnahmen</li>
                                <li>
                                    Verwaltung und Beantwortung von Anfragen
                                </li>
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Rechtsgrundlagen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Vertragserfüllung und vorvertragliche
                                    Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)
                                </li>
                                <li>
                                    Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                                    lit. f) DSGVO)
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ margin: 0 }}>
                        <StyledList>
                            <b>Registrierung mit Pseudonymen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer dürfen statt Klarnamen Pseudonyme als
                                    Nutzernamen verwenden
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Vertragserfüllung und
                                            vorvertragliche Anfragen (Art. 6
                                            Abs. 1 S. 1 lit. b) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Profile der Nutzer sind nicht öffentlich</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Die Profile der Nutzer sind öffentlich nicht
                                    sichtbar und nicht zugänglich.
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Löschung von Daten nach Kündigung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wenn Nutzer ihr Nutzerkonto gekündigt haben,
                                    werden deren Daten im Hinblick auf das
                                    Nutzerkonto, vorbehaltlich einer
                                    gesetzlichen Erlaubnis, Pflicht oder
                                    Einwilligung der Nutzer, gelöscht.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Vertragserfüllung und
                                            vorvertragliche Anfragen (Art. 6
                                            Abs. 1 S. 1 lit. b) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Keine Aufbewahrungspflicht für Daten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Es obliegt den Nutzern, ihre Daten bei
                                    erfolgter Kündigung vor dem Vertragsende zu
                                    sichern. Wir sind berechtigt, sämtliche
                                    während der Vertragsdauer gespeicherte Daten
                                    des Nutzers unwiederbringlich zu löschen
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Vertragserfüllung und
                                            vorvertragliche Anfragen (Art. 6
                                            Abs. 1 S. 1 lit. b) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#publikationsmedien',
            question: 'Blogs und Publikationsmedien',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Wir nutzen Blogs oder vergleichbare Mittel der
                        Onlinekommunikation und Publikation (nachfolgend
                        "Publikationsmedium"). Die Daten der Leser werden für
                        die Zwecke des Publikationsmediums nur insoweit
                        verarbeitet, als es für dessen Darstellung und die
                        Kommunikation zwischen Autoren und Lesern oder aus
                        Gründen der Sicherheit erforderlich ist. Im Übrigen
                        verweisen wir auf die Informationen zur Verarbeitung der
                        Besucher unseres Publikationsmediums im Rahmen dieser
                        Datenschutzhinweise.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Verarbeitete Datenarten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                                <li>
                                    Kontaktdaten (z.B. E-Mail, Telefonnummern)
                                </li>
                                <li>
                                    Inhaltsdaten (z.B. Eingaben in
                                    Onlineformularen)
                                </li>
                                <li>
                                    Nutzungsdaten (z.B. besuchte Webseiten,
                                    Interesse an Inhalten, Zugriffszeiten)
                                </li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                    (z. B. IP-Adressen, Zeitangaben,
                                    Identifikationsnummern, Einwilligungsstatus)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Betroffene Personen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer (z.B. Webseitenbesucher, Nutzer von
                                    Onlinediensten)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Feedback (z.B. Sammeln von Feedback via
                                    Online-Formular)
                                </li>
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                                <li>Sicherheitsmaßnahmen</li>
                                <li>
                                    Verwaltung und Beantwortung von Anfragen
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Rechtsgrundlagen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                                    lit. f) DSGVO)
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ margin: 0 }}>
                        <StyledList>
                            <b>Kommentare und Beiträge</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wenn Nutzer Kommentare oder sonstige
                                    Beiträge hinterlassen, können ihre
                                    IP-Adressen auf Grundlage unserer
                                    berechtigten Interessen für sieben Tage
                                    gespeichert werden. Das erfolgt zu unserer
                                    Sicherheit, falls jemand in Kommentaren und
                                    Beiträgen widerrechtliche Inhalte
                                    hinterlässt (Beleidigungen, verbotene
                                    politische Propaganda etc.). In diesem Fall
                                    können wir selbst für den Kommentar oder
                                    Beitrag belangt werden und sind daher an der
                                    Identität des Verfassers interessiert.
                                </li>
                                <li>
                                    Des Weiteren behalten wir uns vor, auf
                                    Grundlage unserer berechtigten Interessen
                                    die Angaben der Nutzer zwecks Spamerkennung
                                    zu verarbeiten.
                                </li>
                                <li>
                                    Auf derselben Rechtsgrundlage behalten wir
                                    uns vor, im Fall von Umfragen die
                                    IP-Adressen der Nutzer für deren Dauer zu
                                    speichern und Cookies zu verwenden, um
                                    Mehrfachabstimmungen zu vermeiden.
                                </li>
                                <li>
                                    Die im Rahmen der Kommentare und Beiträge
                                    mitgeteilten Informationen zur Person,
                                    etwaige Kontakt- sowie
                                    Webseiteninformationen als auch die
                                    inhaltlichen Angaben werden von uns bis zum
                                    Widerspruch der Nutzer dauerhaft
                                    gespeichert.
                                </li>
                            </ul>

                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#anfragenverwaltung',
            question: 'Kontakt- und Anfragenverwaltung',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Bei der Kontaktaufnahme mit uns (z.B. per Post,
                        Kontaktformular, E-Mail, Telefon oder via soziale
                        Medien) sowie im Rahmen bestehender Nutzer- und
                        Geschäftsbeziehungen werden die Angaben der anfragenden
                        Personen verarbeitet soweit dies zur Beantwortung der
                        Kontaktanfragen und etwaiger angefragter Maßnahmen
                        erforderlich ist.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Verarbeitete Datenarten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Kontaktdaten (z.B. E-Mail, Telefonnummern)
                                </li>
                                <li>
                                    Inhaltsdaten (z.B. Eingaben in
                                    Onlineformularen)
                                </li>
                                <li>
                                    Nutzungsdaten (z.B. besuchte Webseiten,
                                    Interesse an Inhalten, Zugriffszeiten)
                                </li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                    (z. B. IP-Adressen, Zeitangaben,
                                    Identifikationsnummern, Einwilligungsstatus)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Betroffene Personen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>Kommunikationspartner</li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>Kontaktanfragen und Kommunikation</li>
                                <li>
                                    Verwaltung und Beantwortung von Anfragen
                                </li>
                                <li>
                                    Feedback (z.B. Sammeln von Feedback via
                                    Online-Formular)
                                </li>
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Rechtsgrundlagen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                                    lit. f) DSGVO)
                                </li>
                                <li>
                                    Vertragserfüllung und vorvertragliche
                                    Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ margin: 0 }}>
                        <StyledList>
                            <b>Kontaktformular</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wenn Nutzer über unser Kontaktformular,
                                    E-Mail oder andere Kommunikationswege mit
                                    uns in Kontakt treten, verarbeiten wir die
                                    uns in diesem Zusammenhang mitgeteilten
                                    Daten zur Bearbeitung des mitgeteilten
                                    Anliegens.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Vertragserfüllung und
                                            vorvertragliche Anfragen (Art. 6
                                            Abs. 1 S. 1 lit. b) DSGVO)
                                        </li>
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#webhosting',
            question: 'Bereitstellung des Onlineangebotes und Webhosting',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Wir verarbeiten die Daten der Nutzer, um ihnen unsere
                        Online-Dienste zur Verfügung stellen zu können. Zu
                        diesem Zweck verarbeiten wir die IP-Adresse des Nutzers,
                        die notwendig ist, um die Inhalte und Funktionen unserer
                        Online-Dienste an den Browser oder das Endgerät der
                        Nutzer zu übermitteln.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Verarbeitete Datenarten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzungsdaten (z.B. besuchte Webseiten,
                                    Interesse an Inhalten, Zugriffszeiten)
                                </li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                    (z. B. IP-Adressen, Zeitangaben,
                                    Identifikationsnummern, Einwilligungsstatus)
                                </li>
                                <li>
                                    Inhaltsdaten (z.B. Eingaben in
                                    Onlineformularen)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Betroffene Personen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer (z.B. Webseitenbesucher, Nutzer von
                                    Onlinediensten)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                                <li>
                                    Informationstechnische Infrastruktur
                                    (Betrieb und Bereitstellung von
                                    Informationssystemen und technischen Geräten
                                    (Computer, Server etc.).)
                                </li>
                                <li>Sicherheitsmaßnahmen</li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Rechtsgrundlagen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                                    lit. f) DSGVO)
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ margin: 0 }}>
                        <StyledList>
                            <b>
                                Bereitstellung Onlineangebot auf gemietetem
                                Speicherplatz
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Für die Bereitstellung unseres
                                    Onlineangebotes nutzen wir Speicherplatz,
                                    Rechenkapazität und Software, die wir von
                                    einem entsprechenden Serveranbieter (auch
                                    "Webhoster" genannt) mieten oder anderweitig
                                    beziehen.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO).
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Erhebung von Zugriffsdaten und Logfiles</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Der Zugriff auf unser Onlineangebot wird in
                                    Form von so genannten "Server-Logfiles"
                                    protokolliert. Zu den Serverlogfiles können
                                    die Adresse und Name der abgerufenen
                                    Webseiten und Dateien, Datum und Uhrzeit des
                                    Abrufs, übertragene Datenmengen, Meldung
                                    über erfolgreichen Abruf, Browsertyp nebst
                                    Version, das Betriebssystem des Nutzers,
                                    Referrer URL (die zuvor besuchte Seite) und
                                    im Regelfall IP-Adressen und der anfragende
                                    Provider gehören. Die Serverlogfiles können
                                    zum einen zu Zwecken der Sicherheit
                                    eingesetzt werden, z.B., um eine Überlastung
                                    der Server zu vermeiden (insbesondere im
                                    Fall von missbräuchlichen Angriffen,
                                    sogenannten DDoS-Attacken) und zum anderen,
                                    um die Auslastung der Server und ihre
                                    Stabilität sicherzustellen.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                                <StyledList>
                                    <b>Löschung von Daten</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Logfile-Informationen werden für die
                                            Dauer von maximal 30 Tagen
                                            gespeichert und danach gelöscht oder
                                            anonymisiert. Daten, deren weitere
                                            Aufbewahrung zu Beweiszwecken
                                            erforderlich ist, sind bis zur
                                            endgültigen Klärung des jeweiligen
                                            Vorfalls von der Löschung
                                            ausgenommen.
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>E-Mail-Versand und -Hosting</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Die von uns in Anspruch genommenen
                                    Webhosting-Leistungen umfassen ebenfalls den
                                    Versand, den Empfang sowie die Speicherung
                                    von E-Mails. Zu diesen Zwecken werden die
                                    Adressen der Empfänger sowie Absender als
                                    auch weitere Informationen betreffend den
                                    E-Mailversand (z.B. die beteiligten
                                    Provider) sowie die Inhalte der jeweiligen
                                    E-Mails verarbeitet. Die vorgenannten Daten
                                    können ferner zu Zwecken der Erkennung von
                                    SPAM verarbeitet werden. Wir bitten darum,
                                    zu beachten, dass E-Mails im Internet
                                    grundsätzlich nicht verschlüsselt versendet
                                    werden. Im Regelfall werden E-Mails zwar auf
                                    dem Transportweg verschlüsselt, aber (sofern
                                    kein sogenanntes
                                    Ende-zu-Ende-Verschlüsselungsverfahren
                                    eingesetzt wird) nicht auf den Servern, von
                                    denen sie abgesendet und empfangen werden.
                                    Wir können daher für den Übertragungsweg der
                                    E-Mails zwischen dem Absender und dem
                                    Empfang auf unserem Server keine
                                    Verantwortung übernehmen.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>1&1 IONOS</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Leistungen auf dem Gebiet der Bereitstellung
                                    von informationstechnischer Infrastruktur
                                    und verbundenen Dienstleistungen (z.B.
                                    Speicherplatz und/oder Rechenkapazitäten).
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Dienstanbieter</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            1&1 IONOS SE, Elgendorfer Str. 57,
                                            56410 Montabaur, Deutschland
                                        </li>
                                    </ul>
                                </StyledList>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                    <StyledList>
                                        <b>Website</b>
                                        <ul
                                            style={{
                                                listStyleType: '"– "',
                                                marginLeft: '-25px',
                                            }}
                                        >
                                            <li>
                                                <Link
                                                    to="https://www.ionos.de"
                                                    target="_blank"
                                                >
                                                    https://www.ionos.de
                                                </Link>
                                            </li>
                                        </ul>
                                    </StyledList>
                                </StyledList>
                                <StyledList>
                                    <b>Datenschutzerklärung</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            <Link
                                                to="https://www.ionos.de/terms-gtc/terms-privacy"
                                                target="_blank"
                                            >
                                                https://www.ionos.de/terms-gtc/terms-privacy
                                            </Link>
                                        </li>
                                    </ul>
                                </StyledList>
                                <StyledList>
                                    <b>Auftragsverarbeitungsvertrag</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            <Link
                                                to="https://www.ionos.de/terms-gtc/avv/"
                                                target="_blank"
                                            >
                                                https://www.ionos.de/terms-gtc/avv
                                            </Link>
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
        {
            hash: '#plugins',
            question: 'Plugins und eingebettete Funktionen sowie Inhalte',
            answer: (
                <>
                    <p style={{ marginTop: 0 }}>
                        Wir binden in unser Onlineangebot Funktions- und
                        Inhaltselemente ein, die von den Servern ihrer
                        jeweiligen Anbieter (nachfolgend bezeichnet als
                        "Drittanbieter”) bezogen werden. Dabei kann es sich zum
                        Beispiel um Grafiken, Videos oder Stadtpläne handeln
                        (nachfolgend einheitlich bezeichnet als "Inhalte”).
                    </p>
                    <p>
                        Die Einbindung setzt immer voraus, dass die
                        Drittanbieter dieser Inhalte die IP-Adresse der Nutzer
                        verarbeiten, da sie ohne die IP-Adresse die Inhalte
                        nicht an deren Browser senden könnten. Die IP-Adresse
                        ist damit für die Darstellung dieser Inhalte oder
                        Funktionen erforderlich. Wir bemühen uns, nur solche
                        Inhalte zu verwenden, deren jeweilige Anbieter die
                        IP-Adresse lediglich zur Auslieferung der Inhalte
                        verwenden. Drittanbieter können ferner sogenannte
                        Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons"
                        bezeichnet) für statistische oder Marketingzwecke
                        verwenden. Durch die "Pixel-Tags" können Informationen,
                        wie der Besucherverkehr auf den Seiten dieser Website,
                        ausgewertet werden. Die pseudonymen Informationen können
                        ferner in Cookies auf dem Gerät der Nutzer gespeichert
                        werden und unter anderem technische Informationen zum
                        Browser und zum Betriebssystem, zu verweisenden
                        Webseiten, zur Besuchszeit sowie weitere Angaben zur
                        Nutzung unseres Onlineangebotes enthalten als auch mit
                        solchen Informationen aus anderen Quellen verbunden
                        werden.
                    </p>
                    <ul>
                        <StyledList>
                            <b>Verarbeitete Datenarten</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzungsdaten (z.B. besuchte Webseiten,
                                    Interesse an Inhalten, Zugriffszeiten)
                                </li>
                                <li>
                                    Meta-, Kommunikations- und Verfahrensdaten
                                    (z. B. IP-Adressen, Zeitangaben,
                                    Identifikationsnummern, Einwilligungsstatus)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Betroffene Personen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Nutzer (z.B. Webseitenbesucher, Nutzer von
                                    Onlinediensten)
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Zwecke der Verarbeitung</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Bereitstellung unseres Onlineangebotes und
                                    Nutzerfreundlichkeit
                                </li>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>Rechtsgrundlagen</b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Berechtigte Interessen (Art. 6 Abs. 1 S. 1
                                    lit. f) DSGVO)
                                </li>
                            </ul>
                        </StyledList>
                    </ul>
                    <p style={{ marginBottom: 0 }}>
                        <i>
                            Weitere Hinweise zu Verarbeitungsprozessen,
                            Verfahren und Diensten:
                        </i>
                    </p>
                    <ul style={{ margin: 0 }}>
                        <StyledList>
                            <b>
                                Einbindung von Drittsoftware, Skripten oder
                                Frameworks (z. B. jQuery)
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Wir binden in unser Onlineangebot Software
                                    ein, die wir von Servern anderer Anbieter
                                    abrufen (z.B. Funktions-Bibliotheken, die
                                    wir zwecks Darstellung oder
                                    Nutzerfreundlichkeit unseres Onlineangebotes
                                    verwenden). Hierbei erheben die jeweiligen
                                    Anbieter die IP-Adresse der Nutzer und
                                    können diese zu Zwecken der Übermittlung der
                                    Software an den Browser der Nutzer sowie zu
                                    Zwecken der Sicherheit, als auch zur
                                    Auswertung und Optimierung ihres Angebotes
                                    verarbeiten.
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Rechtsgrundlagen</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                        <StyledList>
                            <b>
                                Google Fonts (Bereitstellung auf eigenem Server)
                            </b>
                            <ul
                                style={{
                                    listStyleType: '"– "',
                                    marginLeft: '-25px',
                                }}
                            >
                                <li>
                                    Bereitstellung von Schriftarten-Dateien
                                    zwecks einer nutzerfreundlichen Darstellung
                                    unseres Onlineangebotes
                                </li>
                            </ul>
                            <ul>
                                <StyledList>
                                    <b>Dienstanbieter</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Die Google Fonts werden auf unserem
                                            Server gehostet, es werden keine
                                            Daten an Google übermittelt.
                                        </li>
                                    </ul>
                                </StyledList>
                                <StyledList>
                                    <b>Rechtsgrundlagen:</b>
                                    <ul
                                        style={{
                                            listStyleType: '"– "',
                                            marginLeft: '-25px',
                                        }}
                                    >
                                        <li>
                                            Berechtigte Interessen (Art. 6 Abs.
                                            1 S. 1 lit. f) DSGVO)
                                        </li>
                                    </ul>
                                </StyledList>
                            </ul>
                        </StyledList>
                    </ul>
                </>
            ),
        },
    ];
};

function Privacy() {
    return (
        <Box>
            <Typography
                component="div"
                variant="body1"
                sx={{
                    marginBottom: '15px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                <div>
                    Mit der folgenden Datenschutzerklärung möchten wir Dich
                    darüber aufklären, welche Arten Deiner personenbezogenen
                    Daten (nachfolgend auch kurz als "Daten“ bezeichnet) wir zu
                    welchen Zwecken und in welchem Umfang im Rahmen der
                    Bereitstellung unserer Applikation verarbeiten.
                </div>
                <div>
                    Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
                </div>
            </Typography>
            <Questions
                themes={themes}
                icon={mdiFormatSection}
                initial={'#verantwortlicher'}
            />
        </Box>
    );
}

export default Privacy;
