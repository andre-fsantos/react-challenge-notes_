import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, isToastVisible, setIsToastVisible }) => {
    useEffect(() => {
        if(isToastVisible) {
            const TOAST_DURATION = 3000;

            const timeout = setTimeout(() => {
                setIsToastVisible(false);
            }, TOAST_DURATION);
            
            return () => clearTimeout(timeout);
        }
    }, [isToastVisible]);
    
    const bgColor = {
        'success': 'successful-toast',
        'error': 'error-toast'
    }

    const style = `toast ${ bgColor[type] }`;

    return isToastVisible && <div className={style}>{message}</div>
}

export { Toast }