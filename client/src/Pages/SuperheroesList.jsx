import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const deleteSuperheroEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

export default function SuperheroesList() {
  const [superheroesData, setSuperheroesData] = useState(null);
  console.log("superheroesData", superheroesData);

  useEffect(() => {
    fetch("http://localhost:8080/employees/superheroes")
      .then(response => response.json())
      .then(fetchedData => setSuperheroesData(fetchedData));
  }, []);

  const handleDeleteSuperhero = (id) => {
    deleteSuperheroEmployee(id);

    setSuperheroesData((superheroesData) => {
      return superheroesData.filter((superhero) => superhero._id !== id);
    });
  };

  return (
    <div className="superheroes">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {superheroesData && superheroesData.map((superhero) => (
            <tr key={superhero._id}>
              <td>{superhero.name}</td>
              <td>{superhero.level}</td>
              <td>{superhero.position}</td>
              <td>
                <Link to={`/update/${superhero._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => handleDeleteSuperhero(superhero._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
