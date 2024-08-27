'use client'
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";


export default function Home() {
  const [data, setData] = useState<string>("");

  const sendRequest = () => {
    fetch("http://localhost:5000/").then(resp => resp.text()).then(resp => {
      console.log("got data",resp);
      setData(resp);
    });
  };

  useEffect(() => {
    setData("Hello from useEffect");
  }, []);

  return (
    <div>
      <div>
        Welcome to your new Xylo app.
      </div>
      <div>
        <Button color="red" onClick={sendRequest}>This is a button</Button>
      </div>
      <div>
        Data: {data}
      </div>
    </div>
  )
}
