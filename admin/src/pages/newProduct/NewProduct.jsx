import { useCallback, useState } from "react";
import "./newProduct.css";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import MultilSelectColor from "../../components/MutilSelectColor"
import MultilSelectSize from "../../components/MultiSelectSize"
import slugify from "react-slugify";

export default function NewProduct() {
  const [inputs, setInputs] = useState();
  // const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const setSlug = val =>{
    const slug = slugify(val)
    setInputs((prev) => {
      return { ...prev, slug};
    });
  }
  const handleChange = (e) => {
    if (e.target.name === 'title'){
      setSlug(e.target.value);
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }else{
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    
  };

  // const handleChangeImg = (e) => {
  //    setFile((prev) => {
  //     return {...prev, [e.target.name]:[e.target.files[0]]}
  //    })}

  const setColor = useCallback(val => {
    setInputs((prev) => {
      return { ...prev, colors: val};
    });
  }, [setInputs]);

  const setSize = useCallback(val => {
    setInputs((prev) => {
      return { ...prev, size: val};
    });
  }, [setInputs]);
 
  
  // const handleCat = (e) => {
  //   setCat(e.target.value.split(","));
  // };
  const handleClick = (e) => {
    e.preventDefault();
    console.log(inputs);
    // const fileName = new Date().getTime() + file.image01[0].name;
    // const fileName1= new Date().getTime() + file.image02[0].name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const storageRef1 = ref(storage, fileName1);

    // const uploadTask = uploadBytesResumable(storageRef, file.image01[0].name);
    // const uploadTask1 = uploadBytesResumable(storageRef1, file.image02[0].name);
    // // Register three observers:
    // // 1. 'state_changed' observer, called any time the state changes
    // // 2. Error observer, called on failure
    // // 3. Completion observer, called on successful completion
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    //       await setInputs((prev) => {
    //         return { ...prev, image01: downloadURL };
    //       })
    //     });
    //   }
    // );
    // uploadTask1.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //       console.log(downloadURL);
    //       await setInputs((prev) => {
    //         return { ...prev, image02: downloadURL };
    //       })   
    //     });
    //   }
    // );

    addProduct(inputs, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image 01</label>
          <input
            type="text"
            id="file"
            name="image01"
            // onChange={handleChangeImg}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image 02</label>
          <input
            type="text"
            id="file"
            name="image02"
            // onChange={handleChangeImg}
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        {/* <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div> */}
        <div className="addProductItem">
          <label>Categories</label>
          <select value="ao-thun" name="categorySlug" onChange={handleChange}>
            <option value="ao-thun">Áo thun</option>
            <option value="quan-jean">Quần Jean</option>
            <option value="ao-somi">Áo sơ mi</option>
            <option value="ao-khoac">Áo khoác</option>
            <option value="ao-len">Áo len</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          < MultilSelectColor 
              setColor={setColor} />
        </div>
        <div className="addProductItem">
        <label>Size</label>
            < MultilSelectSize 
              setSize={setSize} />
        </div>
       
            
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
