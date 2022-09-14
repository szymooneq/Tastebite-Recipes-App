const withClass = (WrappedCompononent, className) => {
  return props => (
      <div className={className}>
        <WrappedCompononent {...props} />
      </div>
    )
}

export default withClass