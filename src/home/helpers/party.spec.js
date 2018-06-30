import { formatPartyName } from 'home/helpers/party'

const tests = [
  {
    input: 'my    party',
    expected: 'my-party'
  },
  {
    input: '  my party   ',
    expected: 'my-party'
  },
  {
    input: 'my-party   ',
    expected: 'my-party'
  },
  {
    input: 'MyParty',
    expected: 'myparty'
  },
  {
    input: 'my-party',
    expected: 'my-party'
  },
  {
    input: 'party 678',
    expected: 'party-678'
  },
  {
    input: 'party@toto',
    expected: 'party@toto'
  }
]

tests.forEach(({ input, expected }) =>
  test(`Formats the party name (${input} => ${expected})`, () => {
    expect(formatPartyName(input)).toBe(expected)
  })
)
