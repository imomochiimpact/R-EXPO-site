import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FETCH_TIMEOUT_MS = 10_000;
const SNAPSHOT_DIR = path.join(process.cwd(), "snapshots");

type Options<T> = {
  key: string;
  path: string;
  parse: (json: unknown) => T | null;
};

function snapshotFile(key: string) {
  return path.join(SNAPSHOT_DIR, `${key}.json`);
}

async function fetchFromApi<T>({ path: apiPath, parse }: Options<T>): Promise<{ raw: unknown; data: T }> {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL が未設定です");

  const res = await fetch(`${base}${apiPath}`, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  const raw: unknown = await res.json();
  const data = parse(raw);
  if (data === null) throw new Error("レスポンスの形式が不正です");
  return { raw, data };
}

async function saveSnapshot(key: string, data: unknown) {
  const file = snapshotFile(key);
  const next = `${JSON.stringify(data, null, 2)}\n`;
  const prev = await readFile(file, "utf8").catch(() => null);
  if (prev === next) return;
  await mkdir(SNAPSHOT_DIR, { recursive: true });
  await writeFile(file, next);
  console.info(`[buildData:${key}] スナップショットを更新しました（snapshots/${key}.json をコミットしてください）`);
}

async function loadSnapshot<T>({ key, parse }: Options<T>): Promise<T | null> {
  try {
    return parse(JSON.parse(await readFile(snapshotFile(key), "utf8")));
  } catch {
    return null;
  }
}

export async function fetchBuildData<T>(options: Options<T>): Promise<T | null> {
  const { key } = options;
  try {
    const { raw, data } = await fetchFromApi(options);
    await saveSnapshot(key, raw).catch((err) => {
      console.warn(`[buildData:${key}] スナップショットの保存に失敗しました:`, err);
    });
    return data;
  } catch (err) {
    const fallback = await loadSnapshot(options);
    if (fallback !== null) {
      console.warn(`[buildData:${key}] API 取得に失敗したため、最後に取得したデータ（snapshots/${key}.json）を使います:`, err);
      return fallback;
    }
    console.warn(`[buildData:${key}] API 取得に失敗し、スナップショットも無いため表示しません:`, err);
    return null;
  }
}
