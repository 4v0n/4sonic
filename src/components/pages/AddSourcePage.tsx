import { Link } from "react-router-dom";
import Button from "../shared/Button";
import InputBar from "../shared/InputBar";
import CryptoJS from "crypto-js";
import { useState } from "react";

interface serverCredentials {
  name: string;
  uri: string;
  username: string;
  token: string;
  salt: string;
};

export default function AddSourcePage() {
  const [sourceName, setSourceName] = useState("");
  const [sourceIP, setSourceIP] = useState("");
  const [sourcePort, setSourcePort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function genAuthToken(p: string) {
    const salt = Math.random().toString(36).substring(2, 8);
    const token = CryptoJS.MD5(p + salt).toString();
    return { token, salt };
  }

  function hasSameSource(servers: serverCredentials[], newSource: serverCredentials): boolean {
    return servers.some((server) => {
      return server.uri === newSource.uri;
    });
  }

  function saveSourceToLocal(credentials: serverCredentials) {
    let servers: serverCredentials[];
    const serversString = localStorage.getItem("servers");

    if (serversString) {
      servers = JSON.parse(serversString);
    }
    else {
      servers = [];
    }

    console.log(!hasSameSource(servers, credentials));

    if (!hasSameSource(servers, credentials)) {
      servers.push(credentials);

      localStorage.setItem("servers", JSON.stringify(servers));
    }
    else {
      alert("This source has already been added!");
    }
  }

  function saveSource() {
    if (!sourceIP || !username || !password) {
      // error
      return;
    }

    const { token, salt } = genAuthToken(password);

    const baseURL = `${sourceIP}${sourcePort ? `:${sourcePort}` : ""}/rest`;

    const authParams = {
      u: username,
      t: token,
      s: salt,
      v: "1.16.1",
      c: "4Sonic",
      f: "json",
    };

    const paramString = `?u=${authParams.u}&t=${authParams.t}&s=${authParams.s}&v=${authParams.v}&c=${authParams.c}&f=${authParams.f}`;

    fetch(baseURL + "/getRandomSongs" + paramString + "&size=1")
      .then((res) => {
        if (!res.ok) {
          alert("Could not connect to source server.");
        }
        return res.json();
      })
      .then(() => {
        const credentials = {
          name: sourceName,
          uri: baseURL,
          username: username,
          token: token,
          salt: salt,
        };

        saveSourceToLocal(credentials);
      })
      .catch(() => {
        alert("Could not connect to source server.");
      });
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-md px-4">
        <InputBar value={sourceName} setValue={setSourceName} className="w-full" placeholder="Source name" />
        <InputBar value={sourceIP} setValue={setSourceIP} className="w-full mt-2" placeholder="Complete URL, IP or hostname" />
        <InputBar value={sourcePort} setValue={setSourcePort} maxLength={5} numbersOnly={true} className="w-full mt-2" placeholder="PORT (If not using URL)" />
        <InputBar value={username} setValue={setUsername} className="w-full mt-2" placeholder="Username" />
        <InputBar value={password} setValue={setPassword} className="w-full mt-2 " placeholder="Password" censor={true} />

        <div className="flex mt-2 space-x-2 justify-center">
          <Button icon="add.svg" className="bg-success-light dark:bg-success-dark" onClick={saveSource} />

          <Link to={"/managesources"}>
            <Button icon="delete.svg" className="bg-danger-light dark:bg-danger-dark"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
