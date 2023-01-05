import { Grid, TextField } from "@mui/material";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { RhfInputFieldResult, RhfInputProps, useFieldRestriction } from "../index.generated";

export function RhfDateInput<T extends FieldValues, TKey extends Path<T>>(props: RhfInputProps<T, TKey>): RhfInputFieldResult<T, TKey> {

    const r = useFieldRestriction(props);

    return (<Grid item xs={12} sm={4} md={3}>
        <Controller
            render={({ field, fieldState }) => <TextField
                type="date"
                {...field}
                value={typeof field.value === "string" ? new Date(field.value).toLocaleDateString('en-CA') : ""}
                onChange={e => {

                    const v = e.target.value;
                    try {
                        const date = new Date(v);
                        if (isNaN(date.valueOf())) {
                            console.warn("Invalid date", { value: v });
                        } else {
                            const asString = date.toISOString();
                            props.formReturn.setValue(props.path, asString as PathValue<T, TKey>)
                        }
                    } catch (e) {
                        console.error("Failed to update date", e);
                    }
                }}
                InputLabelProps={{ shrink: true }}
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
