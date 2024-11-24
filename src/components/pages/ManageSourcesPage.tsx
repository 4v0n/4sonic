import { Link } from "react-router-dom";
import Button from "../shared/Button";
import Card from "../shared/Card";

export default function ManageSourcesPage() {
  return (
    <div>

      <Link to={"/settings"}>
        <Button className="bg-danger-light dark:bg-danger-dark">
          Cancel
        </Button>
      </Link>

      <div className="flex justify-center">
        <div className="w-full max-w-md px-4 justify-center">

          <Card title="Example Source (Empty)">
            <div className="w-full flex justify-between items-center">
              <h1>
                (Source Details)
              </h1>
              <div className="flex space-x-2 ">
                <Button
                  icon="refresh.svg"
                />
                <Button
                  icon="edit.svg"
                />
                <Button
                  className="bg-danger-light dark:bg-danger-dark"
                  icon="delete.svg"
                />
              </div>
            </div>
          </Card>

          <Button
            className="bg-success-light dark:bg-success-dark mt-2 mx-auto"
            icon="add.svg"
          >
            Add Source
          </Button>
        </div>
      </div>
    </div>
  );
}
