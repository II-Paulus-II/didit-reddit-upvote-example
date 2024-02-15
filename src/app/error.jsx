"use client";

export default function GlobalError({ error, reset }) {

  function letMeGoHome() {
    goHome();
  }
  return (
    <html>
      <body>
        <h2>Oh no! Something went wrong on that page! 🙈</h2>
      </body>
    </html>
  );
}