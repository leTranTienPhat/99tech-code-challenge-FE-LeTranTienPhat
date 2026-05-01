export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = (await res.json()) as Error;
    throw error;
  }
  return res.json();
};
