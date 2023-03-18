type SiteLinkInfoType = {
  icon: string
  text: string
  link: string
}

export const SITE_LINK_INFO: SiteLinkInfoType[] = [
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
    text: 'Create A New Store',
    link: '/vendors/create-vendor',
  },
]
