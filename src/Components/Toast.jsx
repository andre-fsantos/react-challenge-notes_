import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ toastConfig, isToastVisible, setIsToastVisible }) => {
    useEffect(() => {
        if(isToastVisible) {
            const TOAST_DURATION = 3000;

            const timeout = setTimeout(() => {
                setIsToastVisible(false);
            }, TOAST_DURATION);
            
            return () => clearTimeout(timeout);
        }
    }, [isToastVisible]);
    
    const backgroundColorClasses = {
        'success': 'successful-toast',
        'error': 'error-toast'
    }

    const style = `toast ${ backgroundColorClasses[toastConfig.type] }`;

    return isToastVisible && <div className={style}>{toastConfig.message}</div>
}

export { Toast }