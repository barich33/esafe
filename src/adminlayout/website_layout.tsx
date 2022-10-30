
import { useEffect, useState } from 'react';
import { pageEndPoint } from '../api/primecareApi.endpoint';
import { httpService } from '../service/http.service';
import PageMenuloading from './page_menu_loading';
import WebsiteContent from './website_content';
import WebsiteFooter from './website_footer';
import WebSitHeader from './website_header';

const WebSiteLayout=()=> {
  const [pages, setPages] = useState<any[]>([]);
  const[loading,setLoading]=useState(true);
  useEffect(() => {
    getPageList();
    // setLoading(false)
  }, []);

  const getPageList = () => {
    httpService
      .get(`${pageEndPoint.getPages}`)
      .then((response) => {
        console.log(response.data);
        const pages = response.data?.pages;
        setPages(pages);
    
       setLoading(false);
      })
      .catch((error) => {
       setLoading(false);        
        setPages([]);
        console.error(error);
      });
  };



  if (!loading) {
  return (
    <div className="flex flex-col h-screen">
    <div >
    <WebSitHeader pages={pages}/>
    </div>
    <main>
    <WebsiteContent />
    </main>
    <footer>
      <WebsiteFooter/>
    </footer>
  </div>
  );
} else {
  return <PageMenuloading />;
}
};

export default WebSiteLayout