import ButtonWheel from '../components/button-wheel';
import Container from '../components/container';
import Header from '../components/header';

const WHEEL_LINKS = [
    {
        href: './manual',
        name: 'Manual',
        title: 'How to play RuneScape'
    },
    {
        href: './support',
        name: 'Customer Support',
        title: 'Message the moderators'
    },
    {
        href: './community',
        name: 'Community',
        title: 'Forums, chat-rooms and places to discuss RuneScape'
    },
    {
        href: './support',
        name: 'Message Centre',
        title: 'Read messages sent by moderators'
    },
    {
        href: './news',
        name: 'News & Updates',
        title: 'Read the latest news about RuneScape'
    },
    {
        href: './library',
        name: 'Library of Varrock',
        title: 'Explore intruiging RuneScape lore'
    },
    {
        href: './hiscores',
        name: 'Hiscores',
        title: 'See how your skills compare against the community'
    }
];

export default function Home() {
    return (
        <div>
            <Header></Header>
            <Container>
                <img
                    className="rsc-logo"
                    src="./runescape.png"
                    alt="RuneScape logo"
                />
                <p className="rsc-player-count">
                    There are currently 12345 people playing!
                </p>
                <ButtonWheel links={WHEEL_LINKS} />
            </Container>
        </div>
    );
}
