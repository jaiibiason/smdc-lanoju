import '.././App.css'
import PropertiesHeader from '../sections/PropertiesHeader'
import Crumbs from '../components/Crumbs' // Adjust the path as necessary

function Properties() {
    return (
        <div>
          <Crumbs />
          <PropertiesHeader /> 
        </div>
      );
}

export default Properties