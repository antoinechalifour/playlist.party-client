export function formatPartyName (input) {
  let partyName = input.toLowerCase()

  partyName = partyName.replace(/^\s+/g, '')
  partyName = partyName.replace(/\s+$/g, '')
  partyName = partyName.replace(/\s+/g, '-')
  partyName = partyName.replace(/[^a-z0-9@_-]+/g, '')

  return partyName
}
