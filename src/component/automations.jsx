const workflows = [
  {
    name: "Post-trip WhatsApp sender",
    description:
      "An n8n workflow that automatically sends a personalized WhatsApp message after a trip is completed, using WSAPI for delivery.",
    tools: ["n8n", "WSAPI", "HTTP Request nodes"],
  },
  {
    name: "Telegram weather bot",
    description:
      "A Make workflow that replies to a Telegram message with the current weather for a requested location.",
    tools: ["Make", "Telegram API", "Weather API"],
  },
  {
    name: "Gmail auto-reply",
    description:
      "An automation that watches an inbox and sends a context-aware reply the moment a new email lands.",
    tools: ["Zapier", "Gmail API"],
  },
  {
    name: "Event registration confirmation",
    description:
      "A signup automation that sends a confirmation email and blocks duplicate registrations by checking for an existing email before confirming.",
    tools: ["Make", "Email", "Duplicate-check logic"],
  },
];

function Automations() {
  return (
    <section className="section" id="automations">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Automation &amp; AI</p>
          <h2 className="section-title">Workflows I've built.</h2>
          <p className="about-supporting" style={{ marginTop: "1rem" }}>
            A few of the automations I've put together while learning
            n8n, Make, and Zapier — small, real workflows rather than demos.
          </p>
        </div>

        <div className="automation-grid">
          {workflows.map((workflow) => (
            <div className="automation-card" key={workflow.name}>
              <h3 className="automation-name">{workflow.name}</h3>
              <p className="automation-description">{workflow.description}</p>
              <div className="automation-tools">
                {workflow.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Automations;