import './Tile.css';
import { TileProp } from './Tile.type';

export default function Tile({ props }: TileProp) {
  const { name, age, email, password, country, gender, image } = props;
  return (
    <div className="tile-wrapper">
      <div>
        {image && <img src={image} alt="Image" style={{ width: '100%', height: '300px' }} />}
      </div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
      <p>Country: {country}</p>
      <p>Gender: {gender}</p>
    </div>
  );
}
