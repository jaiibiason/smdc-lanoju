import '.././App.css'
import Crumbs from '../components/Crumbs';
import Footer from '../components/Footer';
import FAQBody from '../sections/FAQBody';
import FAQHeader from '../sections/FAQHeader';

function Faqs() {
  return (
    <div>
      <Crumbs pageName="FAQs" />
      <FAQHeader pageName="Frequently Asked Questions" />
      <FAQBody />
      <Footer />
    </div>
  );
}

export default Faqs
