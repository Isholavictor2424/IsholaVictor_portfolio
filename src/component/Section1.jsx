import profileImage from "../assets/updatedPic.png";

function Section1() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Frontend Developer &amp; AI Automation Builder</p>

          <h1 className="hero-name">Victor Ishola</h1>

          <p className="hero-title">
            I build interfaces people enjoy using — then wire up the
            automation that makes them actually work.
          </p>

          <p className="hero-description">
            Based in Ogbomoso, Nigeria. I studied Computer Science at LAUTECH,
            and now split my time between frontend development in React and
            React Native, and building AI-driven automations with tools like
            n8n and Make.
          </p>

          <div className="hero-stack" aria-label="Core technologies">
            <span>React</span>
            <span>React Native</span>
            <span>n8n</span>
            <span>AI Automation</span>
          </div>

          <div className="hero-actions">
            <a className="button-primary" href="#work">
              See my work
            </a>

            <a className="button-secondary" href="#contact">
              Say hello
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-frame">
            <img className="hero-image" src={profileImage} alt="Victor Ishola" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;