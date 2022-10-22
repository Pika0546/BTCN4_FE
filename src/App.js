
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';

import './App.css';

import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import { createAccount } from './services/signup';
import { APIStatus } from './lib/common';

const App = () => {

	const { handleSubmit, control, setError } = useForm();
	const {enqueueSnackbar} = useSnackbar()
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
		try {
			const res = await createAccount(newData);
			console.log(res);
			if(res.status === APIStatus.OK){
				enqueueSnackbar(res.message, {
					variant:'success',
				});
			}
			else if(res.status === APIStatus.EXISTED){
				setError(formName.username,{
					type: "manual",
					message: "Tên đăng nhập đã tồn tại"
				})
			}else{
				enqueueSnackbar(res.message, {
					variant:'success',
				});
			}
			
		} catch (error) {
			console.log(error);
			enqueueSnackbar(error.message, {
				variant:'error',
			});
		}
	}

	return (
		<Paper
			sx={{
				padding: 2,
				maxWidth: "400px",
				margin: "2rem auto",
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
					"& .MuiFormHelperText-root":{
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
				>Đăng ký</Button>
			</Stack>
		</Paper>
	)
}

export default App