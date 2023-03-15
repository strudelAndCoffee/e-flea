import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import CardHeader from '@mui/material/CardHeader'

import { getVendorById } from '../../api'

interface ProductHeaderProps {
  name: string
  vendor_id: string | null
}

export default function ProductHeader({ name, vendor_id }: ProductHeaderProps) {
  if (vendor_id) {
    const { isLoading, isError, data } = useQuery({
      queryKey: ['products', 'all-products', 'vendor-products'],
      queryFn: () => getVendorById(vendor_id),
    })

    return (
      <CardHeader
        sx={{ padding: 0 }}
        title={name}
        subheader={
          <Link to={`/vendors/${vendor_id}`}>
            {isLoading && 'Loading store name...'}
            {data && data.vendor.store_title}
          </Link>
        }
      />
    )
  }
  return <CardHeader sx={{ padding: 0 }} title={name} />
}
