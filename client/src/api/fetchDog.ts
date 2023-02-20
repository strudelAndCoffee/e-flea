export async function fetchDog() {
  const res = await fetch('https://random.dog/woof.json')
  const dogData = await res.json()
  const dogUrl: string = dogData.url

  return dogUrl
}
