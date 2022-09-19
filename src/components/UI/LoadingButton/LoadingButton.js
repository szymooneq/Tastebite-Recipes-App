export default function LoadingButton(props) {
  const className = props.className || 'btn-primary'
  const buttonProps = {...props}
  delete buttonProps.loading

  return (
    props.loading 
      ? (
      <button className={`btn ${className}`} type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>) 
      : <button {...buttonProps} className={`btn ${className}`}>{props.children}</button>
  )
}