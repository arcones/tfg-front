const TFGDetails = ({student, tfgs}) => {
  return (
  <div>
      <h2>Bienvenida {student.name}</h2>
      {tfgs.map(({ id, title }) => (
        <p key={id}>
          TFG {id} con titulo {title}
        </p>
      ))}
    </div>
  )
};
export default TFGDetails;