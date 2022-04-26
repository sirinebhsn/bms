import axios from "axios";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const Slider = ({compl_id}) => {
    const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  const [user, setUser] = useState([])
  useEffect(() => {

      axios.get(`${API_ENDPOINT}/api/getComplain/` + compl_id).then(response =>
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
        images={item.compl_pictures}
        showBullets={true}
        showNavs={true}
        slideDuration={0.1}
      />
        )}
    </div>
  );
}
export default Slider