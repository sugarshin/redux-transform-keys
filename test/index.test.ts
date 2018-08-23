import { createStore } from 'redux';
import createMiddleware, { CaseStyle } from '../src';

const CAMEL_CASE: CaseStyle = 'camelCase';

test('typeof createMiddleware is function', () => {
  expect(typeof createMiddleware).toBe('function');
});

const dummyStore = createStore(() => {});
const mockedNext = a => a;
[
  {
    subject: 'handled',
    options: { caseStyle: CAMEL_CASE },
    meta: { transformKeys: true },
    expected: { userId: 1, userName: 'sugarshin' },
  },
  {
    subject: 'not handled / `transformKeys` meta property not defined',
    options: { caseStyle: CAMEL_CASE },
    meta: {},
    expected: { user_id: 1, user_name: 'sugarshin' },
  },
  {
    options: { caseStyle: CAMEL_CASE },
    subject: 'not handled / `meta` not defined',
    expected: { user_id: 1, user_name: 'sugarshin' },
  },
  {
    subject: 'not handled / emit error',
    options: { caseStyle: CAMEL_CASE },
    meta: { transformKeys: true },
    error: true,
    expected: { user_id: 1, user_name: 'sugarshin' },
  },
  {
    subject: 'handled / emit error, but ignoreOnError: false',
    options: { ignoreOnError: false, caseStyle: CAMEL_CASE },
    meta: { transformKeys: true },
    error: true,
    expected: { userId: 1, userName: 'sugarshin' },
  },
].forEach(({ subject, meta, expected, options, error }) => {
  test(`middleware / ${subject}`, () => {
    const payload = { user_id: 1, user_name: 'sugarshin' };
    const nextACtion = { type: 'SOME_ACTION', payload: expected, meta, error };
    const actual = createMiddleware(options)(dummyStore)(mockedNext)({
      type: 'SOME_ACTION',
      payload,
      meta,
      error,
    });
    expect(actual).toMatchObject(nextACtion);
  });
});
