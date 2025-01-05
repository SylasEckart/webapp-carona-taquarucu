/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorHandler } from "@/lib/helpers";

export const fetchRetries = (url: string, options: RequestInit = {}, retries: number): Promise<any> =>
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        if (retries > 0) {
          return fetchRetries(url, options, retries - 1)
        }
        throw new Error(errorHandler(res.status.toString()))
      })
      .catch((error) => console.error(error.message))