import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const RELAY_ENDPOINT = 'https://api.graph.cool/relay/v1/cj9ci1qgk5bhu0132y3ul3nt1';

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  return fetch(RELAY_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
});

const environment = new Environment({
  network,
  store,
});

export default environment;
