import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const PreLoader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <DotLottieReact
                src="https://lottie.host/ddc578ff-5135-4662-8f63-f83699c7d173/fRiB3yOfea.lottie"
                loop
                autoplay
                style={{ width: 200, height: 200 }}
            />
        </div>
    );
};

export default PreLoader;
