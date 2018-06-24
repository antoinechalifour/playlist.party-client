import { getBestDJs } from 'host/reducers'

test('getBestDJs - Returns the users sorted by played songs', () => {
  const state = require('./mocks/partyFinished').default
  const result = getBestDJs(state)

  expect(result).toEqual([
    {
      id: 'fb341e8f-4829-460f-9545-e53d45808ba9',
      name: 'macbook',
      score: 3
    },
    {
      id: 'bfed9065-a9dd-4924-bf90-970ba628eee3',
      name: 'Anonymous-bfed9065-a9dd-4924-bf90-970ba628eee3',
      score: 2
    },
    {
      id: '00724782-dfcb-47b4-a008-0077e2cb32f8',
      name: 'Huawei p20',
      score: 0
    }
  ])
})
