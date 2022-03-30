import axios from "axios";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const Slider = ({unit_id}) => {
    const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  const [user, setUser] = useState([])
  useEffect(() => {

      axios.get(`${API_ENDPOINT}/api/getUnit/` + unit_id).then(response =>
        setUser(response.data)
      )
    

  }, [])

  console.log("User", user)
  return (
    <div>
        {user.map((item)=>
      <SimpleImageSlider
        width={800}
        height={504}
        images={item.unit_pictures}
        showBullets={true}
        showNavs={true}
      />
        )}
    </div>
  );
}
export default Slider