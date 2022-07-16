/* eslint-disable react-hooks/exhaustive-deps */

// https://codesandbox.io/s/navigating-prompt-forked-eqi9ff?file=/src/Components/DialogLeavingPage.js

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useBlocker } from './useBlocker';

export function usePrompt(canShowDialogPrompt) {
    const navigate = useNavigate();

    const currentLocation = useLocation();

    const [showDialogPrompt, setShowDialogPrompt] = useState(false);
    const [wantToNavigateTo, setWantToNavigateTo] = useState(null);
    const [isNavigationConfirmed, setIsNavigationConfirmed] = useState(false);

    const handleNavigationBlocking = useCallback(
        (locationToNavigateTo) => {
            if (
                !isNavigationConfirmed &&
                locationToNavigateTo.location.pathname !==
                    currentLocation.pathname
            ) {
                setShowDialogPrompt(true);
                setWantToNavigateTo(locationToNavigateTo);
                return false;
            }
            return true;
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
            navigate(wantToNavigateTo.location.pathname);
        }
    }, [isNavigationConfirmed, wantToNavigateTo]);

    useBlocker(handleNavigationBlocking, canShowDialogPrompt);

    return [showDialogPrompt, confirmNavigation, cancelNavigation];
}
