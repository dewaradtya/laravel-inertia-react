import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            setIsVisible(true);

            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [flash]);

    const handleTransitionEnd = () => {
        if (!isVisible) {
        }
    };

    return (
        <div
            className={`fixed top-4 right-1/3 z-50 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onTransitionEnd={handleTransitionEnd}
        >
            {isVisible && (
                <>
                    {flash.success && (
                        <div className="px-4 py-2 rounded-md shadow-md mb-4 flex items-center">
                            <span className="material-icons mr-2 text-white rounded-full bg-green-500">
                                done
                            </span>
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md mb-4 flex items-center">
                            <span className="material-icons mr-2 text-red-500 rounded-full bg-white">
                                close
                            </span>
                            {flash.error}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
