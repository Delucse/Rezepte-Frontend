import React from 'react';

import Dialog from './Dialog';
import Button from './Button';

function NavigationPrompt(props) {
    const handleDialogClose = () => {
        props.closePrompt(false);
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            title={'Seite verlassen'}
            content={
                <div>
                    Du bist dabei die aktuelle Seite zu verlassen. Damit geht
                    einher, dass alle gemachten Eingaben unwiderruflich gelöscht
                    werden.
                    <br />
                    Bist Du dir also sicher die Seite verlassen zu wollen?
                </div>
            }
            actions={
                <div>
                    <Button
                        variant="outlined"
                        onClick={props.cancelNavigation}
                        sx={{ mr: 1 }}
                    >
                        Abbrechen
                    </Button>
                    <Button
                        variant="contained"
                        onClick={props.confirmNavigation}
                    >
                        Bestätigen
                    </Button>
                </div>
            }
        />
    );
}

export default NavigationPrompt;
