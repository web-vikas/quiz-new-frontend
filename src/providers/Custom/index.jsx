/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorLog } from '@/hooks';
import { loadSessionFromLocal } from '@redux/action';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export const CustomWrapper = ({ children }) => {
    //-------------- State & Variables --------------//
    const handleError = useErrorLog('providers/custom');
    const dispatch = useDispatch();
    const { isLoading, } = useSelector((state) => state.session);

    //-------------- Use Effects --------------//

    /**
     * This use Effect is only used to load localstorage data into redux on page reload.
     */
    useEffect(() => {
        try {
            dispatch(
                loadSessionFromLocal(
                    localStorage.getItem('userSession') ? JSON.parse(localStorage.getItem('userSession')) : ''
                )
            );
        } catch (e) {
            handleError(e);
        }
    }, []);

    //-------------- Other Methods --------------//


    return (
        <>
            {isLoading && <Loader2 />}
            {children}

        </>
    );
};

