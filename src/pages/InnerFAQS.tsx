import { useLocation } from "react-router-dom";
import '.././App.css'
import Crumbs from '../components/Crumbs';
import Footer from '../components/Footer';
import FAQHeader from '../sections/FAQHeader';
import FAQInnerBody from '../sections/FAQInnerBody'; // Adjust the path as needed

function InnerFAQS() {
  const location = useLocation();
  const question = location.state?.question || "No question selected";
  const title = location.state?.title || "No category selected";

  return (
    <div>
      <Crumbs pageName="FAQs" title={title} />
      <FAQHeader title={title}  />
      <FAQInnerBody />
    </div>
  );
}

export default InnerFAQS;
