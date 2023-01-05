import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RhfInputFieldResult, RhfInputProps, useFieldRestriction } from "../index.generated";
import { Genders } from "../../graphql/generated";

export function RhfGenderInput<T extends FieldValues, TKey extends Path<T>>(props: RhfInputProps<T, TKey>): RhfInputFieldResult<T, TKey> {

    const r = useFieldRestriction(props);
    const fieldId = useMemo(() => Math.floor(Math.random() * 1000), [])

    return (<Grid item xs={12} sm={4} md={3}>
        <Controller
            render={({ field, fieldState }) =>
                <FormControl fullWidth >
                    <InputLabel variant="outlined" htmlFor={`${fieldId}_${field.name}`}>
                        {field.name}
                    </InputLabel>
                    <Select
                        {...field}
                        id={`${fieldId}_${field.name}`}
                        disabled={r?.required}
                        label={field.name}
                        fullWidth
                        error={!!fieldState.error}
                    >
                        <MenuItem value={Genders.None}>{Genders.None}</MenuItem>
                        <MenuItem value={Genders.M}>{Genders.M}</MenuItem>
                        <MenuItem value={Genders.W}>{Genders.W}</MenuItem>
                        <MenuItem value={Genders.D}>{Genders.D}</MenuItem>
                    </Select>
                    <FormHelperText error hidden={!fieldState.error}>{fieldState.error?.message}</FormHelperText>
                </FormControl>
            }
            name={props.path}
            rules={props.rules && props.rules[props.path]}
            control={props.control}
        />
    </Grid >
    )
}
