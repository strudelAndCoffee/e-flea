import { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { SiteLink } from '../components'
import { SITE_LINK_INFO } from '../lib'

export default function Home() {
  async function test() {
    const res = await axios.get('http://localhost:3000/api/users/', {
      withCredentials: true,
    })
    console.log(res.data)
  }
  useEffect(() => {
    test()
  })

  return (
    <Grid container spacing={4} paddingTop={15}>
      {SITE_LINK_INFO.map(({ icon, text, link }) => (
        <SiteLink key={icon} icon={icon} text={text} link={link} />
      ))}
    </Grid>
  )
}
