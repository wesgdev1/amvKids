import './button.css'

const Button = ({
  className,
  content,
  id,
  onClick,
  loading,
  disabled,
  leftIcon,
  rightIcon,
}) => {
  const isDisabled = disabled || loading
  return (
    <button
      onClick={onClick}
      id={id}
      className={`general-styles ${className} ${
        isDisabled ? 'disabled-button' : ''
      }`}
      disabled={isDisabled}
    >
      {leftIcon && (
        <span className={`${loading ? 'loading-icon' : 'icon-left'}`}>
          {leftIcon}
        </span>
      )}
      <span>{content}</span>
      {rightIcon && (
        <span className={`${loading ? 'loading-icon' : 'icon-right'}`}>
          {rightIcon}
        </span>
      )}
    </button>
  )
}

export default Button
