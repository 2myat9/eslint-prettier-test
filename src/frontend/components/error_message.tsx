import React from "react"
import {Text} from "@nextui-org/react";

const ErrorMessage = (props: any) => {
    const {errors} = props
    return (
        <>
            <div style={(errors && errors.length) ? {
                display: "block",
            } : {display: "none"}}>
                {errors && errors.map((error: string, idx: number) => <Text color={"error"} key={idx}>{error}</Text>)}
            </div>
    </>
)
}

export default ErrorMessage;