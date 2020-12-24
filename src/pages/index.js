import ButtonWheel from '../components/button-wheel';
import Container from '../components/container';
import Header from '../components/header';

const WHEEL_LINKS = [
    {
        href: '/manual',
        name: 'Manual',
        title: 'Detailed info on all aspects of the game.'
    },
    {
        href: '/community',
        name: 'Community',
        title: 'Discuss the game with fellow players!'
    },
    {
        href: '/support',
        name: 'Customer Support',
        title: 'Questions? Contact our staff.'
    },
    {
        href: '/support',
        name: 'Message Centre',
        title: 'Your messages from our staff.'
    },
    {
        href: '/library',
        name: 'Library of Varrock',
        title: 'Stories and letters about RuneScape.'
    },
    {
        href: '/news',
        name: 'News & Updates',
        title: 'Read the latest news about the game.'
    },
    {
        href: '/hiscores',
        name: 'Hiscores',
        title: 'See how your character compares against the community.'
    }
];

export default function Home() {
    return (
        <div>
            <Header />
            <Container>
                <header>
                    <img
                        className="rsc-logo"
                        src="./runescape.png"
                        alt="RuneScape logo"
                    />
                    <p className="rsc-player-count">
                        There are currently 12345 people playing!
                    </p>
                </header>
                <main>
                    <ButtonWheel links={WHEEL_LINKS} />
                    <br />
                </main>
            </Container>
        </div>
    );
}
