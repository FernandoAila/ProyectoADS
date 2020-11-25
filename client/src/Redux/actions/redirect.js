import {REDIRECT } from "./types"
export const redirect = link => {
    console.log("rederigir");
    return { type: REDIRECT, payload: link };
  };