import React, { useEffect, useState } from 'react';

export const WithLoadingComponent = (WrappedComponent, Promise, Loader) => (props) => {

    const LoadingComponent = () => {

        const [data, setData] = useState({ result: null, loading: false, error: null });

        useEffect(() => {
            setData({ ...data, loading: true });
            Promise().then((response) => {
                setData({ result: response.data, error: null })
            }, error => {
                setData({ result: null, error: error });
                alert(error);
            });
        }, []);

        return (
            <>
                {
                    data.loading ?
                        Loader : data.result && <WrappedComponent {...props} data={data.result} />
                }
            </>
        );
    }

    return LoadingComponent;
}