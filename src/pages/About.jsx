export function About() {
  return (
    <nav className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
      <h2 className="text-center text-2xl font-bold">About</h2>

      <section className="space-y-2">
        <p>
          This app may help you practice for the B/B1 theory driving exam in
          Georgia. The main idea is to provide a simple interface to practice
          questions from the official question bank and in process exclude
          questions you have are confident about, so you can focus on the ones
          you find difficult.
        </p>
      </section>

      <section className="space-y-2">
        <p>
          This version is not affiliated with any official organization and is
          created just as an experiment and for fun. If you have any suggestions
          or want to contribute, you can find the code on{" "}
          <a
            href="https://github.com/okplanbo/geo-driving-theory-practice"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            GitHub
          </a>
        </p>
      </section>

      <section className="space-y-2">
        <p>
          Please keep in mind that this app will save excluded questions in your
          browser&apos;s local storage, so if you clear it, or switch to a
          different browser or device, you will lose that data.
        </p>
      </section>

      <footer className="flex flex-col gap-2 border-t pt-4">
        <p>
          Original questions:{" "}
          <a
            href="https://teoria.on.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            teoria.on.ge
          </a>{" "}
          - updated on 2026-03-20
        </p>
        <p>
          Author:{" "}
          <a
            href="https://okbo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            okbo.dev
          </a>
        </p>
        <p>
          <a href="/" className="text-blue-700 underline hover:text-blue-900">
            ← Back to Home
          </a>
        </p>
      </footer>
    </nav>
  );
}
