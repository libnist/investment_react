import { useState } from "react";

export default function InputBox({ label, initialValue, onChange}) {

    return (
        <section>
            <label htmlFor="">{label}</label>
            <input type="number" value={initialValue} onChange={onChange}/>
        </section>
    )
}