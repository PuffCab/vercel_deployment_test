const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://vercel-test-2-khaki.vercel.app/"
    : "http://localhost:5005";

export { serverURL };
