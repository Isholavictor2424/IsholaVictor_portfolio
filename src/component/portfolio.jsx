const projects = [
  {
    number: "01",
    name: "HyperCatch",
    description:
      "A machine learning system that classifies hypertension and hypotension risk — my final year project.",
    label: "Final Year Project",
    technologies: ["Python", "Machine Learning", "Data Analysis", "Healthcare"],
    href: "https://github.com/Isholavictor2424/hyperCatch",
  },
  {
    number: "02",
    name: "NOVIQ",
    description:
      "A school-focused CBT examination platform built to help students get comfortable with computer-based exams ahead of major exams like WAEC's shift to CBT. Teachers create and manage assessments, students sit timed exams online, objective questions are graded instantly, and essays are reviewed manually.",
    label: null,
    technologies: ["React", "Node.js", "PostgreSQL"],
    href: "http://noviq-taupe.vercel.app/",
  },
  {
    number: "03",
    name: "BrainDump",
    description:
      "A simple note-taking app for capturing and organizing ideas before they slip away.",
    label: null,
    technologies: ["React", "JavaScript"],
    href: "https://brain-dump-sigma.vercel.app/",
  },
  {
    number: "04",
    name: "Duvic-Drop",
    description: "A mobile commerce experience I helped design and build.",
    label: null,
    technologies: ["React Native", "JavaScript"],
    href: null,
  },
  {
    number: "05",
    name: "Decodius",
    description: "This site — my personal developer portfolio.",
    label: null,
    technologies: ["React", "CSS"],
    href: null,
  },
];

function Portfolio() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Work</p>
          <h2 className="section-title">Selected projects.</h2>
        </div>

        <div className="work-list">
          {projects.map((project) => {
            const content = (
              <>
                <div className="work-index">{project.number}</div>
                <div className="work-content">
                  <h3 className="work-name">{project.name}</h3>
                  <p className="work-description">{project.description}</p>
                  {project.label && <span className="work-label">{project.label}</span>}
                  <div className="work-tech">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </div>
                <div className="work-arrow" aria-hidden="true">↗</div>
              </>
            );

            if (project.href) {
              return (
                <a
                  className="work-item work-link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  key={project.number}
                  aria-label={`View ${project.name}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <article className="work-item" key={project.number}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;