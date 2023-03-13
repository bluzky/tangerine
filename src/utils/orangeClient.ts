const endpoint = "http://127.0.0.1:4000/gql";
export async function getCollection(
  code: string,
  filterFunc: (a: Object) => boolean
) {
  const { data } = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query($type: String) {
list_entries(type: $type) {
id
title
frontmatter
raw_body
}
}
`,
      variables: {
        type: code,
      },
    }),
  }).then(response => response.json());
  filterFunc = filterFunc || (item => true);
  return data.list_entries.filter(filterFunc);
}
