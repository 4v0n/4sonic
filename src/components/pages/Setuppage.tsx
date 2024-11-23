import Button from "../shared/Button";

interface SetupPageProps {
  onComplete: () => void;
};

export function Setuppage({ onComplete }: SetupPageProps) {

  function completeSetup() {
    localStorage.setItem("firstTime", "false");
    onComplete();
  }

  return (
    <div>
      Setuppage

      <Button icon="playerIcons/play.svg" onClick={completeSetup}/>
    </div>
  );
};