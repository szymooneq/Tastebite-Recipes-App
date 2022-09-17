export default function Login(props) {
  return (
    <div>
      <h2>Logowanie</h2>
      <form>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label>Hasło</label>
        <input type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">Zapisz</button>
    </form>
    </div>
  )
}