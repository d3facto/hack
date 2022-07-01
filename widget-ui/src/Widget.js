import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";


const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY2ODE0MTksIm5iZiI6MTY1NjY4MTQxOSwianRpIjoiYmZhZGNmZDMtMDJhMS00N2FmLThmMDItMWY4ZTQwNTA1NGQ1IiwiaWRlbnRpdHkiOnsiZW1haWwiOm51bGwsInRlbmFudCI6IndoZWF0IiwiaXNfc3VwZXIiOmZhbHNlLCJzY29wZXMiOlsiYXBpIl0sImlkIjpudWxsfX0.YwRlSnu3TAzpy6GGy4fXqArMRMvbYK8ZzW2gYqrnPe8";

function Widget(props) {
    // const [...] = useState()
    const siren = props.siren;
    // I would use react-query to handle loading state and error state, but for now I want to keep it "simple"
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEligible, setIsEligible] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null)

    useEffect(() => {
        (async () => {
            const url = `https://api-sandbox.getdefacto.com/eligibility/borrower`
            // if there is a rendering loop, please check this one
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    "identifier": siren,
                    "identifier_type": "siren"
                })

            })
            setIsLoading(false);
            if (response.status > 299) {
                setIsError(true)
            } else {
                const content = await response.json()
                setIsEligible(content.is_eligible)
                setMaxAmount(content.max_amount)
            }

        })()

    }, [siren])
    

    if (isError) {
        return (<div>Ouch.. we have a technical error. We are working on it, please come back in a few minutes.</div>)
    }


    if (isLoading) {
        return (<div>Loading data for SIREN {siren}</div>)
    }
    
    if (isEligible) {
        return(
        <div>
            <div>You are ELIGIBLE! You can borrow</div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={maxAmount}/>
        </div>
        )
    }
}

export default Widget;
