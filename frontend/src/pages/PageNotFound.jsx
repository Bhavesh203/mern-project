import React, { useContext } from 'react'
import '../PageNotFound-module.css'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';

const PageNotFound = () => {
  const { user } = useContext(AuthContext); // Retrieve user from AuthContext
  
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row"> 
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  {/* <h1>404 </h1> */}
                  <h1 className="text-center">Page Not Found</h1>       
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">
                    Look like you're lost, <span className='font-black text-2xl'>{user?.username || 'Guest'}!</span>
                  </h3>
                  <p>The page you are looking for is not available!</p>
                  <Link to="/" className="link_404">Go to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PageNotFound;
