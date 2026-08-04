'use client';

import { useContactStore } from '../hooks/use-contact-store';
import { Button, type ButtonProps } from '@live/components/ui/button';

export default function ContactButton(props: ButtonProps) {
  const { onOpen } = useContactStore();

  return (
    <Button onClick={onOpen} {...props}>
      {props.children || 'Contact Us'}
    </Button>
  );
}
