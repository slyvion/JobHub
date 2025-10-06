export default function UnauthorizedPage() {
    return (
        <main className="grid min-h-screen place-items-center bg-white">
            <div className="text-center">
                <p className="text-6xl text-blue-600">401</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Unauthorized</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    You do not have the permissions to access the following page.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="/"
                        className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </a>
                </div>
            </div>
        </main>
    );
}
