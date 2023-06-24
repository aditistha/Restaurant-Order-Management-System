import React, { useEffect, useRef, useState } from 'react';
import $, { data } from 'jquery';
import { gsap, Power2 } from 'gsap';
import header from "../../imgs/header.jpg";
import './MenuSection.css';
import mixitup from 'mixitup';
import menu1 from "../../imgs/menu-1.png";
import menu2 from "../../imgs/menu-2.png";
import menu3 from "../../imgs/menu-3.png";
import menu4 from "../../imgs/menu-4.png";
import { FaAngleLeft, FaAngleRight, FaPlus } from "react-icons/fa";
import { getAllCategory, getMenu } from '../../api/userAction';

const MenuSection = () => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);
  const sliderRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    getAllCategory()
    .then(
      (success) => {
        if (success.data) {
          console.log(success.data.data);
          // console.log(success.data.data.map(user => user.lastname));
          setMenuCategories(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          //Backend Error message
          console.log(error.response);
        } else {
          //Server Not working Error
          console.log("Server not working");
        }
      }
    );

   
    const container = containerRef.current;

    const mixer = mixitup(container, {
      selectors: {
        target: '.dish-box-wp',
        control: '.filter',
      },
    });
    mixerRef.current = mixer;

  }, []);
  
  const handleFilterClick = (category) => {
    getMenu(category.category_id)
    .then(
      (success) => {
        if (success.data) {
          console.log(success.data.data);
          // console.log(success.data.data.map(user => user.lastname));
          setMenuItems(success.data.data);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          //Backend Error message
          console.log(error.response);
        } else {
          //Server Not working Error
          console.log("Server not working");
        }
      }
    );
    
    // menuCategories(category)
    // setMenuCategories(...category);
    if (mixerRef.current) {
      const targetSelector = category === 'all' ? '.dish-box-wp' : `.${category.category_name}`;
      mixerRef.current.filter(targetSelector);
      setSelectedDish(null);
    }
  };

  const handleSliderLeft = () => {
    const slider = sliderRef.current;
    gsap.to(slider, {
      x: '+=100',
      duration: 0.3,
    });
  };

  const handleSliderRight = () => {
    const slider = sliderRef.current;
    gsap.to(slider, {
      x: '-=100',
      duration: 0.3,
    });
  };

  const handleDishAdd = (dish) => {
    setSelectedDish(dish);
    setPopupVisible(true);
  };

  const DishPopup = ({ dish, onClose, onAddToCart }) => {
    return (
      <div className="dish-popup">
        <div className="dish-popup-content">
          <div className="dish-popup-image">
            <img src={dish.image} alt={dish.title} />
          </div>
          <div className="dish-popup-info">
            <h3 className="dish-popup-title">{dish.title}</h3>
            <p className="dish-popup-price">{dish.price}</p>
            <button className="add-to-cart-btn" onClick={() => onAddToCart(dish)}>
              Add to Cart
            </button>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="our-menu section" id="menu">
      <div className="sec-wp">
        <div className="container">

          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center mb-5">
                <p className="sec-sub-title mb-3">our menu</p>
                <h2 className="h2-title">Eat fresh &amp; healthy</h2>
              </div>
            </div>
          </div>

          {/* category */}
          <div className="menu-tab-wp">
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="menu-tab text-center">
                  <button className="slider-button left" onClick={handleSliderLeft}>
                    <FaAngleLeft />
                  </button>
                  <ul className="filters" ref={containerRef}>
                    <div className="slider" ref={sliderRef}>
                      {menuCategories.map((dataItem,category_name) => (
                      <li
                        className="filter"
                        onClick={() => handleFilterClick(dataItem)}
                      >
                        <img src={menu1} alt="" />
                        {dataItem.category_name}
                      </li>
                        ))}

                      {/* {menuCategories.map((dataItem,category_name) => (
                      <li
                      className="filter"
                        onClick={() => handleFilterClick(dataItem.category_name)}
                      >
                        <img src={menu2} alt="" />
                        Breakfast
                      </li>
                      ))}

                      {menuCategories.map((dataItem,category_name) => (     
                      <li
                        className="filter"
                        onClick={() => handleFilterClick(dataItem.category_name)}
                      >
                        <img src={menu3} alt="" />
                        Lunch
                      </li>
                      ))}

                      {menuCategories.map((dataItem,category_name) => (
                      <li
                      className="filter"
                        onClick={() => handleFilterClick(dataItem.category_name)}
                      >
                        <img src={menu4} alt="" />
                        Dinner
                      </li>
                      ))}

                      {menuCategories.map((dataItem,category_name) => (
                      <li
                        className="filter snacks"
                        onClick={() => handleFilterClick(dataItem.category_name)}
                        >
                        <img src={menu4} alt="" />
                        Snacks
                      </li>
                      ))} */}
                    </div>
                  </ul>
                  <button className="slider-button right" onClick={handleSliderRight}>
                    <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* food_item */}
          <div className="menu-list-row">
            <div className="row g-xxl-5 bydefault_show" id="menu-dish" ref={containerRef}>

            {menuItems.map((dataItem, menu_id) => (
              <div className={`col-lg-4 col-sm-6 dish-box-wp ${dataItem.category_name}`} data-cat={dataItem.category_name}>
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">{dataItem.item_name}</h3>
                  </div>
                  <div className="dish-info">{dataItem.description}</div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>{dataItem.price}</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd(dataItem)}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

              {/* <!-- 2 --> */}
              <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Grilled Chicken</h3>
                  </div>
                  <div className="dish-info"></div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>Rs. 359</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd({ title: "Grilled Chicken", image: "assets/images/dish/2.png", price: "Rs. 359" })}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- 3 --> */}
              <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Chicken Biryani</h3>
                  </div>
                  <div className="dish-info"></div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>Rs. 249</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd({ title: "Chicken Biryani", image: "assets/images/dish/3.png", price: "Rs. 249" })}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- 4 --> */}
              <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Veggie Burger</h3>
                  </div>
                  <div className="dish-info"></div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>Rs. 199</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd({ title: "Veggie Burger", image: "assets/images/dish/4.png", price: "Rs. 199" })}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- 5 --> */}
              <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Fish Tacos</h3>
                  </div>
                  <div className="dish-info"></div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>Rs. 299</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd({ title: "Fish Tacos", image: "assets/images/dish/5.png", price: "Rs. 299" })}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- 6 --> */}
              <div className="col-lg-4 col-sm-6 dish-box-wp snacks" data-cat="snacks">
                <div className="dish-box text-center">
                  <div className="dist-img">
                  <img src={header} alt="" />
                  </div>
                  <div className="dish-title">
                    <h3 className="h3-title">Fries with Dip</h3>
                  </div>
                  <div className="dish-info"></div>
                  <div className="dist-bottom-row">
                    <ul>
                      <li>
                        <b>Rs. 99</b>
                      </li>
                      <li>
                        <button className="dish-add-btn" onClick={() => handleDishAdd({ title: "Fries with Dip", image: "assets/images/dish/6.png", price: "Rs. 99" })}>
                          <FaPlus />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {popupVisible && selectedDish && (
         
        <DishPopup
          dish={selectedDish} 
          onClose={() => setPopupVisible(false)}
          onAddToCart={(dish) => {
            console.log('Added to cart:', dish);
            setPopupVisible(false);
          }}
         
        />
        
      )}
    </section>
  );
};

export default MenuSection;
