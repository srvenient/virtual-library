type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  label: string;
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({type, label, width, disabled = false, onClick}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-[15px] font-family-special font-semibold h-14 ${
        disabled
          ? 'text-black bg-white border-1 opacity-10'
          : 'bg-theme-medium-blue text-white hover:bg-sky-800 hover:transition-colors hover:duration-600'
      }`}
      style={{
        width: width
      }}
    >
      {label}
    </button>
  );
}
