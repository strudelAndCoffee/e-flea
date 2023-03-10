import { useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import { SiteLink } from '../components'

const siteLinkInfo = [
  {
    icon: 'vendors',
    text: 'Explore Vendors',
    link: '/vendors',
  },
  {
    icon: 'products',
    text: 'Browse Merchandise',
    link: '/products',
  },
  {
    icon: 'create',
    text: 'Create Vendor Account',
    link: '/create-vendor',
  },
]

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
      {siteLinkInfo.map(({ icon, text, link }) => (
        <SiteLink key={icon} icon={icon} text={text} link={link} />
      ))}
    </Grid>
  )
}
