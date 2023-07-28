import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import header from "../../../imgs/header.jpg";
import berry from "../../../imgs/berry.png";
import leaf from "../../../imgs/leaf.png";
import MenuSection from '../MenuSection/MenuSection';
import { FaSistrix, FaBars, FaTimes } from 'react-icons/fa';
import { BsCartPlusFill } from "react-icons/bs";
import Feedback from '../Feedback/Feedback';
import Footer from '../Footer/Footer';
import { gsap } from 'gsap';
import menu1 from "../../../imgs/menu-1.png";
import aboutus from "../../../imgs/aboutus.jpg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getAllCategory, getMenu, searchFood } from "../../../api/userAction";
import { useLocation } from 'react-router-dom';


const Navbar = ({ size, handleClick, toggleCart }) => {

  const sliderRef = useRef(null);
  const menuSectionRef = useRef(null);

  const about = useRef(null);
  const menu = useRef(null);
  const contact = useRef(null);
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [filterCategory, setFilterCategory] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);

  // Fetch the URL parameters using useLocation
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const table_number = searchParams.get('table');

  // console.log('Table Number:', table_number);
  

  useEffect(() => {
    getAllCategory().then(
      (success) => {
        if (success.data) {
          const _data = success.data.data;
          setMenuCategories(_data);
          if (_data[0]) {
            filterItem(_data[0].category_id);
          }
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log("Server not working");
        }
      }
      );
    }, []);

    
    const filterItem = (category) => {
      getMenu(category).then(
        (success) => {
          if (success.data) {
            setFilterCategory(success.data.data);
            console.log("Menu--------", filterCategory);
        } else {
          console.log("Empty Error Response");
        }
      },
      (error) => {
        if (error.response) {
          console.log(error.response);
        } else {
          console.log("Server not working");
        }
      }
    );
  };

  //search filter 
  const [searchQuery, setSearchQuery] = useState({
    item_name: ""
  });
  const [searchResults, setSearchResults] = useState([]);
 

  const handleSearch = async(query) => { 
    if (query === "") {
      setSearchQuery({
        item_name: ""
      });
      setSearchResults([]);
    } 
    else {
      try{
      const response = await searchFood(query)
      const items = response.data
        setSearchQuery({
          item_name: query
        })
        console.log(response.data);
        setSearchResults(items);
        
      scrollToSection(menuSectionRef);
      }
      catch(error) {
        console.log(error);
      }
  }
   
    return false; // Add this line
  };

  
  useEffect(() => {
    const filterItem = (categItem) => {
          setFilterCategory(categItem);
          const filteredItems = categItem === filterCategory.category_name
          ? filterCategory.filter((item) => item.item_name && item.item_name.toLowerCase().includes(searchQuery.item_name && searchQuery.item_name.toLowerCase()))
          : menuCategories.filter((item) =>  item.category_name && item.category_name.toLowerCase().includes(searchQuery.category_name && searchQuery.category_name.toLowerCase())
          );
           setSearchResults(filteredItems);
        };
  }, [searchQuery,filterCategory,menuCategories]);


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

  return (
    <>
      <header className="site-header">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              <Link to="/">RMS</Link>
            </div>
            <div className="navbar-menu1">
              <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <ul className="navbar-links ">
                  <li onClick={() => scrollToSection(about)} className="navbar-item">
                    <Link className="navbar-link" >
                      About
                    </Link>
                  </li>
                  <li onClick={() => scrollToSection(menu)} className="navbar-item">
                    <Link className="navbar-link">
                      Menu
                    </Link>
                  </li>
                  <li onClick={() => scrollToSection(contact)} className="navbar-item">
                    <Link className="navbar-link" >
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="navbar-search">
                <form  className="header-search-form for-des">
                  <input 
                    type="search"
                    className="form-input"
                    placeholder="Search Here..."
                    value={searchQuery.item_name}
                    onChange={(event) => handleSearch(event.target.value)}
                    />
                  <button type="submit">
                    <FaSistrix />
                  </button>
                </form>
              </div>
              <div className="navbar-icons">
                <div className="navbar-icon" onClick={toggleCart}>
                  <BsCartPlusFill style={{ fontSize: "100px" }} />
                  <span>{size}</span>
                </div>
              </div>
              <div className="navbar-toggle" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Welcome to our restaurant */}
      <section className="main-banner">
        <div className="js-parallax-scene">
          <div className="banner-shape-1 w-100" data-depth="0.30">
            <img src={berry} alt="" />
          </div>
          <div className="banner-shape-2 w-100" data-depth="0.25">
            <img src={leaf} alt="" />
          </div>
        </div>
        <div className="sec-wp">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="banner-text">
                  <h1 className="h1-title">
                    Welcome <br></br>
                    to our<br />
                    Restaurant.
                  </h1>

                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img-wp">
                  <div className="banner-img" style={{ backgroundImage: `url(${header})` }}>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="about-sec section" ref={about}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sec-title text-center mb-5">
                <p className="sec-sub-title mb-3">About Us</p>
                <h2 className="h2-title">About our Restaurant</h2>
                <div className="sec-title-shape mb-4">
                  
                </div>
                <p>Garden and restaurant !! A magnificent dine out and hand out?! It is one of the best place
                  in town. It is counted as most happening restaurant with parking space and plenty of room for
                  friends and families. In terms of food, it is out standing and keeps our mouth watering feeling
                  on and on.Located at very convenient place at Lazimpat main road and offers you the one of the
                  greatest hospitality in Kathmandu.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="about-video">
                <div
                  className="about-video-img"
                  style={{ backgroundImage: `url(${aboutus})` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="about-sec section" ref={menu}>
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
                    <button
                      className="slider-button left"
                      onClick={handleSliderLeft}
                    >
                      <FaAngleLeft />
                    </button>
                    <ul className="filters">
                      <div className="slider" ref={sliderRef}>
                        {menuCategories.map((dataItem, category_name) => (
                          <li className={`filter ${filterCategory === dataItem.category_name ? 'active filactive ' : '' }`} onClick={() => filterItem(dataItem.category_id)} >
                            <img src={menu1} alt="" />
                            {dataItem.category_name}
                          </li>
                        ))}
                      </div>
                    </ul>
                    <button
                      className="slider-button right"
                      onClick={handleSliderRight}
                    >
                      <FaAngleRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section" ref={menuSectionRef}>
        {searchResults.length > 0 ? (
          searchResults.map((item)=> (
            <MenuSection item={item} table_number={table_number} handleClick={handleClick} key={item.menu_id} />
          ))
        ) : (
          filterCategory.map((item) => (
          <MenuSection
            item={item}
            table_number={table_number}
            handleClick={handleClick}
            key={item.menu_id}
          />
        ))
        )}
      </section>

      <section className="feedback-section" ref={contact}>
        <div className="row">
          <div className="col-lg-12">
            <div className="sec-title text-center mb-5">
              <h2 className="h2-title">Feedback</h2>
              <p>
                Should you have face any issue, feel free to contact us, we will
                soon get back to you as soon as we can.
              </p>
            </div>
          </div>
        </div>

        <Feedback />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};


export default Navbar;
