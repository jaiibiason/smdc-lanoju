import '.././App.css'
import PropertiesHeader from '../sections/PropertiesHeader'
import Crumbs from '../components/Crumbs' // Adjust the path as necessary
import PropertiesBody from '../sections/PropertiesBody'
import '.././css/Properties.css' // Adjust the path as necessary

function Properties() {
    return (
        <div>
          <Crumbs />
          <PropertiesHeader /> 
          <PropertiesBody /> 
        </div>
      );
}

export default Properties