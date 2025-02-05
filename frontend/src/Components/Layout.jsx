import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './AppAppBar.jsx'

function Layout() {
    return (
        <div>
            <CssBaseline />
            <AppAppBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
