const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "React Native", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    title: "Automation & AI",
    skills: ["n8n", "Make", "Zapier", "AI Workflows"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Firebase", "Vercel"],
  },
];

function Skill() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">Tools I work with.</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3 className="skill-group-title">{group.title}</h3>
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skill;