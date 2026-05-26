import type { ReactNode } from 'react';
import styles from './Button.module.scss'


interface Props {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    size?: 'base' | 'sm';
    className?: string;
}

const ButtonSize: Record<NonNullable<Props['size']>, string> = {
    base: 'btn--base',
    sm: 'btn--sm'
}

const ButtonVariant: Record<NonNullable<Props['variant']>, string> = {
    primary: 'btn--primary',
    secondary: 'btn--secondary'
}

export function Button({
    children,
    variant = 'primary',
    loading = false,
    size = 'base',
    className,
    ...props
}: Props) {

    const classes = [
        styles.btn,
        styles[ButtonVariant[variant]],
        styles[ButtonSize[size]],
        loading ? 'btn--loading' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} disabled={loading} {...props}>
            {loading ? 'Loading...' : children}
        </button>
    )
}
