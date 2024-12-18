
export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    TodoList App
                </div>
                <div className="space-x-4">
                    <a href="/" className="text-gray-300 hover:text-white">
                        Home
                    </a>
                    <a href="/tasks" className="text-gray-300 hover:text-white">
                        Tasks
                    </a>
                    <a href="/completed" className="text-gray-300 hover:text-white">
                        Completed
                    </a>
                </div>
            </div>
        </nav>
    )
}