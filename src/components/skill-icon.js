export default function SkillIcon({ name }) {
    const formattedSkillName = name[0].toUpperCase() + name.slice(1);

    return (
        <img
            style={{ verticalAlign: 'middle', marginRight: '4px' }}
            src={`/skills/${name}.png`}
            alt={`${formattedSkillName} icon`}
        />
    );
}

