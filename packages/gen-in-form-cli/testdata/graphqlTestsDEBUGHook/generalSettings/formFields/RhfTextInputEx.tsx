import { Grid, TextField } from "@mui/material";
import { Controller, FieldValues, Path } from "react-hook-form";
import { RhfInputFieldResult, RhfInputProps, useFieldRestriction } from "../index.generated";

export function RhfTextInputEx<T extends FieldValues, TKey extends Path<T>>(props: RhfInputProps<T, TKey>): RhfInputFieldResult<T, TKey> {
    const r = useFieldRestriction(props);
    return (<Grid item xs={12} sm={4} md={3}>
        <Controller
            render={(para) => {
                const { field, fieldState } = para;
                const o = props;
                console.log({ para, o });
                return <TextField
                    {...field}
                    required={r?.required}
                    disabled={r?.readonly}
                    fullWidth
                    label={field.name}
                    error={fieldState.error !== undefined}
                    helperText={fieldState.error?.message || fieldState.error?.type}
                />
            }}
            name={props.path}
            rules={props.rules && props.rules[props.path]}
            control={props.control}
        />
    </Grid>
    )
}
