import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet().reply(() => [
  200,
  {
    success: true,
    timestamp: 1582832982,
    base: 'EUR',
    date: '2020-02-27',
    rates: {
      EUR: 1
    }
  }
]);
