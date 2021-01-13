import WorldMap from '@2003scape/rsc-world-map';
import { useEffect } from 'react';

export default function WorldMapComponent() {
    useEffect(() => {
        const worldMap = new WorldMap({
            container: document.getElementById('rsc-world-map')
        });

        worldMap.init().catch((err) => {
            console.error(err);
        });
    }, []);

    return <div id="rsc-world-map" className="rsc-map" />;
}
