
import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";

import './App.css';

import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { createAccount } from './services/signup';

const App = () => {

	const { handleSubmit, control } = useForm();

	const submitForm = async (data) => {
		console.log(data);
		try {
			const res = await createAccount(data);
			console.log(res);
		} catch (error) {
			console.log(error);
			alert(error.message)
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
					name="username"
					control={control}
					defaultValue=""
					rules={{
						required: "Tên đăng nhập không được bỏ trống!",
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<TextField
							id="username"
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
					name="password"
					control={control}
					defaultValue=""
					rules={{
						required: "Mật khẩu không được bỏ trống!",
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<TextField
							id="password"
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