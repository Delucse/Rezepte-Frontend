import { useState, useEffect } from 'react';

export function useInViewport(ref) {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setState(entry.isIntersecting);
        });

        const elem = ref.current;

        elem && observer.observe(elem);
    }, [ref]);

    return isVisible;
}
