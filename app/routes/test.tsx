import type { Route } from "./+types/test";

export function loader({ context }: Route.LoaderArgs) {
  return { t: 'test', message: context.VALUE_FROM_EXPRESS };
}
