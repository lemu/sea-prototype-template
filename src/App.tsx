import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextLink, Card } from "@rafal.lemieszewski/tide-ui";
import seaLogo from "./assets/sea.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <img src={seaLogo} className="logo sea mb-8" alt="SEA logo" />
      <Card className="p-8">
        <h1 className="text-heading-lg text-center">SEA Prototype Template</h1>
        <div className="mt-4 flex flex-col items-center gap-4">
          <Button
            icon="anchor"
            iconPosition="left"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
          <Link to="/section">
            <TextLink>Go to /section</TextLink>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default App;
