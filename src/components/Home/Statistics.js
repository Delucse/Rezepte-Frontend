import React, { useEffect, useState } from 'react';

import api from '../../axiosInstance';

import Chart from 'react-apexcharts';

import { Box, Typography, LinearProgress, useTheme } from '@mui/material';

import moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

const accumulateValuesAndFillGaps = (array) => {
    var lastDate = moment('2022-08', 'YYYY-MM');
    var lastValue = 0;
    const resultArray = [];
    array.forEach((a) => {
        var date = moment(
            `${a._id.year}-${a._id.month.toString().padStart(2, '0')}`,
            'YYYY-MM'
        );
        const monthsTillNextDate = date.diff(lastDate, 'M', false);
        for (let index = 0; index < monthsTillNextDate; index++) {
            if (
                resultArray.length === 0 ||
                lastDate !== resultArray[resultArray.length - 1][0]
            ) {
                resultArray.push([lastDate, lastValue]);
            }
            lastDate = moment(lastDate).add(1, 'month');
        }
        lastValue = lastValue + a.count;
        lastDate = date;
        resultArray.push([lastDate, lastValue]);
    });
    var now = moment();
    const monthsTillNow = now.diff(lastDate, 'M', false);
    for (let index = 0; index < monthsTillNow; index++) {
        lastDate = moment(lastDate).add(1, 'month');
        resultArray.push([lastDate, lastValue]);
    }
    return resultArray;
};

function Statistics() {
    const theme = useTheme();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: '/stats',
            success: (res) => {
                setStats({
                    users: accumulateValuesAndFillGaps(res.data.users),
                    recipes: accumulateValuesAndFillGaps(res.data.recipes),
                    images: accumulateValuesAndFillGaps(res.data.images),
                });
                setLoading(false);
            },
            error: (err) => {
                console.error(err.message);
                setLoading(false);
            },
        };

        api(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    }, []);

    return !loading && stats ? (
        <Box sx={{ width: '100%', height: 'calc(100vh - 55px - 78px - 24px)' }}>
            <Chart
                options={{
                    legend: {
                        show: true,
                        position: 'top',
                        horizontalAlign: 'left',
                        formatter: function (value) {
                            const obj = {
                                Nutzer: 'users',
                                Rezepte: 'recipes',
                                Bilder: 'images',
                            };
                            const data = stats[obj[value]];
                            return `${value} (${data[data.length - 1][1]})`;
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
                    },
                    stroke: {
                        width: 5,
                        curve: 'smooth',
                    },
                    colors: [
                        theme.palette.primary.dark,
                        theme.palette.primary.main,
                        theme.palette.action.disabled,
                    ],
                    xaxis: {
                        tickAmount: 'dataPoints',
                        tickPlacement: 'on',
                        labels: {
                            formatter: function (value) {
                                const date = moment(value);
                                const month = date.format('MMM');
                                if (month === 'Jan.') {
                                    return `${month} '${date.format('YY')}`;
                                }
                                return month;
                            },
                        },
                        type: 'datetime',
                    },
                    tooltip: {
                        theme: theme.palette.mode,
                    },
                }}
                series={[
                    {
                        name: 'Nutzer',
                        data: stats.users,
                    },
                    {
                        name: 'Rezepte',
                        data: stats.recipes,
                    },
                    {
                        name: 'Bilder',
                        data: stats.images,
                    },
                ]}
                type="line"
                width="100%"
                height="100%"
            />
        </Box>
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
        'Die aktuellen Statistiken können gerade nicht abgerufen werden. Versuche es einfach zu einem späteren Zeitpunkt erneut.'
    );
}

export default Statistics;
