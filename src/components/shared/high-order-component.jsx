import React, { useEffect, useRef, useState } from 'react';
import { ToastNotification } from 'components/shared';

export const WithLoadingComponent = (WrappedComponent, Promise, Loader) => (props) => {

    const LoadingComponent = () => {

        const [data, setData] = useState({ result: null, loading: false, error: null });
        const toastRef = useRef(null);

        useEffect(() => {
            setData({ ...data, loading: true });
            Promise().then((response) => {
                setData({ result: response.data, error: null })
            }, error => {
                setData({ result: null, error: error });
                toastRef.current.showToast({ type: "error", message: error });
            });
        }, []);

        return (
            <>
                {
                    data.loading ?
                        Loader : data.result && <WrappedComponent {...props} data={data.result} />
                }
                <ToastNotification ref={toastRef} />
            </>
        );
    }

    return LoadingComponent;
}