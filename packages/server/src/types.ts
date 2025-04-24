import {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";

export interface ProblemJson {
  title: string;
  details?: string;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
  instance?: string;
  "invalid-params"?: Record<string, string>[];
}
