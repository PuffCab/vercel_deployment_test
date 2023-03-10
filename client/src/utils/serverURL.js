const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://vercel-front-app.vercel.app"
    : "http://localhost:5005";

export { serverURL };
