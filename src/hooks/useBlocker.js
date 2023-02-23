import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export default function useBlocker(confirmExit, when) {
    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) {
            return;
        }

        const push = navigator.push;

        navigator.push = (location, ...args) => {
            const result = confirmExit(location);
            if (result !== false) {
                push(location, ...args);
            }
        };

        return () => {
            navigator.push = push;
        };
    }, [navigator, confirmExit, when]);
}
