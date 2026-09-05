import Nav from "./component/nav";
import Section1 from "./component/Section1";
import About from "./component/about";
import Portfolio from "./component/portfolio";
import Skill from "./component/skill";
import Automations from "./component/automations";
import Contact from "./component/contact";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="site">
      <Nav />

      <main>
        <Section1 />
        <About />
        <Portfolio />
        <Skill />
        <Automations />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;