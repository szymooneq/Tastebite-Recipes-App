export default function ProfileDetails(props) {
  return (
    <form>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value="adam@tworcastron.pl" className="form-control" />
      </div>
      <div className="form-group">
        <label>Hasło</label>
        <input type="password" placeholder="*****" className="form-control" />
      </div>
      <button className="btn btn-primary">Zapisz</button>
    </form>
  )
}