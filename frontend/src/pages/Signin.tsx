import { useState } from "react"
import { Quote } from "../components/Quote"
import { SigninAuth } from "../components/SigninAuth"
import { Oval } from "react-loader-spinner";

export const Signin = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="relative h-screen w-screen">
            {
                loading && <div className="absolute inset-0 bg-slate-400 bg-opacity-50 flex justify-center items-center">
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
            <div className="lg:grid grid-cols-2">
                <SigninAuth setLoading={setLoading}/>
                <Quote/>
            </div>
        </div>
    )
}