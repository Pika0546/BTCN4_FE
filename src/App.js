
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';

import './App.css';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"

import { createAccount } from './services/signup';
import { APIStatus } from './lib/common';
import AccountList from './component/AccountList';

const App = () => {

	const { handleSubmit, control, setError, reset } = useForm();
	const [reload, setReload] = useState(false);
	const [isRegistering, setIsRegistering] = useState(false);
	const { enqueueSnackbar } = useSnackbar()
	const [formName] = useState({
		username: "qwe",
		password: "zxc"
	})
	const submitForm = async (data) => {

		const newData = {
			username: data[formName.username],
			password: data[formName.password],
		}
		console.log(data, newData);
		setIsRegistering(true)
		try {
			const res = await createAccount(newData);
			console.log(res);
			if (res.status === APIStatus.OK) {
				enqueueSnackbar("Tạo tài khoản mới thành công!", {
					variant: 'success',
				});
				reset({
					[formName.username]:"",
					[formName.password]:"",
				})
				setReload(prev => !prev)
			}
			else if (res.status === APIStatus.EXISTED) {
				setError(formName.username, {
					type: "manual",
					message: "Tên đăng nhập đã tồn tại"
				})
			} else {
				enqueueSnackbar(res.message, {
					variant: 'success',
				});
			}

		} catch (error) {
			console.log(error);
			enqueueSnackbar(error.message, {
				variant: 'error',
			});
		}
		setIsRegistering(false)

	}


	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>

			<Grid container
				sx={{
					maxWidth: "70%"
				}}
				spacing={1}
			>
				<Grid item xs={12} sm={6}>
					<Paper
						sx={{
							padding: 2,
							maxWidth: "400px",
						}}
						component="form"
						onSubmit={handleSubmit(submitForm)}
					>

						<Box
							sx={{
								textAlign: "center",
								fontSize: '2rem',
								marginY: "1rem"
							}}
						>
							Đăng kí
						</Box>
						<Stack
							direction="column"
							spacing={3}
							sx={{
								"& .MuiFormHelperText-root": {
									marginLeft: 0,
								}
							}}
						>
							<Controller
								name={formName.username}
								control={control}
								defaultValue=""
								rules={{
									required: "Tên đăng nhập không được bỏ trống!",
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TextField
										disabled={isRegistering}
										id={formName.username}
										label="Tên đăng nhập"
										variant="outlined"
										onChange={onChange}
										size="small"
										placeholder='Nhập tên đăng nhập'
										margin="dense"
										autoComplete=''
										type="text"
										fullWidth
										value={value}
										error={!!error}
										helperText={error ? error.message : null}
									/>
								)}
							/>
							<Controller
								name={formName.password}
								control={control}
								defaultValue=""
								rules={{
									required: "Mật khẩu không được bỏ trống!",
								}}
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TextField
									disabled={isRegistering}
										id={formName.password}
										label="Mật khẩu"
										variant="outlined"
										onChange={onChange}
										size="small"
										placeholder='Nhập mật khẩu'
										margin="dense"
										autoComplete=''
										type="password"
										fullWidth
										value={value}
										error={!!error}
										helperText={error ? error.message : null}
									/>
								)}
							/>
							<Button
								variant='contained'
								type='submit'
								disabled={isRegistering}
							>
								{(isRegistering) ? (
									<Stack
										direction="row"
										justifyContent="center"
										alignItems="center"
										spacing={1}
									>
										<Box>Đang đăng kí </Box>
										<CircularProgress size={22}/>
									</Stack>
								) : (
									<>
										Đăng ký

									</>
								)}
							</Button>
						</Stack>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AccountList reload={reload}></AccountList>
				</Grid>
			</Grid>
		</Box>
	)
}

export default App