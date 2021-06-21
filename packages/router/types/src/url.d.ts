import { OriginLocation, Location, Route } from './router.d';
export declare function join(base: string, path: string): string;
export declare function resolve(loca?: OriginLocation): Location;
export declare function resolveLocation(local?: OriginLocation): Location;
export declare function match(routes: Route[], base?: string, local?: OriginLocation): Route;
export declare function resolveSearch(search: string): object;
