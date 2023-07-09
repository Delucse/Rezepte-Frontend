import React from 'react';

import Link from '../components/Link';
import Questions from '../components/Questions';

import { Box, Typography } from '@mui/material';
import { mdiFormatSection } from '@mdi/js';

const themes = () => {
    return [
        {
            title: 'Haftungsausschluss',
            hash: '#haftungsausschluss',
            questions: [
                {
                    hash: '#haftunginhalte',
                    question: 'Haftung für Inhalte',
                    answer: (
                        <div>
                            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG
                            für eigene Inhalte auf diesen Seiten nach den
                            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
                            10 TMG sind wir als Diensteanbieter jedoch nicht
                            verpflichtet, übermittelte oder gespeicherte fremde
                            Informationen zu überwachen oder nach Umständen zu
                            forschen, die auf eine rechtswidrige Tätigkeit
                            hinweisen. Verpflichtungen zur Entfernung oder
                            Sperrung der Nutzung von Informationen nach den
                            allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                            diesbezügliche Haftung ist jedoch erst ab dem
                            Zeitpunkt der Kenntnis einer konkreten
                            Rechtsverletzung möglich. Bei Bekanntwerden von
                            entsprechenden Rechtsverletzungen werden wir diese
                            Inhalte umgehend entfernen.
                        </div>
                    ),
                },
                {
                    hash: '#haftunglinks',
                    question: 'Haftung für Links',
                    answer: (
                        <div>
                            Diese Website enthält Links zu externen Websiten
                            Dritter, auf deren Inhalte kein Einfluss genommen
                            werden kann. Deshalb kann für diese fremden Inhalte
                            auch keine Gewähr übernommen werden. Für die Inhalte
                            der verlinkten Seiten ist stets der jeweilige
                            Anbieter oder Betreiber der Seiten verantwortlich.
                            Die verlinkten Seiten wurden zum Zeitpunkt der
                            Verlinkung auf mögliche Rechtsverstöße überprüft.
                            Rechtswidrige Inhalte waren zum Zeitpunkt der
                            Verlinkung nicht erkennbar. Eine permanente
                            inhaltliche Kontrolle der verlinkten Seiten ist
                            jedoch ohne konkrete Anhaltspunkte einer
                            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden
                            von Rechtsverletzungen werden derartige Links
                            umgehend von dieser Website auf die
                            rechtsverletzende Seite entfernt.
                        </div>
                    ),
                },
                {
                    hash: '#urheberrecht',
                    question: 'Urheberrecht',
                    answer: (
                        <div>
                            Die durch die Diensteanbieter, deren Mitarbeiter und
                            beauftragte Dritte erstellten Inhalte und Werke auf
                            diesen Seiten unterliegen dem deutschen
                            Urheberrecht. Die Vervielfältigung, Bearbeitung,
                            Verbreitung und jede Art der Verwertung außerhalb
                            der Grenzen des Urheberrechtes bedürfen der
                            vorherigen schriftlichen Zustimmung des jeweiligen
                            Autors bzw. Erstellers. Downloads und Kopien dieser
                            Seite sind nur für den privaten, nicht kommerziellen
                            Gebrauch gestattet. Soweit die Inhalte auf dieser
                            Seite nicht vom Betreiber erstellt wurden, werden
                            die Urheberrechte Dritter beachtet. Insbesondere
                            werden Inhalte Dritter als solche gekennzeichnet.
                            Sollten Sie trotzdem auf eine
                            Urheberrechtsverletzung aufmerksam werden, bitten
                            wir um einen entsprechenden Hinweis. Bei
                            Bekanntwerden von Rechtsverletzungen werden
                            derartige Inhalte umgehend entfernt.
                        </div>
                    ),
                },
            ],
        },
    ];
};

function LegalNotice() {
    return (
        <Box>
            <Typography
                component="div"
                variant="body1"
                sx={{
                    display: 'flex',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                Kontakt
            </Typography>
            <Box>
                <Typography
                    component="div"
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    {process.env.REACT_APP_LEGALNOTICE_OPERATOR}
                </Typography>
                <Typography
                    component="div"
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    {process.env.REACT_APP_LEGALNOTICE_STREET}
                </Typography>
                <Typography
                    component="div"
                    variant="body1"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    {process.env.REACT_APP_LEGALNOTICE_CITY}
                </Typography>
                <Link to={`mailto:${process.env.REACT_APP_LEGALNOTICE_MAIL}`}>
                    {process.env.REACT_APP_LEGALNOTICE_MAIL}
                </Link>
            </Box>

            <Questions
                themes={themes}
                icon={mdiFormatSection}
                style={{ marginTop: '30px' }}
            />

            <Typography
                component="div"
                variant="body1"
                sx={{
                    marginTop: '30px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                <div>
                    Die Nutzung von im Rahmen der Impressumspflicht
                    veröffentlichten Kontaktdaten durch Dritte zur übersendung
                    von nicht ausdrücklich angeforderter Werbung und
                    Informationsmaterialien wird hiermit ausdrücklich untersagt.
                </div>
                <div>
                    Die Anbieter und alle auf dieser Website genannten Dritten
                    behalten sich ausdrücklich rechtliche Schritte im Falle der
                    unverlangten Zusendung von Werbeinformationen vor. Gleiches
                    gilt für die kommerzielle Verwendung und Weitergabe der
                    Daten.
                </div>
            </Typography>
        </Box>
    );
}

export default LegalNotice;
