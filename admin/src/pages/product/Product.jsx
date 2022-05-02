import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import slugify from 'react-slugify';
import MultilSelectColor from "../../components/MutilSelectColor"
import MultilSelectSize from "../../components/MultiSelectSize"

import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const orders = useSelector((state) => state.order.list);
  const prodList = [];
  orders.forEach(order => {
    order.products.forEach(product => prodList.push(product));
  });
  // const product = useSelector((state) =>
  //   state.product.products.find((product) => product._id === productId)
  // );
  const product = useSelector((state) => state.product.productBySlug)


  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("carts/income?slug=" + product.slug);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);


  const [inputs, setInputs] = useState();
  // const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const setSlug = val => {
    const slug = slugify(val)
    setInputs((prev) => {
      return { ...prev, slug };
    });
  }
  const [colors, setColors] = useState();
  const setColor = useCallback(val => {
    setColors(val);
    setInputs((prev) => {
      return { ...prev, colors: val };
    });
  }, [setColors]);

  const [sizes, setSizes] = useState();
  const setSize = useCallback(val => {
    setSizes(val);
    setInputs((prev) => {
      return { ...prev, size: val };
    });
  }, [setSizes]);

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setSlug(e.target.value);
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }

  };

  // const handleChangeImg = (e) => {
  //   setFile((prev) => {
  //     return { ...prev, [e.target.name]: [e.target.files[0]] }
  //   })
  // }


  const handleClick = (e) => {
    e.preventDefault();
    // const fileName = file.image01[0].name;
    // const fileName1 = file.image02[0].name;
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
    //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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
    // console.log(inputs)
    updateProduct(product._id, inputs, dispatch);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.image02} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID: </span>
              <span className="productInfoValue"> {product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Sale:</span>
              <span className="productInfoValue">{(prodList.filter(function (value) {
                return value.slug === product.slug;
              }).length)}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" onChange={handleChange} placeholder={product.title} />
            <label>Product Description</label>
            <textarea name="description" onChange={handleChange} placeholder={product.description} />
            <label>Price</label>
            <input name="price" onChange={handleChange} type="text" placeholder={product.price} />
            <label>Color</label>
            {/* <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select> */}
            < MultilSelectColor colors={colors}
              setColor={setColor} />
            <label>Size</label>
            < MultilSelectSize sizes={sizes}
              setSize={setSize} />
          </div>
          <div className="productFormRight">
            <label>Image 01</label>
            <input type="text" name="image01"
              onChange={handleChange} />
            <label>Image 02</label>
            <input type="text" name="image02"
              onChange={handleChange} />
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
