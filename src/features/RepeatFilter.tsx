import React from 'react'
import ExpansionPanel from '../components/ExpansionPanel'
import { TextField } from '@material-ui/core'

const RepeatFilter = () => {
    return (
        <ExpansionPanel title="필터 반복(김밥)">
            <TextField
                type="number"
                inputProps={{
                    min: 0,
                }}
                label="시작타일"
            />
        </ExpansionPanel>
    )
}

export default RepeatFilter
