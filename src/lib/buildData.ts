const FETCH_TIMEOUT_MS = 10_000;

type Options<T> = {
  key: string;
  path: string;
  parse: (json: unknown) => T | null;
};

async function fetchFromApi<T>({ path: apiPath, parse }: Options<T>): Promise<T> {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL が未設定です");

  const res = await fetch(`${base}${apiPath}`, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  const data = parse(await res.json());
  if (data === null) throw new Error("レスポンスの形式が不正です");
  return data;
}

export async function fetchBuildData<T>(options: Options<T>): Promise<T | null> {
  try {
    return await fetchFromApi(options);
  } catch (err) {
    console.warn(`[buildData:${options.key}] API 取得に失敗したため表示しません:`, err);
    return null;
  }
}
