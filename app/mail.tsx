"use client";

import { useEffect, useState } from "react";

// The address never appears as a contiguous string in the served HTML — the
// server renders "gordon at liang.ca" with no mailto: to match, and the real
// link is assembled in the browser after hydration. Doing this in an inline
// script instead would mutate the DOM before React hydrates, and React would
// overwrite it on hydration.
const USER = "gordon";
const HOST = "liang.ca";

export default function Mail() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(USER + String.fromCharCode(64) + HOST);
  }, []);

  if (!address) {
    return <span className="mail">{`${USER} at ${HOST}`}</span>;
  }

  return <a href={`mailto:${address}`}>{address}</a>;
}
