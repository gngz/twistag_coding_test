'use client';
import { Trash2 } from 'react-feather';

type Props = React.HTMLAttributes<HTMLButtonElement>;

export default function DeleteButton(props: Props) {
  return (
    <button {...props}>
      <Trash2 />
    </button>
  );
}
