import styled from '@emotion/styled'
import { Box } from '@material-ui/core'

export const BorderedBox = styled(Box)({
    boxSizing: 'border-box',
    borderRadius: 10,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    padding: 16,
})
