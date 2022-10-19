export default function InformationItem(props) {
  return (
    <p className="italic"><span className="font-bold">{props.title}:</span> {props.content}</p>
  )
}
