import React from "react";
import InnerArticlesBody from "../sections/InnerArticlesBody";
import Crumbs from "../components/Crumbs";
import ArticlesrecoReads from "../sections/ArticlesrecoReads";

const InnerArticle: React.FC = () => {
    return (
        <>
            <Crumbs pageName={'Articles'}/>
            <InnerArticlesBody />
            <ArticlesrecoReads/>
        </>
    );
};

export default InnerArticle;
