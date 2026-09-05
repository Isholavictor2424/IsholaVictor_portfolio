function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2 className="section-title">A little about me.</h2>
        </div>

        <div className="about-content">
          <p className="about-text">
            I graduated top of my class in Computer Science at LAUTECH, but
            what actually keeps me up at night is the space where{" "}
            <strong>software, automation, and AI</strong> meet.
          </p>

          <p className="about-supporting">
            My work spans frontend development, mobile apps, and building
            automations that connect the tools people already use. I like
            projects where the technical part is only half the job — the
            other half is making something that's genuinely easy for a real
            person to use. Outside of code, I've spent time interning at
            Cephas ICT Hub and OGTECH Networks, picking up how things get
            built in practice, not just in theory.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;