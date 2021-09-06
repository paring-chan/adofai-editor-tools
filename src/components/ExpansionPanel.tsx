import React from 'react'
import { Collapse, ListItem, ListItemIcon } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const ExpansionPanel: React.FC<{ title: string }> = ({ children }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <ListItem onClick={() => setOpen(!open)} button>
                <ListItemIcon>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
                맵 파일 에디터(쓸데없음)
            </ListItem>
            <Collapse in={open}>
                <div style={{ marginTop: 10 }}>{children}</div>
            </Collapse>
        </div>
    )
}

export default ExpansionPanel
