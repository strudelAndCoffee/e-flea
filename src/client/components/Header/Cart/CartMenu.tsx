// Starter template code for Drawer component copid from Material UI: https://mui.com/material-ui/react-drawer/#permanent-drawer

import { KeyboardEvent, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import { useCartStore } from '../../../state'

export default function CartMenu() {
  const cartStore = useCartStore()
  const anchor = 'right'

  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    if (cartStore.isOpen) cartStore.closeCart()
  }

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation" onKeyDown={toggleDrawer}>
      <Box display="flex" alignItems="center" padding={1}>
        <Typography variant="h6" align="center" sx={{ flexGrow: 2 }}>
          Shopping Cart
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="close cart"
          sx={{ marginRight: 1 }}
          onClick={() => cartStore.closeCart()}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {cartStore.items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={item.id} secondary={item.quantity} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <>
        <Drawer
          anchor={anchor}
          open={cartStore.isOpen}
          onClose={toggleDrawer}
          transitionDuration={{ appear: 400, enter: 500, exit: 500 }}
        >
          {list()}
        </Drawer>
      </>
    </div>
  )
}
