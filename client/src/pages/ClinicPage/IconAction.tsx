import React from 'react'
import { Tooltip, IconButton } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'

type Props = {
  tooltip?: string
  icon: React.ReactElement
  onClick: () => void
}

const IconAction: React.FC<Props> = ({ tooltip, icon, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  )
}

export default IconAction
