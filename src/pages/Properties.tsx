import '.././App.css'
import PropertiesHeader from '../sections/PropertiesHeader'
import Crumbs from '../components/Crumbs' // Adjust the path as necessary
import PropertiesBody from '../sections/PropertiesBody'
import '.././css/Properties.css' // Adjust the path as necessary
import Footer from '../components/Footer'
import HeaderImg from '../assets/temp_prptHeader.png'


function Properties() {
    return (
        <div>
          <Crumbs pageName={'Properties'} />
          <PropertiesHeader
            imageSrc={HeaderImg}
            heading="Properties"
            description="Browse a selection of properties designed for solid returns and long-term value. Find what fits your goals."
          />
          <PropertiesBody /> 
        </div>
      );
}

export default Properties