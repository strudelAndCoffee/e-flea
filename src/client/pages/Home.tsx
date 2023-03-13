import Grid from '@mui/material/Grid'
import { SiteLink } from '../components'
import { SITE_LINK_INFO } from '../lib'
import { ErrorBoundary, ErrorPage } from '../error_boundary'

export default function Home() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Grid container spacing={4} paddingTop={15}>
        {SITE_LINK_INFO.map(({ icon, text, link }) => (
          <SiteLink key={icon} icon={icon} text={text} link={link} />
        ))}
      </Grid>
    </ErrorBoundary>
  )
}
