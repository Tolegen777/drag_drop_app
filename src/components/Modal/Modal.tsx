const Modal = ({ isOpen, onClose, children }: {isOpen: any, onClose:any, children: any}) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white p-8 max-w-md mx-auto">
                            <div className="flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-4">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
