import "./App.css";
import background from "./assets/background-logo.svg";

import { LoginForm } from "@/features/auth/components";

function App() {
    return (
        <div className="bg-white w-screen h-screen p-10 flex flex-col ">
            <div>Logo</div>

            <main className="flex-1 w-[80%] flex gap-10 mx-auto ">
                <div className="w-full flex items-center justify-center">
                    {/* <img src={background} alt="" className="h-[500px]" /> */}
                    <p>
                        In the vast, endless expanse of space, a mysterious
                        nebula swirled, its radiant colors glowing like an
                        abstract painting. As the astronaut's ship drifted
                        through the cosmos, the delicate balance of the
                        spacecraft's systems hummed steadily, like a kettle
                        boiling just below the surface. The journey ahead was
                        uncertain, full of paradoxes and enigmas that only the
                        brave could navigate. A hologram flickered to life,
                        displaying the path to a distant planet, an orb of light
                        in the far reaches of the galaxy. It was a land of
                        mystery and discovery, where ancient obelisks and
                        fractals covered the terrain, reflecting the sun’s rays
                        in a dazzling dance. The pilot, standing at the helm,
                        felt a sense of calm amidst the chaos. They knew that in
                        this vast unknown, there were endless possibilities—each
                        quiver of the stars, a sign of what could come next.
                        Even the jaguar-like creatures rumored to roam the alien
                        world had a certain tranquil elegance. As the ship
                        entered a new orbit, the crew looked out the window,
                        captivated by the sight. Their journey had only just
                        begun, but the adventure promised to be something truly
                        unique—an eternal, radiant voyage through the cosmos,
                        full of wonder and awe.
                    </p>
                </div>

                <LoginForm />
            </main>
        </div>
    );
}

export default App;
