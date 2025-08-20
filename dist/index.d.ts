import * as React from 'react';

declare const DropdownInput: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost";
    randomString: string;
    label?: string;
    onChange: (value: string | {
        name: string;
        id: number;
    }) => void;
    data: {
        name: string;
        id: number;
    }[];
} & React.RefAttributes<HTMLButtonElement>>;

export { DropdownInput };
