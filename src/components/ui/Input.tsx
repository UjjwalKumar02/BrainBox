interface InputProps {
  type: string;
  placeholder: string;
  reference: React.Ref<HTMLInputElement>;
}

const Input = ({ type, placeholder, reference }: InputProps) => {
  return (
    <input
      ref={reference}
      type={type}
      placeholder={placeholder}
      className="outline-none px-4 py-1.5 border border-gray-300 rounded-xl w-60"
    />
  );
};

export default Input;
