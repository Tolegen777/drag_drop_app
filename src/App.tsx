import DragDropContent from "./components/DragDropContent";

function App() {
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center flex-col" style={{background: 'grey'}}>
                <h1 className="text-2xl mb-4 mt-4">
                    To Do App
                </h1>
                <DragDropContent />
            </div>
        </>
    );
}

export default App;
