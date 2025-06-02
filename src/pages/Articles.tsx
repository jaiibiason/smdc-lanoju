import '.././App.css'
import Crumbs from '../components/Crumbs';
import Footer from '../components/Footer';
import PropertiesHeader from '../sections/PropertiesHeader';
import HeaderImg from '../assets/temp_prptHeader.png'
import ArticlesBody from '../sections/ArticlesBody'
import LatestNews from '../sections/LatestNews';

function Articles() {
  return (
    <div>
      <Crumbs pageName="Articles" />
      <PropertiesHeader
            imageSrc={HeaderImg}
            heading="Articles"
            description="Insights, trends, and tips to help you navigate real estate with ease."
          />  
      <ArticlesBody />
      <Footer />
    </div>
  );
}

export default Articles
