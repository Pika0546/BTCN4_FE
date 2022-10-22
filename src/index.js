import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SnackbarProvider
			autoHideDuration={3000}
			maxSnack={3}
			anchorOrigin={{
				horizontal: "right",
				vertical:"top"
			}}
			TransitionComponent={Slide}
		>
			<App />

		</SnackbarProvider>
	</React.StrictMode>
);

