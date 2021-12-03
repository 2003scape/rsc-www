import React, { useEffect } from 'react';
import Container from '../components/container';
import Header from '../components/header';

export default function Play() {

    const gameScreen = async (mcContainer) => {
        const args = window.location.hash.slice(1).split(',');
        const mc = new window.mudclient(mcContainer);

        window.mcOptions = mc.options;

        Object.assign(mc.options, {
            middleClickCamera: true,
            mouseWheel: true,
            resetCompass: true,
            zoomCamera: true,
            accountManagement: true,
            mobile: false
        });

        mc.members = args[0] === 'members';
        mc.server = args[1] ? args[1] : '127.0.0.1';
        mc.port = args[2] && !isNaN(+args[2]) ? +args[2] : 43595;

        mc.threadSleep = 10;
        await mc.startApplication(512, 346, 'Runescape by Andrew Gower');
    }

    useEffect(() => {
        const mcContainer = document.getElementById('game-container');
        if (mcContainer && window && window.mudclient) {
            gameScreen(mcContainer)
        }
    }, [])

    return (
        <div>
            <Header pageName="Select Game Type" />
            <Container>
                <div id="game-container" style={{ margin: '0 auto' }} />
            </Container>
        </div>
    );
}
