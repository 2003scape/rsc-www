import Router, { useRouter } from 'next/router';
import UsernameInput from './username-input';
import { formatUsername } from '../username';

function HiscoreInputWrap(props) {
    return (
        <div className="rsc-stone-box" onSubmit={props.onSubmit}>
            <form method="get" action={props.action}>
                {props.children}
                <br />
                <input className="rsc-input" type="submit" value="Search" />
            </form>
        </div>
    );
}

function RankSearch(props) {
    const router = useRouter();
    const skill = router.query.skill || 'overall';

    const action = `/hiscores/${skill}`;

    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action={action}>
            <label htmlFor="search-rank">Search by rank</label>
            <input
                className="rsc-input"
                id="search-rank"
                name="rank"
                type="number"
                min="1"
                required={true}
                defaultValue={props.rank}
            />
        </HiscoreInputWrap>
    );
}

function NameSearch(props) {
    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action="/hiscores">
            <label htmlFor="search-name">Search by name</label>
            <UsernameInput
                id="search-name"
                name="name"
                defaultValue={props.username}
            />
        </HiscoreInputWrap>
    );
}

function NameCompare(props) {
    return (
        <HiscoreInputWrap onSubmit={props.onSubmit} action="/hiscores">
            <label htmlFor="search-name-compare">Compare users</label>
            <UsernameInput
                id="search-name-compare"
                name="name"
                defaultValue={props.username}
            />
            <UsernameInput
                name="opponent"
                aria-label="Opponent username"
                defaultValue={props.opponent}
            />
        </HiscoreInputWrap>
    );
}

export default function HiscoreControls() {
    const router = useRouter();

    const skill = router.query.skill || 'overall';
    const rank = +(router.query.rank || 1);
    const username = formatUsername(router.query.name || '');
    const opponent = formatUsername(router.query.opponent || '');

    const onRankSubmit = (e) => {
        e.preventDefault();

        const submittedRank = +e.target[0].value;

        Router.push({
            pathname: `/hiscores/skill/${skill}`,
            query: { rank: submittedRank }
        });

        window.scrollTo(0, 0);
    };

    const onNameSubmit = (e) => {
        e.preventDefault();

        const submittedName = e.target[0].value;

        Router.push({
            pathname: '/hiscores',
            query: { name: submittedName }
        });

        window.scrollTo(0, 0);
    };

    const onCompareSubmit = (e) => {
        e.preventDefault();

        const submittedName = e.target[0].value;
        const opponentName = e.target[1].value;

        Router.push({
            pathname: '/hiscores',
            query: { name: submittedName, opponent: opponentName }
        });

        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className="rsc-row">
                <div className="rsc-col rsc-col-50">
                    <RankSearch rank={rank} onSubmit={onRankSubmit} />
                </div>
                <div className="rsc-col rsc-col-50">
                    <NameSearch username={username} onSubmit={onNameSubmit} />
                </div>
            </div>
            <br />
            <div className="rsc-row">
                <div className="rsc-col rsc-col-50">
                    <NameCompare
                        username={username}
                        opponent={opponent}
                        onSubmit={onCompareSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
