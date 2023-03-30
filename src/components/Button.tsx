interface PropsInterface {
  children: React.ReactNode;
  type: string;
}

function Button(props: PropsInterface) {
  return <button>{props.children}</button>;
}

export default Button;
