export function About() {
  return (
    <div>
      <h2 className="text-xl font-bold">About</h2>
      <p>
        This app may help you practice for the B/B1 theory driving exam in
        Georgia.
      </p>
      <p>
        Original questions were taken from{" "}
        <a
          href="https://teoria.on.ge"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          teoria.on.ge
        </a>
        .
      </p>
    </div>
  );
}
