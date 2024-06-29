import { useState, useEffect } from "react";
import "./Display.css";

export let getdata;
export function Display({ contract, account, sharedAddress }) {
  const [data, setData] = useState("");
  const [no_images, setNoImages] = useState(true);
  console.log(sharedAddress + "accessed")
  useEffect(() => {
    getdata = async () => {
      console.log("get_data_called")
      let dataArray;
      try {
        if (sharedAddress) {
          console.log("Other address")
          dataArray = await contract.display(sharedAddress);
          console.log(dataArray);
        } else {
          console.log("This addres")
          console.log(contract.display(account));
          dataArray = await contract.display(account);
        }
      } catch (e) {
        alert("You don't have access" + e);
      }
      console.log(dataArray)
      const isEmpty = Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        console.log(str);
        console.log(str_array);

        // const images = str_array.map((item, i) => {
        //   return (
        //     <a href={item} key={i} target="_blank">
        //       <img
        //         key={i}
        //         src={``}
        //         alt="new"
        //         className="image-list"
        //       ></img>
        //     </a>
        //   );
        // });
        setData(str_array);
        setNoImages(false)
      } 
      else {
        alert("No image to display");
      }
    }
    getdata();
  }, [sharedAddress]);
  return (
    <>
      {/* {
        no_images &&
        // <div className="container" id="no_images">
        <img id="no_images" src={require('../resources/no_image.png')}></img>
      } */}
      <div className="image-list">
        {(() => {
          console.log(data)
          // const image_data = data;
          const display_images = data
          const img_display = []

          const blanks = (4 - (((display_images).length) % 4))

          if ((display_images).length % 4 != 0) {
            for (let i = 0; i < (blanks); i++) {
              console.log(i)
              display_images.push(require('../resources/blank.PNG'));
            }
          }
          console.log(display_images)

          for (let i = 0; i < (display_images).length / 4; i++) {
            img_display.push(
              <div class="row">
                <div class="img_data col-3"><img class="display_img" onerror='this.style.display = "none"' src={display_images[i]}></img></div>
                <div class="img_data col-3"><img class="display_img" onerror='this.style.display = "none"' src={display_images[i + 1]}></img></div>
                <div class="img_data col-3"><img class="display_img" onerror='this.style.display = "none"' src={display_images[i + 2]}></img></div>
                <div class="img_data col-3"><img class="display_img" onerror='this.style.display = "none"' src={display_images[i + 3]}></img></div>
              </div>
            );
          }

          return img_display;
        })()}
      </div>
      <input id="hidden"
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      {/* <button className="center button" onClick={getdata}>
        Get Data
      </button> */}
    </>
  );
};
export default Display;
