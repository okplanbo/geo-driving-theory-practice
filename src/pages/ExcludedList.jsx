export function ExcludedList({ excludedIds, data }) {
  return (
    <div>
      <h2 className="font-bold text-xl">Excluded Questions</h2>
      {excludedIds.length > 0 ? (
        <ul>
          {excludedIds.map((id) => (
            <li key={id}>
              #{id} {data[id].question}
            </li>
          ))}
        </ul>
      ) : (
        <p>No excluded questions yet.</p>
      )}
    </div>
  );
}
