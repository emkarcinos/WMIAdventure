import React from 'react';

function useInput(initialValue) {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event) => {
        if(event.target.name === 'level' || event.target.name === 'card_effect') {
            if(event.target.checked) {
                let newList = value.slice();
                if(event.target.name === 'level')
                    newList[Number(event.target.id[0]) - 1] = event.target.value;
                else if(event.target.name)
                    newList[Number(event.target.id[0]) - 1][Number(event.target.id[2]) - 1] = event.target.value;
                setValue(newList);
            } else {
                let newList = value.slice();
                if(event.target.name === 'level')
                    newList[Number(event.target.id[0]) - 1] = undefined;
                else if(event.target.name)
                    newList[Number(event.target.id[0]) - 1][Number(event.target.id[2]) - 1] = undefined;
                setValue(newList);
            }
        } else if(event.target.type === 'text' || event.target.name === 'tooltip') {
            setValue(event.target.value);
        } else {
            let newList = value.slice();
            if(event.target.name === 'next_level_cost')
                newList[Number(event.target.id[0]) - 1] = event.target.value;
            else newList[Number(event.target.id[0]) - 1][Number(event.target.id[2]) - 1] = event.target.value;
            setValue(newList);
        }
    };

    return [value, handleChange];
}

export default useInput;