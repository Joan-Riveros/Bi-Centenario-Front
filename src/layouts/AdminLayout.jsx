import Navbar from '../components/Navbar';

function AdminLayout({ children }) {
    return (
        <div className="bg-white dark:bg-darkBase text-gray-900 dark:text-textDark min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow px-8 py-6">{children}</main>
        </div>
    );
}

export default AdminLayout;
