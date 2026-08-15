"use client";

import { useEffect, useState } from "react";

// The address is never displayed or served in a harvestable form. The visible
// text is always the spelled-out version, and the real address exists only in
// the mailto: href, assembled in the browser after hydration — so it is absent
// from the served HTML entirely. Doing this in an inline script instead would
// mutate the DOM before React hydrates, and React would overwrite it.
const USER = "gordon";
const HOST = "liang";
const TLD = "ca";

const DISPLAY = `${USER} [at] ${HOST} [dot] ${TLD}`;

export default function Mail() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(`${USER}${String.fromCharCode(64)}${HOST}.${TLD}`);
  }, []);

  if (!address) {
    return <span className="mail">{DISPLAY}</span>;
  }

  return <a href={`mailto:${address}`}>{DISPLAY}</a>;
}
