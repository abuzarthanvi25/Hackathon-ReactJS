import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

export default function EZ_Switch(props) {
  const { label, onChange, checked } = props;
  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label={label}
      />
    </>
  );
}
