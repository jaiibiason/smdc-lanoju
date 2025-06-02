import Crumbs from '../components/Crumbs' 
import '../css/Inquire.css';

function Inquire() {

  return (
      <>
        <Crumbs pageName={'Sail Residences'}/> {/*// Adjust to dynamic page name based on property */}

        <section className='inquiry-pg'>
          <div className='left-side'>
            <h1>Inquire Now</h1>
            <h2>Let us help you find the perfect property. Fill out the form below, and we’ll get back to you with the best options tailored to your needs.</h2>
            <form className='inquiry-form'>
              <div className='row'>
                <div className='column'>
                  <label htmlFor='first-name'>First Name</label>
                  <input type='text' id='first-name' name='first-name' placeholder='Enter your first name' required />
                </div>
                <div className='column'>
                  <label htmlFor='last-name'>Last Name</label>
                  <input type='text' id='last-name' name='last-name' placeholder='Enter your last name' required />
                </div>
              </div>
              <div className='row'>
                <div className='column'>
                  <label htmlFor='email'>Email Address</label>
                  <input type='email' id='email' name='email' placeholder='Enter your email address' required />
                </div>
                <div className='column'>
                  <label htmlFor='mobile'>Mobile Number</label>
                  <div className='mobile-container'>
                    <input type='tel' id='area-code' name='area-code' placeholder='+00' className='area-code' required />
                    <input type='tel' id='mobile' name='mobile' placeholder='Enter your mobile number' required />
                  </div>
                </div>
              </div>
              <div className="row">
                <label htmlFor='country'>Country of Residence</label>
                <select id='country' name='country' required>
                  <option value='' disabled selected>Select country</option>
                  {/* Add country options here */}
                </select>
              </div>

              <div className="row">
                <label htmlFor='property'>Property of Interest</label>
                <select id='property' name='property' required>
                  <option value='' disabled selected>Select property</option>
                  {/* Add property options here */}
                </select>
              </div>

              <div className="captcha-terms">
                <div className='captcha-container'>
                    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                    <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQO8yS-0GgH"></div>
                </div>
                <p className='submit-info'>
                  By clicking Submit, you agree to our Terms and that you have read our Privacy Policy.
                </p>
              </div>

              <button type='submit' className='blue'>Submit</button>
            </form>
          </div>
          <div className='right-side'>
            <div className='image-grid'>
              <img src={`${import.meta.env.BASE_URL + '/assets/featured_properties/shore.png'}`} alt='Property 1' />
              <img src={`${import.meta.env.BASE_URL + '/assets/featured_properties/shore.png'}`} alt='Property 2' />
              <img src={`${import.meta.env.BASE_URL + '/assets/featured_properties/shore.png'}`} alt='Property 3' />
            </div>
          </div>
        </section>
      </>
  )
}

export default Inquire;
