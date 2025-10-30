// Button.jsx - A reusable button component
import './Button.css'

function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false
}) {
    const className = `btn btn--${variant} btn--${size}`

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button