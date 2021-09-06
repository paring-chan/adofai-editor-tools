import React from 'react'
import { Collapse, ListItem, ListItemIcon } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const ExpansionPanel: React.FC<{ title: string }> = ({ children, title }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <ListItem onClick={() => setOpen(!open)} button>
                <ListItemIcon>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                {title}
            </ListItem>
            <Collapse in={open}>
                <div style={{ marginTop: 10 }}>{children}</div>
            </Collapse>
        </div>
    )
}

export default ExpansionPanel
