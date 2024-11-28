import { Link } from "react-router-dom";
import Button from "../shared/Button";
import Card from "../shared/Card";
import { useEffect, useState } from "react";
import SourceManager from "../../sources/SourceManager";
import { Source } from "../../sources/Source";

export default function ManageSourcesPage() {
  const sourceManager = SourceManager.getInstance();

  const [activeSources, setActiveSources] = useState(sourceManager.getSources());

  useEffect(() => {
    function handleSourceUpdate(event: CustomEvent<Map<string, Source>>) {
      setActiveSources(new Map(event.detail));
    }

    sourceManager.addEventListener("sourcesUpdated", handleSourceUpdate as EventListener);

    // Cleanup function
    return () => {
      sourceManager.removeEventListener("sourcesUpdated", handleSourceUpdate as EventListener);
    };
  }, [sourceManager]);

  function deleteSource(source: Source) {
    sourceManager.deleteSource(source);
    sourceManager.writeSources();
  }

  return (
    <div>
      <Link to={"/settings"}>
        <Button className="bg-danger-light dark:bg-danger-dark">Cancel</Button>
      </Link>

      <div className="flex justify-center">
        <div className="w-full max-w-md px-4 justify-center">
          <ul>
            {activeSources.size === 0 ? (
              <li>
                <Card title="No sources">
                  Add a source to get started!
                </Card>
              </li>
            ) : (
              [...activeSources.entries()].map(([sourceName, source]) => (
                <li key={sourceName}>
                  <Card title={sourceName}>
                    <div className="w-full flex justify-between items-center">
                      <h1>Subsonic Server</h1>
                      <div className="flex space-x-2 ">
                        {/* <Button icon="refresh.svg" /> */}
                        {/* <Button icon="edit.svg" /> */}
                        <Button
                          className="bg-danger-light dark:bg-danger-dark"
                          icon="delete.svg"
                          onClick={() => deleteSource(source)}
                        />
                      </div>
                    </div>
                  </Card>
                </li>
              )))}
          </ul>

          <Link to={"/addsource"}>
            <Button
              className="bg-success-light dark:bg-success-dark mt-2 mx-auto"
              icon="add.svg"
            >
              Add Source
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
