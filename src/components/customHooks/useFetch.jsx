import { useEffect, useState } from 'react'

function useFetch(props) {
    const [getData, setGetData] = useState([]);
    useEffect(() => {
        const Fetch = async () => {
            if (props.mode === "GET") {
                 await fetch(props.url)
                    .then((res) => res.json())
                    .then((data) => setGetData(data))
                    .catch((error) => {
                        console.log(error)
                    })
            }
            if (props.mode === "POST" || props.mode === "PUT") {
                 await fetch(props.url, {
                    method: props.mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(props.setData),
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            };
            if (props.mode === "DELETE") {
                 await fetch(props.url, {
                    method: props.mode,
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        Fetch();
    }, [props.mode, props.url, props.setData]);

    return {
        getData
    }
}

export default useFetch