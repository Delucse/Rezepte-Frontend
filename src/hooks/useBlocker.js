import React, {useEffect} from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export function useBlocker(navigationBlockerHandler, canShowDialogPrompt) {
  
    const navigator = React.useContext(UNSAFE_NavigationContext).navigator;

    useEffect(() => {
        if (!canShowDialogPrompt) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                unblock();
                tx.retry();
            }
        };

        navigationBlockerHandler(autoUnblockingTx);
    });

    return unblock;
  });
}
