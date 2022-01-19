import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function ChooseCompanies(props) {

    const theme = useTheme();
    const [value, setValue] = React.useState([])

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setValue(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const btnFunction = (event) => {
        //sent the data back to the main component
        event.preventDefault()
        props.parentCallBack(value)
        console.log(value)
    }
    return (
        <div className="form-group">
            {props.isVisible ? <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-name-label">Options</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name"/>}
                    MenuProps={MenuProps}>

                    {props.dataApi.map((row) => (
                        <MenuItem
                            key={row.id}
                            value={row.companyName}
                            style={getStyles(row.companyName, value, theme)}

                        >
                            {row.companyName}
                        </MenuItem>
                    ))}

                </Select>
                <div className="form-group" style={{marginTop: "10px"}}>
                    <button className="btn btn-primary" onClick={btnFunction}>Add company/s</button>
                </div>

            </FormControl> : null}
        </div>
    );
}
