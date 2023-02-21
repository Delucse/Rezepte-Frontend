import React, { useEffect, useState } from 'react';

import api from '../../axiosInstance';

import Chart from 'react-apexcharts';

import Link from '../Link';

import {
    Box,
    Typography,
    LinearProgress,
    useTheme,
    Grid,
    List,
    ListItem as MuiListItem,
    ListItemText,
    ListItemIcon,
    Divider,
} from '@mui/material';

import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

const fillGaps = (array) => {
    var lastDate = moment('2022-08', 'YYYY-MM');
    var lastValue = 0;
    const accumulateArray = [];
    const originArray = [];
    array.forEach((a) => {
        var date = moment(
            `${a.year}-${a.month.toString().padStart(2, '0')}`,
            'YYYY-MM'
        );
        const monthsTillNextDate = date.diff(lastDate, 'M', false);
        for (let index = 0; index < monthsTillNextDate; index++) {
            if (
                accumulateArray.length === 0 ||
                lastDate !== accumulateArray[accumulateArray.length - 1][0]
            ) {
                accumulateArray.push([lastDate, lastValue]);
                originArray.push([lastDate, 0]);
            }
            lastDate = moment(lastDate).add(1, 'month');
        }
        lastValue = lastValue + a.count;
        lastDate = date;
        accumulateArray.push([lastDate, lastValue]);
        originArray.push([lastDate, a.count]);
    });
    var now = moment();
    const monthsTillNow = now.diff(lastDate, 'M', false);
    for (let index = 0; index < monthsTillNow; index++) {
        lastDate = moment(lastDate).add(1, 'month');
        accumulateArray.push([lastDate, lastValue]);
        originArray.push([lastDate, 0]);
    }
    return {
        accumulate: accumulateArray,
        origin: originArray,
        total: lastValue,
    };
};

const ListItem = ({ children, sub }) => {
    return (
        <MuiListItem
            disablePadding
            sx={{
                alignItems: 'baseline',
                marginLeft: sub ? '25px' : 0,
                width: sub ? 'calc(100% - 25px)' : '100%',
            }}
        >
            <ListItemIcon
                sx={{
                    minWidth: '25px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                {sub ? '-' : '•'}
            </ListItemIcon>
            <ListItemText
                sx={{
                    margin: 0,
                    color: (theme) => theme.palette.text.primary,
                }}
                primaryTypographyProps={{
                    sx: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        fontWeight: sub ? 'inherit' : 450,
                    },
                }}
            >
                {children}
            </ListItemText>
        </MuiListItem>
    );
};

const Heading = ({ text }) => {
    return (
        <Typography
            variant="body1"
            color="text.primary"
            sx={{
                fontWeight: 'bold',
            }}
        >
            {text}
        </Typography>
    );
};

const Graph = ({ type, series, legend, color, stroke, width, height }) => {
    const theme = useTheme();

    return (
        <Chart
            options={{
                legend: {
                    show: legend ? legend : true,
                    position: 'top',
                    horizontalAlign: 'left',
                    formatter: function (value) {
                        return value;
                    },
                    fontSize: '14px',
                    fontFamily: 'Arial',
                    fontWeight: 400,
                    onItemClick: false,
                    onItemHover: {
                        highlightDataSeries: true,
                    },
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    width: '100%',
                    stacked: false,
                    background: theme.palette.background.default,
                },
                stroke: stroke ? stroke : {},
                colors: color
                    ? [theme.palette.primary[color]]
                    : [
                          theme.palette.primary.dark,
                          theme.palette.primary.main,
                          theme.palette.primary.light,
                      ],
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(0);
                        },
                    },
                },
                theme: {
                    mode: theme.palette.mode,
                },
                tooltip: {
                    theme: theme.palette.mode,
                },
            }}
            series={series}
            type={type}
            width={width ? width : '100%'}
            height={height ? height : '100%'}
        />
    );
};

function Statistics() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/stats')
            .then((res) => {
                setStats({
                    ...res.data,
                    users: {
                        ...res.data.users,
                        count: fillGaps(res.data.users.count),
                    },
                    recipes: {
                        ...res.data.recipes,
                        count: fillGaps(res.data.recipes.count),
                    },
                    images: {
                        ...res.data.images,
                        count: fillGaps(res.data.images.count),
                    },
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);

    return !loading && stats ? (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <Divider
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            bottom: '-8px',
                            left: '16px',
                            right: '0px',
                            width: {
                                xs: 'calc(100% - 16px)',
                                md: 'calc(100% - 24px)',
                            },
                        }}
                    />
                    <Divider
                        orientation="vertical"
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            display: { xs: 'none', md: 'inherit' },
                            bottom: '-8px',
                            top: '16px',
                            left: '16px',
                            width: 'calc(100% - 8px)',
                            height: 'calc(100% - 16px - 8px)',
                        }}
                    />
                    <Box
                        sx={{
                            marginRight: { xs: 0, md: '8px' },
                            marginBottom: '8px',
                        }}
                    >
                        <Heading text="Zahlen & Fakten" />
                        <List>
                            <ListItem>Nutzer</ListItem>
                            <ListItem sub>
                                Gesamtanzahl: {stats.users.count.total}
                            </ListItem>
                            <ListItem>Rezepte</ListItem>
                            <ListItem sub>
                                Gesamtanzahl: {stats.recipes.count.total}
                            </ListItem>
                            {stats.recipes.user.count > 0 ? (
                                <ListItem sub>
                                    <div>
                                        fleißigster Autor ist{' '}
                                        <Link
                                            to={`/rezepte?autor=${stats.recipes.user.name}`}
                                        >
                                            {stats.recipes.user.name}
                                        </Link>{' '}
                                        ({stats.recipes.user.count} Rezepte)
                                    </div>
                                </ListItem>
                            ) : null}
                            {stats.recipes.count.total > 0 &&
                            stats.users.count.total > 0 ? (
                                <ListItem sub>
                                    Ø{' '}
                                    {(
                                        stats.recipes.count.total /
                                        stats.users.count.total
                                    ).toLocaleString('de-De', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                    })}{' '}
                                    Rezepte pro Nutzer
                                </ListItem>
                            ) : null}
                            <ListItem>Favoriten</ListItem>
                            <ListItem sub>
                                Gesamtanzahl: {stats.favorites.total}
                            </ListItem>
                            {stats.favorites.user.count > 0 ? (
                                <ListItem sub>
                                    größtes Kochbuch besitzt{' '}
                                    {stats.favorites.user.name} (
                                    {stats.favorites.user.count} Rezepte)
                                </ListItem>
                            ) : null}
                            {stats.favorites.recipe.count > 0 ? (
                                <ListItem sub>
                                    <div>
                                        Lieblingsrezept ist{' '}
                                        <Link
                                            to={`/rezepte/${stats.favorites.recipe._id}`}
                                        >
                                            {stats.favorites.recipe.title}
                                        </Link>{' '}
                                        ({stats.favorites.recipe.count} Nutzer)
                                    </div>
                                </ListItem>
                            ) : null}
                            <ListItem>Bilder</ListItem>
                            <ListItem sub>
                                Gesamtanzahl: {stats.images.count.total}
                            </ListItem>
                            {stats.images.user.count > 0 ? (
                                <ListItem sub>
                                    der heimliche Star-Food-Fotograph ist{' '}
                                    {stats.images.user.name} (
                                    {stats.images.user.count} Bilder){' '}
                                </ListItem>
                            ) : null}
                            {stats.images.count.total > 0 &&
                            stats.users.count.total > 0 ? (
                                <ListItem sub>
                                    Ø{' '}
                                    {(
                                        stats.images.count.total /
                                        stats.users.count.total
                                    ).toLocaleString('de-De', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                    })}{' '}
                                    hochgeladene Bilder pro Nutzer
                                </ListItem>
                            ) : null}
                            {stats.images.count.total > 0 &&
                            stats.recipes.count.total > 0 ? (
                                <ListItem sub>
                                    Ø{' '}
                                    {(
                                        stats.images.count.total /
                                        stats.recipes.count.total
                                    ).toLocaleString('de-De', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                    })}{' '}
                                    hochgeladene Bilder pro Rezept
                                </ListItem>
                            ) : null}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <Divider
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            bottom: '-8px',
                            left: { xs: '16px', md: '24px' },
                            right: '8px',
                            width: {
                                xs: 'calc(100% - 16px)',
                                md: 'calc(100% - 24px)',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: { xs: 0, md: '8px' },
                            marginBottom: '8px',
                            marginTop: { xs: '8px', md: 0 },
                        }}
                    >
                        <Heading text="Nutzer" />
                        {stats.users.count.total > 0 ? (
                            <Graph
                                legend={false}
                                color="dark"
                                series={[
                                    {
                                        name: 'Nutzer',
                                        data: stats.users.count.origin,
                                    },
                                ]}
                                type="bar"
                                height="400px"
                            />
                        ) : (
                            <Typography variant="body2" color="text.primary">
                                keine Daten verfügbar
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <Divider
                        orientation="vertical"
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            display: { xs: 'none', md: 'inherit' },
                            bottom: '-8px',
                            top: '24px',
                            left: '16px',
                            width: 'calc(100% - 8px)',
                            height: 'calc(100% - 24px - 16px)',
                        }}
                    />
                    <Divider
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            bottom: '0px',
                            left: '16px',
                            right: '0px',
                            width: {
                                xs: 'calc(100% - 16px)',
                                md: 'calc(100% - 8px)',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            marginRight: { xs: 0, md: '8px' },
                            marginBottom: '16px',
                            marginTop: '8px',
                        }}
                    >
                        <Heading text="Rezepte" />
                        {stats.recipes.count.total > 0 ? (
                            <Graph
                                legend={false}
                                color="main"
                                series={[
                                    {
                                        name: 'Rezepte',
                                        data: stats.recipes.count.origin,
                                    },
                                ]}
                                type="bar"
                                height="400px"
                            />
                        ) : (
                            <Typography variant="body2" color="text.primary">
                                keine Daten verfügbar
                            </Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                    <Divider
                        absolute
                        sx={{
                            borderColor: (theme) =>
                                theme.palette.action.disabled,
                            bottom: '0px',
                            left: { xs: '16px', md: '8px' },
                            right: '0px',
                            width: {
                                xs: 'calc(100% - 16px)',
                                md: 'calc(100% - 8px)',
                            },
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: { xs: 0, md: '8px' },
                            marginBottom: '16px',
                            marginTop: { xs: 0, md: '8px' },
                        }}
                    >
                        <Heading text="Bilder" />
                        {stats.images.count.total > 0 ? (
                            <Graph
                                legend={false}
                                color="light"
                                series={[
                                    {
                                        name: 'Bilder',
                                        data: stats.images.count.origin,
                                    },
                                ]}
                                type="bar"
                                height="400px"
                            />
                        ) : (
                            <Typography variant="body2" color="text.primary">
                                keine Daten verfügbar
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Box
                sx={{
                    paddingTop: '16px',
                }}
            >
                <Heading text="Gesamtentwicklung" />
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 55px - 78px - 24px - 24px)',
                        marginBottom: 2,
                    }}
                >
                    <Graph
                        legend
                        stroke={{ width: 5, curve: 'smooth' }}
                        series={[
                            {
                                name: 'Nutzer',
                                data: stats.users.count.accumulate,
                            },
                            {
                                name: 'Rezepte',
                                data: stats.recipes.count.accumulate,
                            },
                            {
                                name: 'Bilder',
                                data: stats.images.count.accumulate,
                            },
                        ]}
                        type="line"
                    />
                </Box>
            </Box>
        </>
    ) : loading ? (
        <Box
            sx={{
                height: 'calc(100vh - 55px - 78px - 24px)',
                position: 'relative',
                margin: '0 15%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                }}
            >
                <LinearProgress sx={{ marginBottom: '10px' }} />
                <Typography
                    variant="body2"
                    sx={{ textAlign: 'center' }}
                    color="text.secondary"
                >
                    Statisitken werden geladen
                </Typography>
            </Box>
        </Box>
    ) : (
        <Typography variant="body2" color="text.primary">
            Die aktuellen Statistiken können gerade nicht abgerufen werden.
            Versuche es einfach zu einem späteren Zeitpunkt erneut.
        </Typography>
    );
}

export default Statistics;
