import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  CircularProgress,
  Divider,
  Stack,
  StackProps,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Api } from '../../Api'
import IconAction from './IconAction'
import { Booking } from './types'

// TODO: use backend model

type Props = {
  booking: Booking
  openModalWithParams: Function
  setBookingState: (
    bookingId: Booking['id'],
    state: Booking['state'] | 'deleted'
  ) => void
} & StackProps

const BookingCard: React.FC<Props> = ({
  booking,
  openModalWithParams,
  setBookingState,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { id, user, details, date, state, start, end } = booking
  const [denyLoading, setDenyLoading] = useState<boolean>(false)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  return (
    <Stack
      direction="row"
      padding={2}
      boxShadow="0 0 2px rgba(0, 0, 0, 0.2)"
      bgcolor="white"
      {...props}
      sx={{
        transition: 'border-radius 500ms',
        '&:active': {
          boxShadow: 'none'
        },
        '&:hover': {
          borderRadius: '10px'
        },
        ...props.sx
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Stack>
          <Typography px={1} noWrap borderRadius="3px" fontSize="1.2rem">
            {start} - {end}
          </Typography>
        </Stack>
        <Box alignSelf="stretch">
          <Divider orientation="vertical" />
        </Box>
        <Typography fontWeight={600} noWrap overflow="visible">
          {user.name}:
        </Typography>
        <Typography flexGrow={1}>{details}</Typography>
      </Stack>
      <Stack direction="row" ml="auto" alignSelf="center">
        {state === 'pending' ? (
          <>
            {denyLoading ? (
              <CircularProgress size={20} sx={{ padding: '0.5rem' }} />
            ) : (
              <IconAction
                tooltip="Deny Appointment"
                icon={<CloseIcon color="error" />}
                onClick={() => {
                  if (!acceptLoading) {
                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to deny ${user.name}'s appointment on ${date}. Are you sure?`,
                      onAccept: async () => {
                        setDenyLoading(true)
                        const id = Math.random().toString(36).substring(2,7);

                        await Api.patch('/request/booking/denied/' + id, {
                          _id: booking.id
                        })
                          .then(() => {
                            setDenyLoading(false)
                            enqueueSnackbar(
                              `Appointment ${id} successfully denied!`,
                              {
                                variant: 'success'
                              }
                            )
                            setBookingState(id, 'denied')
                          })
                          .catch((err) => console.log(err))
                      }
                    })
                  } else {
                    enqueueSnackbar('Request in progress - Try again later', {
                      variant: 'error'
                    })
                  }
                }}
              />
            )}
            {acceptLoading ? (
              <CircularProgress size={20} sx={{ padding: '0.5rem' }} />
            ) : (
              <IconAction
                tooltip="Accept Appointment"
                icon={<CheckIcon color="success" />}
                onClick={() => {
                  if (!denyLoading) {
                    openModalWithParams({
                      title: 'Confirm Action',
                      description: `You're about to accept ${user.name}'s appointment on ${date}. Are you sure?`,
                      onAccept: async () => {
                        setAcceptLoading(true)
                        const id = Math.random().toString(36).substring(2,7);

                        await Api.patch('/request/booking/approve/' + id, {
                          _id: booking.id
                        })
                          .then(() => {
                            setAcceptLoading(false)
                            enqueueSnackbar(
                              `Appointment ${id} successfully accepted!`,
                              {
                                variant: 'success'
                              }
                            )
                            setBookingState(id, 'approved')
                          })
                          .catch((err) => console.log(err))
                      }
                    })
                  } else {
                    enqueueSnackbar('Request in progress - Try again later', {
                      variant: 'error'
                    })
                  }
                }}
              />
            )}
          </>
        ) : (
          <>
            <IconAction
              tooltip="Delete Appointment"
              icon={<DeleteIcon htmlColor="grey" />}
              onClick={() =>
                openModalWithParams({
                  title: 'Confirm Action',
                  description: `You're about to delete ${user.name}'s appointment on ${date}. Are you sure?`,
                  onAccept: () => {
                    enqueueSnackbar(
                      `Appointment ${id} successfully accepted!`,
                      {
                        variant: 'success'
                      }
                    )
                    setBookingState(id, 'deleted')
                  }
                })
              }
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default BookingCard
