const skillNames = new Set(
    ['overall', ...require('@2003scape/rsc-data/skill-names')]
);

import Link from 'next/link';
import SkillIcon from './skill-icon';

export default function SkillList(props) {
    const skillList = Array.from(skillNames).map((name, i) => {
        const formattedSkillName = name[0].toUpperCase() + name.slice(1);
        const icon = i !== 0 ? SkillIcon({ name }) : '';
        const fontWeight = name === props.selected ? 'bold' : 'normal';

        return (
            <li key={i}>
                <Link href={`/hiscores/skill/${name}#ranks`}>
                    <a
                        className="rsc-link"
                        title={`Top players in ${formattedSkillName}`}
                        style={{ fontWeight }}
                    >
                        {icon}
                        <span style={{ verticalAlign: 'middle' }}>
                            {formattedSkillName}
                        </span>
                    </a>
                </Link>
            </li>
        );
    });

    return <ul>{skillList}</ul>;
}
