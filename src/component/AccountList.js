import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import { getAccountList } from '../services/account';
import { APIStatus } from '../lib/common';
import { useSnackbar } from 'notistack';

const AccountList = ({
    reload
}) => {

    const [state, setState] = useState({
        data: [],
        isLoading: false,
        message: ""
    });
    const { enqueueSnackbar } = useSnackbar()

    const getData = async () => {
        try {
            const res = await getAccountList();
            if (res.status === APIStatus.OK) {
                setState(prev => {
                    return {
                        data: [...res.data].reverse(),
                        isLoading: false,
                        message: ""
                    }
                })
            }
            else {
                console.log(res)
                setState(prev => {
                    return {
                        ...prev,
                        isLoading: false,
                        message: res.message,
                    }
                })
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, {
                variant: 'error',
            });
            setState(prev => {
                return {
                    ...prev,
                    isLoading: false,
                }
            })
        }
    }

    useEffect(() => {
        setState(prev => {
            return {
                data: [],
                isLoading: true,
            }
        })
        getData();
    }, [reload])

    return (
        <Paper
            sx={{
                maxHeight: "35rem",
                padding: 2,
                overflow:"auto"
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    fontSize: '2rem',
                    paddingY: "1rem"
                }}
            >
                Tài khoản đã tạo
            </Box>
            <List>
                {state.isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {state.data.map((item, index) => {
                    return (
                        <ListItem key={item.username}>
                            <ListItemAvatar>
                                <Avatar alt={item.username}>{item.username[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.username}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}

export default AccountList