/* eslint-disable react-hooks/exhaustive-deps */

// https://codesandbox.io/s/navigating-prompt-forked-eqi9ff?file=/src/Components/DialogLeavingPage.js

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

export default function usePrompt(canShowDialogPrompt) {
    const navigate = useNavigate();

    const [showDialogPrompt, setShowDialogPrompt] = useState(false);
    const [wantToNavigateTo, setWantToNavigateTo] = useState(null);
    const [isNavigationConfirmed, setIsNavigationConfirmed] = useState(false);

    const handleNavigationBlocking = useCallback(
        (locationToNavigateTo) => {
            if (
                !isNavigationConfirmed &&
                locationToNavigateTo.nextLocation.pathname !==
                    locationToNavigateTo.currentLocation.pathname
            ) {
                setShowDialogPrompt(true);
                setWantToNavigateTo(locationToNavigateTo.nextLocation);
                return true;
            }
            return false;
        },
        [isNavigationConfirmed]
    );

    const cancelNavigation = useCallback(() => {
        setIsNavigationConfirmed(false);
        setShowDialogPrompt(false);
    }, []);

    const confirmNavigation = useCallback(() => {
        setIsNavigationConfirmed(true);
        setShowDialogPrompt(false);
    }, []);

    useEffect(() => {
        if (isNavigationConfirmed && wantToNavigateTo) {
            navigate(wantToNavigateTo.pathname);
        }
    }, [isNavigationConfirmed, wantToNavigateTo]);

    useBlocker(handleNavigationBlocking, canShowDialogPrompt);

    return [showDialogPrompt, confirmNavigation, cancelNavigation];
}
