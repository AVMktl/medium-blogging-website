import { SignupAuth } from "../components/SignupAuth"
import { Quote } from "../components/Quote"
import { Oval } from "react-loader-spinner"
import { useState } from "react";

export const Signup = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative">
            {
                loading && <div className="absolute inset-0 bg-opacity-50 bg-slate-400 flex justify-center items-center z-10">
                <Oval
                    visible={true}
                    height="50"
                    width="50"
                    color="#1B1B1B"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    secondaryColor="#808080"
                    /> 
                </div>
            }
            <div className={`lg:grid grid-cols-2 z-10 ${loading ? 'opacity-50' : ''}`}>
                <SignupAuth setLoading={setLoading} />
                <Quote />
            </div>
        </div>
    )
}