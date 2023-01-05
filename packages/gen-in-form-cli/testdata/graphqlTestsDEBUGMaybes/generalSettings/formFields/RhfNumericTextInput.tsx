import { Grid, TextField } from "@mui/material";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { RhfInputFieldResult, RhfInputProps, useFieldRestriction } from "../index.generated";

export function RhfNumericTextInput<T extends FieldValues, TKey extends Path<T>>(props: RhfInputProps<T, TKey>): RhfInputFieldResult<T, TKey> {

    const r = useFieldRestriction(props);

    return (<Grid item xs={12} sm={4} md={3}>
        <Controller
            render={({ field, fieldState }) => <TextField
                type="number"
                {...field}
                onChange={e => {
                    const v = e.target.value;
                    try {
                        const num = v.length > 0 ? Number.parseFloat(v) : Number.NaN;
                        if (isNaN(num)) {
                            props.formReturn.setValue(props.path, null as PathValue<T, TKey>)
                        } else {
                            props.formReturn.setValue(props.path, num as PathValue<T, TKey>)
                        }
                    } catch (e) {
                        console.error("Failed to update date", e);
                    }
                }}
                required={r?.required}
                disabled={r?.readonly}
                fullWidth
                label={field.name}
                error={fieldState.error !== undefined}
                helperText={fieldState.error?.message || fieldState.error?.type}
            />}
            name={props.path}
            rules={props.rules && props.rules[props.path]}
            control={props.control}
        />
    </Grid>
    )
}
