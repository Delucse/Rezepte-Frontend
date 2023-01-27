import React from 'react';

import { useSelector } from 'react-redux';

import moment from 'moment';

function Date() {
    const date = useSelector((state) => state.recipe.date);

    return (
        <div style={{ fontStyle: 'italic' }}>
            {`erstellt am ${moment(date).format('DD.MM.YYYY, HH:mm')} Uhr`}
        </div>
    );
}

export default Date;
