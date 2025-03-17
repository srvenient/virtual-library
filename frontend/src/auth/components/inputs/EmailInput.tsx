import Input from "./Input.tsx";

export default function EmailInput() {
    return (
        <Input
            name="email"
            type="email"
            placeholder="Correo institucional"
            inputMode="email"
            rules={{
                required: true,
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@unimonserrate.edu.co$/,
                    message: "El correo debe ser institucional"
                }
            }}
        />
    )
}