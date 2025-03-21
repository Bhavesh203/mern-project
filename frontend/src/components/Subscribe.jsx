import React from 'react'
import { useForm, ValidationError } from '@formspree/react';

const Subscribe = () => {
    const [state, handleSubmit] = useForm("xpwqpwor");
    if (state.succeeded) {
        return <p>Thanks for Subscribe!</p>;
    }
    return (
        <div className='bg-black text-white py-5'>
            <div className="container">
                Subscribe Us
                <h2>STAY UPTO DATE WITH THE LATEST NEWS !</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                    />
                    <textarea
                        id="message"
                        name="message"
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                    />
                    <button type="submit" disabled={state.submitting}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Subscribe