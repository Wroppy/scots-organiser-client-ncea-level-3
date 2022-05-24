//https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props

import {useEffect, useState} from 'react';

export default function useStateWithDep(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);
    return [value, setValue];
}