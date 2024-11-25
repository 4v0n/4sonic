import { Link } from "react-router-dom";
import Button from "../shared/Button";
import InputBar from "../shared/InputBar";

export default function AddSourcePage() {
  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-md px-4">
        <InputBar className="w-full" placeholder="Source name" />
        <InputBar className="w-full mt-2" placeholder="Complete URL, IP or hostname" />
        <InputBar className="w-full mt-2" placeholder="PORT (If not using URL)" />
        <InputBar className="w-full mt-2" placeholder="Username" />
        <InputBar className="w-full mt-2" placeholder="Password" censor={true} />

        <div className="flex mt-2 space-x-2 justify-center">
          <Button icon="add.svg" className="bg-success-light dark:bg-success-dark"/>

          <Link to={"/managesources"}>
            <Button icon="delete.svg" className="bg-danger-light dark:bg-danger-dark"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
