import React, { useState, useEffect, useRef } from 'react'


import './footer.css'
import axios from 'axios'


function Features() {
  const featureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

  const serverURL = 'http://localhost:5000'
  const [Properties, setProperties] = useState([])
  const [filterp, setFilterp] = useState([])
  const [selectedType, setSelectedtype] = useState('All')
  useEffect(() => {
    getprop()
  }, [])

  const getprop = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/admin/getProperty`)
      setProperties(response.data)
      setFilterp(response.data)
    } catch (err) {
      alert("Error in fetching")
    }
  }

  const fileredproperties = (type) => {
    setSelectedtype(type)
    if (type === 'All') {
      setFilterp(Properties)
    } else {
      const filtered = Properties.filter(prop => prop.PropertyType.toLowerCase() === type.toLowerCase())
      setFilterp(filtered)
    }
  }



  return (
    <div >
      <section className='featuredbg' ref={featureRef}>
        <div className='containers'>
          {/* <Heading title='Featured property Type ' subtitle='Find all Type of Property.'/> */}
          <h2 className={`feature-heading ${isVisible ? "visible" : ""}`} style={{ textAlign: "center", fontSize: "33px", fontFamily: "Poppins, sans-serif"}}>
            Featured Property Type
          </h2>
          <h5 className={`feature-heading ${isVisible ? "visible" : ""}`} style={{ fontSize: "24px", textAlign: "center", marginTop: "2%", fontFamily: "Poppins, sans-serif" }}>
            Find all Types of Property
          </h5><div className='featbutt' style={{justifyContent:"center",paddingLeft:"37%",marginTop:"4%"}}>
            <button onClick={() => fileredproperties('All')} className={selectedType === 'All' ? 'active' : ''}>Explore</button>
            <button onClick={() => fileredproperties('Lease')} className={selectedType === 'Lease' ? 'active' : ''}>Lease</button>
            <button onClick={() => fileredproperties('Rent')} className={selectedType === 'Rent' ? 'active' : ''}>Rent</button>
            <button onClick={() => fileredproperties('Sale')} className={selectedType === 'Sale' ? 'active' : ''}>Sale</button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "19px", padding: "20px",marginLeft:"4%" }}>
            {filterp.length === 0 ? (
              <p style={{ color: "gray", fontSize: "18px" }}>No properties available</p>
            ) : (
              filterp.map((prop, index) => (
                <div key={index} className='property-card'
                  style={{
                    width: "250px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "15px", position: "relative", overflow: "hidden",
                    transition: "transform 0.3s ease", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector(".info").style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector(".info").style.opacity = "0";
                  }}
                >
                  <span className='property-badge'>{prop.PropertyType}</span>
                  {prop.Image && (
                    <img 
                      src={`http://localhost:5000/${prop.Image}`}
                      alt="Property"
                      style={{
                        width: "100%", height: "250px", objectFit: "cover", borderRadius: "1px",
                      }}
                    />
                  )}
                  <h3  style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" ,textAlign:"center"}}>
                    {prop.Propertyname}
                  </h3>
                  {/* <p style={{ fontSize: "14px", color: "black" }}>
                    <strong>Type:</strong> {prop.PropertyType}
                  </p> */}


                  <div  onClick={()=>alert("Please Login!")}
                    className="info"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: "0",
                      transition: "opacity 0.3s ease",
                      borderRadius: "10px",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <p>
                      <strong>Location:</strong> {prop.Location}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{prop.Price}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </div>
  )
}

export default Features