import '.././App.css'
import PropertiesHeader from '../sections/PropertiesHeader'
import Crumbs from '../components/Crumbs' // Adjust the path as necessary
import PropertiesBody from '../sections/PropertiesBody'
import '.././css/Properties.css' // Adjust the path as necessary
import Footer from '../components/Footer'

function Properties() {
    return (
        <div>
          <Crumbs pageName={'Properties'} />
          <PropertiesHeader /> 
          <PropertiesBody /> 
          <Footer />
        </div>
      );
}

export default Properties