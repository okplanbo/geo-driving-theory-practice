import { Link } from "@chakra-ui/react";

import * as packageCfg from "../../package.json";

const appName = packageCfg.name;

export function ExcludedList({ excludedIds, data }) {
  return (
    <div className="flex w-full flex-col items-center px-6">
      <h1 className="text-xl font-bold md:text-3xl">Excluded Questions</h1>
      {excludedIds.length > 0 && (
        <ul className="flex max-w-full flex-col items-start gap-2 overflow-hidden text-ellipsis pt-3 md:max-w-screen-md md:pt-6">
          {excludedIds.map((id) => (
            <li
              key={id}
              className="max-w-full overflow-hidden text-ellipsis text-nowrap md:max-w-screen-md"
            >
              <Link
                mx={2}
                fontWeight="normal"
                color="teal.500"
                href={`/${appName}/?q=${id}`}
              >
                #{id} - {data[id - 1].question}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {excludedIds.length === 0 && (
        <>
          <p className="mt-5">No excluded questions yet.</p>
          <Link
            my={2}
            fontWeight="normal"
            color="teal.500"
            href={`/${appName}/`}
          >
            Back
          </Link>
        </>
      )}
    </div>
  );
}
